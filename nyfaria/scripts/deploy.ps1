<#
Simple deploy script to copy the built site to a remote server using PuTTY tools
(uses Pageant for key auth if you have the key loaded).

Usage (from repository root):
  .\scripts\deploy.ps1 -TargetHost 74.208.172.138 -User root -RemotePath /data/www/nyfaria.com/html -LocalBuild ./nyfaria/build

Notes:
- This script prefers PuTTY tools (plink/pscp) which use Pageant automatically when the key is loaded.
- If you prefer OpenSSH (scp/ssh) ensure your key is loaded into ssh-agent or use an OpenSSH key.
- Running as root over SSH is risky; consider using a non-root account with sudo.
- The script will create the remote directory if missing and then upload files recursively.
#>

param(
  [string]$TargetHost = '72.61.6.130',
  [string]$User = 'root',
  [string]$RemotePath = '/data/www/nyfaria.com/html',
  [string]$LocalBuild = 'nyfaria/build',
  [switch]$DryRun
)

function Find-Exe([string]$name) {
  $p = Get-Command $name -ErrorAction SilentlyContinue
  if ($p) { return $p.Path } else { return $null }
}

$pscp = Find-Exe pscp
$plink = Find-Exe plink
$scp = Find-Exe scp
$ssh = Find-Exe ssh

Write-Host "Deploy: local build path = $LocalBuild" -ForegroundColor Cyan
Write-Host "Deploy: remote = ${User}@${TargetHost}:${RemotePath}" -ForegroundColor Cyan

if (-not (Test-Path $LocalBuild)) {
  Write-Error "Local build path '$LocalBuild' not found. Run your static site build first (e.g. npm run build)."
  exit 1
}

# Ensure remote directory exists
if ($plink) {
  $cmd = "mkdir -p $RemotePath && chmod 755 $RemotePath"
  Write-Host "Ensuring remote directory exists (via plink): $cmd"
  if (-not $DryRun) {
    & $plink "${User}@${TargetHost}" $cmd
    if ($LASTEXITCODE -ne 0) { Write-Warning "plink returned exit code $LASTEXITCODE" }
  }
} elseif ($ssh) {
  $cmd = "mkdir -p $RemotePath && chmod 755 $RemotePath"
  Write-Host "Ensuring remote directory exists (via ssh): $cmd"
  if (-not $DryRun) {
    & $ssh "${User}@${TargetHost}" $cmd
    if ($LASTEXITCODE -ne 0) { Write-Warning "ssh returned exit code $LASTEXITCODE" }
  }
} else {
  Write-Warning "No plink or ssh found in PATH. The script will still attempt file copy if scp/pscp are available."
}

# Upload files
if ($pscp) {
  Write-Host "Uploading via pscp (uses Pageant key if loaded)..." -ForegroundColor Green
  $src = Join-Path $LocalBuild '*'
  $dest = "${User}@${TargetHost}:${RemotePath}"
  Write-Host "pscp -r -batch `"$src`" `"$dest`""
  if (-not $DryRun) {
    & $pscp -r -batch "$src" "$dest"
    if ($LASTEXITCODE -ne 0) { Write-Warning "pscp returned exit code $LASTEXITCODE" }
  }
} elseif ($scp) {
  Write-Host "Uploading via scp (OpenSSH scp) -- requires ssh-agent or key access" -ForegroundColor Green
  $src = Join-Path $LocalBuild '*'
  $dest = "${User}@${TargetHost}:${RemotePath}"
  Write-Host "scp -r `"$src`" `"$dest`""
  if (-not $DryRun) {
    & $scp -r "$src" "$dest"
    if ($LASTEXITCODE -ne 0) { Write-Warning "scp returned exit code $LASTEXITCODE" }
  }
} else {
  Write-Error "No pscp or scp found. Install PuTTY (pscp/plink) or OpenSSH client."
  exit 1
}

Write-Host "Deploy finished. Verify the site on the remote host and check file permissions." -ForegroundColor Cyan
