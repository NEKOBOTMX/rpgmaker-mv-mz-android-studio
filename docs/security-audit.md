# Security Audit

Date: 2026-06-01

## Changes Applied

- Removed the RPG Maker touch-control plugin files from the repository.
- Removed Android-native touch-control code from `MainActivity`.
- Removed `android.permission.INTERNET` from the manifest.
- Set `android:allowBackup="false"` and `android:fullBackupContent="false"`.
- Set `android:usesCleartextTraffic="false"`.
- Disabled `WebSettings.setAllowUniversalAccessFromFileURLs`.
- Disabled `WebSettings.setAllowContentAccess`.
- Removed the machine-specific `aapt2` override from versioned `gradle.properties`.
- Removed source/archive artifacts from packaged Android assets:
  - `.rar`
  - `.zip`
  - `.7z`
  - `.psd`
  - `.kra`
  - `.aseprite`
  - `.bak`
  - `.tmp`
- Updated `tools/sync-rpgmaker-export.ps1` to strip those source/archive artifacts after every sync.

## Current WebView Posture

The app still enables:

```java
settings.setJavaScriptEnabled(true);
settings.setAllowFileAccess(true);
settings.setAllowFileAccessFromFileURLs(true);
```

These are required for RPG Maker MV/MZ local exports to load JavaScript, JSON, audio workers, and local assets from `file:///android_asset/www`.

The app disables:

```java
settings.setAllowContentAccess(false);
settings.setAllowUniversalAccessFromFileURLs(false);
```

This prevents local game files from making broad cross-origin requests from the `file://` origin.

## Residual Risks

- RPG Maker plugins are arbitrary JavaScript. Treat every plugin in `www/js/plugins` as trusted code.
- Some bundled RPG Maker plugins contain update URLs or remote loader code. With `INTERNET` removed, these should fail closed, but re-enabling `INTERNET` requires a plugin-level network audit.
- Local file access is still enabled for RPG Maker compatibility.
- Runtime patches monkey-patch core objects (`PIXI.Texture`, `SceneManager`, `AudioManager`). This is intentional but should be tested on each game release.

## Release Checklist

- Keep `android.permission.INTERNET` removed unless the game explicitly needs network access.
- Do not commit signing keys, keystores, or passwords.
- Run `tools/sync-rpgmaker-export.ps1` after every RPG Maker deployment.
- Confirm no `.rar`, `.psd`, `.zip`, `.bak`, or source art files remain under `android/app/src/main/assets/www`.
- Build release as an AAB with a private signing key stored outside the repository.
