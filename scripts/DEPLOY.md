# Deploying the site to your remote host

This repository includes a PowerShell helper script at `scripts/deploy.ps1` which uses PuTTY tools (pscp/plink) if available, or falls back to OpenSSH's scp/ssh.

Pre-requisites
- A built static site. For Docusaurus, run `npm run build` in the `nyfaria` subfolder (or the root if configured). The script defaults to `nyfaria/build` as the source.
- Pageant loaded with your private key (if you use PuTTY/Pageant) or ssh-agent configured for OpenSSH.
- PuTTY tools (`pscp`, `plink`) in your PATH OR OpenSSH `scp`, `ssh` in your PATH.

Quick example (PowerShell):

```powershell
cd D:\WebDev\nyfaria\nyfaria
npm run build
# Dry-run to verify commands
.\scripts\deploy.ps1 -Host 74.208.172.138 -User root -RemotePath /data/www/nyfaria.com/html -LocalBuild .\build -DryRun
# Actual deploy
.\scripts\deploy.ps1 -Host 74.208.172.138 -User root -RemotePath /data/www/nyfaria.com/html -LocalBuild .\build
```

Security notes
- Deploying as `root` over SSH is risky. Prefer a limited-privilege user on the remote host and use `sudo` for only the steps that require elevated privileges.
- The script uses Pageant automatically with PuTTY tools. Make sure the key loaded in Pageant matches the server's authorized_keys entry for the user.

If you want, I can also:
- Create an rsync-based script (if rsync is available on the remote server).
- Add a GitHub Actions workflow to build and deploy automatically on push. This requires an SSH deploy key stored as a secret in your repository.
