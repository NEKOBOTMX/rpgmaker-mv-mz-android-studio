# RPG Maker MV/MZ Export Notes

## Recommended Export Flow

1. Open your project in RPG Maker MV or RPG Maker MZ.
2. Use `File > Deployment`.
3. Export for Android/iOS or web browsers.
4. Copy the generated `www` folder contents into:

```text
game-export/www
```

5. From the repository root, run:

```powershell
.\tools\sync-rpgmaker-export.ps1
```

6. Open `android/` in Android Studio and build the app.

## MV And MZ Compatibility

Both MV and MZ games are web apps built from HTML, JavaScript, images, audio, and JSON data. The Android app does not need to know whether the game came from MV or MZ as long as the deployed `www/index.html` can run in a modern Android WebView.

The risky part is plugins. MV and MZ plugins are not always compatible with each other, and Android WebView can reveal timing, audio, storage, and texture issues that do not appear during desktop playtest.

## Export Checklist

- Keep `index.html` at the root of `www`.
- Keep `data`, `js`, `img`, `audio`, and `movies` paths unchanged.
- Avoid changing file case after export.
- Test with `Exclude unused files` off first.
- If a plugin loads assets dynamically, document those assets before enabling file exclusion.
- Test saves on device, not only emulator.
- Test audio after app pause/resume.
