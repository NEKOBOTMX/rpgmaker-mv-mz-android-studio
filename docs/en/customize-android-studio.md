# Customize The Project In Android Studio

This guide explains the files you should change before publishing your app.

## 1. Change The App Name

File:

```text
android/app/src/main/res/values/strings.xml
```

Change:

```xml
<string name="app_name">RPG Nekos by Nekobot</string>
```

to your game's name.

## 2. Change The Application ID

File:

```text
android/app/build.gradle
```

Change:

```gradle
applicationId "com.nekobot.rpgnekos"
namespace "com.nekobot.rpgnekos"
```

Example:

```gradle
applicationId "com.yourstudio.yourgame"
namespace "com.yourstudio.yourgame"
```

This ID must be unique if you publish on Google Play.

## 3. Change The Java Package

Current path:

```text
android/app/src/main/java/com/nekobot/rpgnekos/MainActivity.java
```

If you change the package to `com.yourstudio.yourgame`, move the file to:

```text
android/app/src/main/java/com/yourstudio/yourgame/MainActivity.java
```

Then change the first line:

```java
package com.yourstudio.yourgame;
```

Android Studio can do this with `Refactor > Rename` on the package folders.

## 4. Check The Manifest

File:

```text
android/app/src/main/AndroidManifest.xml
```

You can usually keep:

```xml
android:name=".MainActivity"
```

as long as `MainActivity` stays inside the package defined by `namespace`.

## 5. Change The Version

File:

```text
android/app/build.gradle
```

Change:

```gradle
versionCode 1
versionName "1.0.0"
```

Every Google Play update must increase `versionCode`.

## 6. Change The Icon

Replace these files:

```text
android/app/src/main/res/mipmap-mdpi/ic_launcher.png
android/app/src/main/res/mipmap-hdpi/ic_launcher.png
android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
```

The manifest already uses:

```xml
android:icon="@mipmap/ic_launcher"
```

## 7. Change The Android Studio Project Name

File:

```text
android/settings.gradle
```

Change:

```gradle
rootProject.name = "RPG Nekos by Nekobot"
```

## 8. Copy Your RPG Maker Game

1. Export from RPG Maker MV/MZ.
2. Copy the `www` contents into:

```text
game-export/www
```

3. Run:

```powershell
.\tools\sync-rpgmaker-export.ps1
```

4. Open `android/` in Android Studio and build.

## Patches Already Included

The Android container already patches:

- `PIXI.Texture`: reduces issues with oversized textures or invalid frames.
- `SceneManager.isGameActive()`: returns `true` on mobile for RPG Maker MZ.
- `AudioManager.audioFileExt()`: uses `.ogg` on mobile when `WebAudio.canPlayOgg()` is available.
