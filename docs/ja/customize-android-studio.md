# Android Studio でプロジェクトをカスタマイズする

このガイドでは、公開前に変更するファイルを説明します。

## 1. アプリ名を変更する

ファイル:

```text
android/app/src/main/res/values/strings.xml
```

次を変更します。

```xml
<string name="app_name">RPG Nekos by Nekobot</string>
```

自分のゲーム名に置き換えてください。

## 2. Application ID を変更する

ファイル:

```text
android/app/build.gradle
```

次を変更します。

```gradle
applicationId "com.nekobot.rpgnekos"
namespace "com.nekobot.rpgnekos"
```

例:

```gradle
applicationId "com.yourstudio.yourgame"
namespace "com.yourstudio.yourgame"
```

Google Play に公開する場合、この ID は一意である必要があります。

## 3. Java パッケージを変更する

現在のパス:

```text
android/app/src/main/java/com/nekobot/rpgnekos/MainActivity.java
```

パッケージを `com.yourstudio.yourgame` にする場合、ファイルを次へ移動します。

```text
android/app/src/main/java/com/yourstudio/yourgame/MainActivity.java
```

そして先頭行を変更します。

```java
package com.yourstudio.yourgame;
```

Android Studio の `Refactor > Rename` を使うと安全です。

## 4. Manifest を確認する

ファイル:

```text
android/app/src/main/AndroidManifest.xml
```

通常は次のままで問題ありません。

```xml
android:name=".MainActivity"
```

`MainActivity` が `namespace` のパッケージ内にある場合です。

## 5. バージョンを変更する

ファイル:

```text
android/app/build.gradle
```

次を変更します。

```gradle
versionCode 1
versionName "1.0.0"
```

Google Play の更新では、毎回 `versionCode` を増やす必要があります。

## 6. アイコンを変更する

次のファイルを置き換えます。

```text
android/app/src/main/res/mipmap-mdpi/ic_launcher.png
android/app/src/main/res/mipmap-hdpi/ic_launcher.png
android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
```

Manifest はすでに次を使っています。

```xml
android:icon="@mipmap/ic_launcher"
```

## 7. Android Studio のプロジェクト名を変更する

ファイル:

```text
android/settings.gradle
```

次を変更します。

```gradle
rootProject.name = "RPG Nekos by Nekobot"
```

## 8. RPG Maker のゲームをコピーする

1. RPG Maker MV/MZ から export します。
2. `www` の中身を次へコピーします。

```text
game-export/www
```

3. 次を実行します。

```powershell
.\tools\sync-rpgmaker-export.ps1
```

4. Android Studio で `android/` を開いてビルドします。

## すでに含まれるパッチ

Android コンテナには次のパッチが含まれています。

- `PIXI.Texture`: 大きすぎる texture や不正な frame の問題を軽減します。
- `SceneManager.isGameActive()`: RPG Maker MZ のモバイル環境で `true` を返します。
- `AudioManager.audioFileExt()`: `WebAudio.canPlayOgg()` が利用可能な場合、モバイルで `.ogg` を使います。
