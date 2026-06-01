$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path $repoRoot "game-export\www"
$target = Join-Path $repoRoot "android\app\src\main\assets\www"
$resolvedRepo = [System.IO.Path]::GetFullPath($repoRoot)
$resolvedTarget = [System.IO.Path]::GetFullPath($target)
$expectedTarget = [System.IO.Path]::GetFullPath((Join-Path $resolvedRepo "android\app\src\main\assets\www"))

if ($resolvedTarget -ne $expectedTarget -or -not $resolvedTarget.StartsWith($resolvedRepo, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to sync because the target path is outside the expected repository folder: $resolvedTarget"
}

if (-not (Test-Path $source)) {
    throw "Source folder not found: $source"
}

$index = Join-Path $source "index.html"
if (-not (Test-Path $index)) {
    throw "RPG Maker export is missing index.html: $index"
}

if (Test-Path $target) {
    Get-ChildItem -LiteralPath $target -Force | Remove-Item -Recurse -Force
} else {
    New-Item -ItemType Directory -Force -Path $target | Out-Null
}

Copy-Item -LiteralPath (Join-Path $source "*") -Destination $target -Recurse -Force

$blockedRuntimeArtifacts = @("*.rar", "*.zip", "*.7z", "*.psd", "*.kra", "*.aseprite", "*.bak", "*.tmp")
Get-ChildItem -LiteralPath $target -Recurse -File -Include $blockedRuntimeArtifacts | ForEach-Object {
    $fullPath = $_.FullName
    if (-not $fullPath.StartsWith($resolvedTarget, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to remove file outside Android assets: $fullPath"
    }
    Remove-Item -LiteralPath $fullPath -Force
}

Write-Host "Synced RPG Maker export:"
Write-Host "  From: $source"
Write-Host "  To:   $target"
Write-Host "  Removed source/archive artifacts from Android assets."
