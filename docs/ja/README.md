# RPG Nekos by Nekobot

RPG Maker MV/MZ のゲームを Android で公開するための Android Studio リポジトリです。

このリポジトリは GitHub にソースコードとして公開することを想定しています。生成された build フォルダ、Android Studio のローカル設定、署名キー、バックアップ、完全な RPG Maker export は含めません。

## 含まれるもの

- `android/`: Android Studio プロジェクト。
- `android/gradlew` と `android/gradlew.bat`: Gradle wrapper。
- `game-export/www/.gitkeep`: RPG Maker export 用 placeholder。
- `android/app/src/main/assets/www/index.html`: runtime 用 placeholder。
- `tools/sync-rpgmaker-export.ps1`: export を Android assets にコピーするスクリプト。
- `android/app/src/main/assets/patches/`: Android runtime patch。
- `docs/`: ドキュメントとセキュリティメモ。

## 含まれるパッチ

Android アプリは RPG Maker のページ読み込み後に次のパッチを注入します。

```text
android/app/src/main/assets/patches/nekobot-pixi-texture-patch.js
android/app/src/main/assets/patches/nekobot-rpgmaker-mz-mobile-patch.js
android/app/src/main/assets/patches/nekobot-mobile-ogg-audio-patch.js
```

### 1. Pixi Texture Patch

`PIXI.Texture` をパッチします。Android/WebView で大きすぎる texture frame や base texture の外にある frame が原因のクラッシュ、黒画面、描画エラーを軽減します。

### 2. RPG Maker MZ Mobile Activity Patch

モバイル端末で `SceneManager.isGameActive()` が `true` を返すようにします。Android WebView 内で RPG Maker MZ が正しく動作し続けるための補助です。

### 3. Mobile OGG Audio Patch

`AudioManager.audioFileExt()` をパッチします。`WebAudio.canPlayOgg()` が利用可能な場合、モバイルでも `.ogg` を使います。常に `.m4a` に落ちる動作を避けます。

## クイックスタート

1. RPG Maker MV/MZ でゲームを export します。
2. export された `www` の中身を次へコピーします。

```text
game-export/www
```

3. 次を実行します。

```powershell
.\tools\sync-rpgmaker-export.ps1
```

4. Android Studio で `android/` を開きます。
5. Android Studio から build / publish します。

名前、ID、パッケージ、アイコン、バージョンを変更するためのビジュアルガイド:

[customize-android-studio.md](customize-android-studio.md)

アプリは次からゲームを読み込みます。

```text
file:///android_asset/www/index.html
```

## セキュリティ初期設定

- デフォルトでは `android.permission.INTERNET` なし。
- Android backup 無効。
- cleartext traffic 無効。
- `file://` からの universal access 無効。
- sync script は `.rar`, `.zip`, `.psd`, `.bak`, `.tmp` などの source/archive artifact を削除します。

こちらも確認してください。

```text
docs/security-audit.md
```

## GitHub 公開時の注意

リポジトリにはソースファイルだけを残してください。次はアップロードしません。

- `android/.gradle/`
- `android/.idea/`
- `android/build/`
- `android/app/build/`
- `android/local.properties`
- `backups/`
- 配布許可のない商用 assets を含む完全な export。
