# Deploy key provisioning (one-time)

The GitHub Action in `.github/workflows/deploy.yml` needs a dedicated SSH key.
The private half lives only in the repo secret `SSH_DEPLOY_KEY`; the public half
sits in `/root/.ssh/authorized_keys` on the box, jailed with `rrsync` so the key
can write `/var/www/veskov.dev` and do nothing else (no shell, no other paths).

Key values never appear in a terminal scrollback or chat: generation goes to a
temp file, the secret is piped into `gh secret set`, the temp files are deleted.

## Steps

1. **Generate a dedicated key** (no passphrase - CI cannot type one):

   ```bash
   ssh-keygen -t ed25519 -N "" -C "github-actions-deploy veskov.dev" -f /tmp/veskov-deploy-key
   ```

2. **Jail the public key on the box.** `rrsync` ships with rsync on Ubuntu 22.04
   (`/usr/bin/rrsync`); the fallback copy lives in `/usr/share/doc/rsync/scripts/`.
   The `restrict` option kills pty/agent/port/X11 forwarding in one word.

   ```bash
   PUB=$(cat /tmp/veskov-deploy-key.pub)
   ssh root@159.69.8.29 "
     command -v rrsync >/dev/null || install -m 755 /usr/share/doc/rsync/scripts/rrsync /usr/local/bin/rrsync
     cp -a /root/.ssh/authorized_keys /root/.ssh/authorized_keys.bak.\$(date +%F)
     echo 'command=\"\$(command -v rrsync) /var/www/veskov.dev\",restrict $PUB' >> /root/.ssh/authorized_keys
   "
   ```

   (If the inner `\$(command -v rrsync)` expansion is a hassle, hardcode the path
   the first command printed.)

3. **Verify the jail before trusting it** - a dry-run through the new key must
   succeed, and a shell through it must fail:

   ```bash
   rsync -rlptzvn -e "ssh -i /tmp/veskov-deploy-key -o IdentitiesOnly=yes" index.html root@159.69.8.29:/
   ssh -i /tmp/veskov-deploy-key -o IdentitiesOnly=yes root@159.69.8.29 true && echo "JAIL LEAK" || echo "jail holds"
   ```

4. **Store the secret and clean up:**

   ```bash
   gh secret set SSH_DEPLOY_KEY --repo becuhkyy/veskov.dev < /tmp/veskov-deploy-key
   rm -f /tmp/veskov-deploy-key /tmp/veskov-deploy-key.pub
   ```

5. **First controlled run:** trigger the workflow by hand and watch it:

   ```bash
   gh workflow run deploy --repo becuhkyy/veskov.dev
   gh run watch --repo becuhkyy/veskov.dev
   ```

   The workflow's last step curls the live site and compares sha256 of every
   text file against the repo, so a green run means the box really serves the
   new files.

## Rollback

Remove the key line from `/root/.ssh/authorized_keys` (backup from step 2 is
next to it) and delete the repo secret:

```bash
gh secret delete SSH_DEPLOY_KEY --repo becuhkyy/veskov.dev
```

## Notes

- Files land owned by `root:644` after rsync (previously `www-data`); Apache
  only needs read on a static docroot, so nothing breaks.
- The workflow pins the box's ed25519 host key instead of `ssh-keyscan` at run
  time; if the host key ever legitimately changes, update the pinned line in
  `.github/workflows/deploy.yml`.
- No `--delete`: whatever else lives in the docroot (`.well-known` etc.) is
  never touched.
