# RPG Nekos by Nekobot

Android Studio repository for publishing RPG Maker MV/MZ games on Android.

This repo is meant to be uploaded to GitHub as source code. It does not include generated build folders, local Android Studio files, signing keys, backups, or full RPG Maker exports.

## Language / Idioma / 言語

- [Español Mexico](docs/es-MX/README.md)
- [English](docs/en/README.md)
- [日本語](docs/ja/README.md)

## What This Repository Includes

- `android/`: Android Studio project.
- `android/gradlew` and `android/gradlew.bat`: Gradle wrapper.
- `game-export/www/.gitkeep`: placeholder for RPG Maker export files.
- `android/app/src/main/assets/www/index.html`: placeholder runtime page.
- `tools/sync-rpgmaker-export.ps1`: sync script for copying RPG Maker exports into Android assets.
- `android/app/src/main/assets/patches/`: Android runtime patches.
- `docs/`: documentation and security notes.

## Included Runtime Patches

The Android app already injects these patches after the RPG Maker page loads:

```text
android/app/src/main/assets/patches/nekobot-pixi-texture-patch.js
android/app/src/main/assets/patches/nekobot-rpgmaker-mz-mobile-patch.js
android/app/src/main/assets/patches/nekobot-mobile-ogg-audio-patch.js
```

### 1. Pixi Texture Patch

Patches `PIXI.Texture` to reduce Android/WebView crashes or black screens caused by oversized texture frames or frames outside the base texture.

### 2. RPG Maker MZ Mobile Activity Patch

Patches `SceneManager.isGameActive()` on mobile user agents so it returns `true`. This helps RPG Maker MZ continue running correctly inside Android WebView.

### 3. Mobile OGG Audio Patch

Patches `AudioManager.audioFileExt()` so mobile builds use `.ogg` when `WebAudio.canPlayOgg()` is available, instead of always falling back to `.m4a`.

## Quick Start

1. Export your RPG Maker MV/MZ game.
2. Copy the exported `www` contents into:

```text
game-export/www
```

3. Run:

```powershell
.\tools\sync-rpgmaker-export.ps1
```

4. Open `android/` in Android Studio.
5. Build and publish from Android Studio.

## Security Defaults

- No `android.permission.INTERNET` by default.
- Android backup disabled.
- Cleartext traffic disabled.
- WebView universal access from `file://` disabled.
- Export sync removes source/archive artifacts such as `.rar`, `.zip`, `.psd`, `.bak`, and `.tmp`.

See [docs/security-audit.md](docs/security-audit.md).

## Visual Customization Guide

Written guides for changing app name, package ID, Java package, icon, version, and project name:

- [Español Mexico](docs/es-MX/personalizar-android-studio.md)
- [English](docs/en/customize-android-studio.md)
- [日本語](docs/ja/customize-android-studio.md)
