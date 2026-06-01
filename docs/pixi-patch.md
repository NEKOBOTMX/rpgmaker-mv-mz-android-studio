# Nekobot Pixi Texture Patch

File:

```text
android/app/src/main/assets/patches/nekobot-pixi-texture-patch.js
```

The Android activity injects this patch with `evaluateJavascript()` after the RPG Maker page finishes loading.

## What It Does

The patch waits for Pixi to exist, then wraps `PIXI.Texture`. If a texture frame is larger than `2048px` or points outside its base texture, the patch creates a scaled canvas-backed base texture and a corrected frame.

This is meant as an Android compatibility guard for devices or WebView/GPU combinations that fail with oversized or invalid texture frames.

## When To Use It

Use it when the Android build shows:

- Black screens after specific images load.
- Texture frame errors in console logs.
- Crashes or rendering failures tied to large spritesheets or atlases.

## When To Be Careful

This is a monkey patch of a core Pixi class. Test battle scenes, menus, animations, map transfers, saves, and plugin-heavy screens.

If the game works without it, keep the file but disable injection in `MainActivity` for comparison testing.
