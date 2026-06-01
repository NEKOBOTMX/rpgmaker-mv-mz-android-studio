# RPG Nekos by Nekobot

Android Studio repository for publishing RPG Maker MV/MZ games on Android.

This repository is meant to be uploaded to GitHub as source code. It does not include generated build folders, local Android Studio files, signing keys, backups, or full RPG Maker exports.

## What Is Included

- `android/`: Android Studio project.
- `android/gradlew` and `android/gradlew.bat`: Gradle wrapper.
- `game-export/www/.gitkeep`: placeholder for RPG Maker exports.
- `android/app/src/main/assets/www/index.html`: placeholder runtime page.
- `tools/sync-rpgmaker-export.ps1`: script for copying exports into Android assets.
- `android/app/src/main/assets/patches/`: Android runtime patches.
- `docs/`: documentation and security notes.

## Included Patches

The Android app already injects these patches after the RPG Maker page loads:

```text
android/app/src/main/assets/patches/nekobot-pixi-texture-patch.js
android/app/src/main/assets/patches/nekobot-rpgmaker-mz-mobile-patch.js
android/app/src/main/assets/patches/nekobot-mobile-ogg-audio-patch.js
```

### 1. Pixi Texture Patch

Patches `PIXI.Texture` to reduce Android/WebView crashes, black screens, or errors caused by oversized texture frames or frames outside the base texture.

### 2. RPG Maker MZ Mobile Activity Patch

Patches `SceneManager.isGameActive()` on mobile devices so it returns `true`. This helps RPG Maker MZ stay active inside Android WebView.

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

Visual guide for changing name, ID, package, icon, and version:

[customize-android-studio.md](customize-android-studio.md)

The app loads the game from:

```text
file:///android_asset/www/index.html
```

## Security Defaults

- No `android.permission.INTERNET` by default.
- Android backup disabled.
- Cleartext traffic disabled.
- Universal access from `file://` disabled.
- The sync script removes source/archive artifacts such as `.rar`, `.zip`, `.psd`, `.bak`, and `.tmp`.

Also read:

```text
docs/security-audit.md
```

## GitHub Publishing Notes

Keep only repository source files. Do not upload:

- `android/.gradle/`
- `android/.idea/`
- `android/build/`
- `android/app/build/`
- `android/local.properties`
- `backups/`
- full exports with commercial assets unless you have permission to distribute them.
