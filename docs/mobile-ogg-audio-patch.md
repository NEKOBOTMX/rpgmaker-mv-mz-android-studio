# Mobile OGG Audio Patch

File:

```text
android/app/src/main/assets/patches/nekobot-mobile-ogg-audio-patch.js
```

RPG Maker MV commonly uses this logic in `rpg_managers.js`:

```js
AudioManager.audioFileExt = function() {
    if (WebAudio.canPlayOgg() && !Utils.isMobileDevice()) {
        return '.ogg';
    } else {
        return '.m4a';
    }
};
```

The Nekobot patch overrides `AudioManager.audioFileExt()` at runtime so mobile devices can use `.ogg` when `WebAudio.canPlayOgg()` returns true.

This avoids editing `rpg_managers.js` directly, so RPG Maker exports can be synchronized again without losing the Android-specific change.

Behavior:

```js
if (Utils.isMobileDevice() && WebAudio.canPlayOgg()) {
  return ".ogg";
}
```

If OGG is not available, it falls back to the original RPG Maker behavior.
