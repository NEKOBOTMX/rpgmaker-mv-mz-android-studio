# Android Build Notes

Open the `android/` folder in Android Studio.

The app module uses:

```text
applicationId: com.nekobot.rpgnekos
compileSdk: 35
targetSdk: 35
minSdk: 23
```

The game starts from:

```text
file:///android_asset/www/index.html
```

This URL is served directly from Android assets, which keeps the template free of external AndroidX runtime dependencies.

## Release Build

Use Android Studio:

```text
Build > Generate Signed Bundle / APK > Android App Bundle
```

For Google Play, prefer AAB. Keep your signing key outside the repository.

## Debugging

Debug builds enable WebView debugging through `WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)`.

You can inspect the WebView from Chrome DevTools:

```text
chrome://inspect
```

## Local SSL/AAPT2 Workaround

If Gradle fails with a Java SSL/PKIX error while downloading `aapt2`, point Android Gradle Plugin to the SDK copy of `aapt2.exe` in a local, non-versioned Gradle property file or your user-level Gradle properties:

```properties
android.aapt2FromMavenOverride=C\:\\Path\\To\\Android\\Sdk\\build-tools\\35.0.0\\aapt2.exe
```

Use the path that exists on your machine. Avoid committing machine-specific absolute paths to the repository.
