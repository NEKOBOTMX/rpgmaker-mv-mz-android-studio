# RPG Nekos by Nekobot

Repositorio de Android Studio para publicar juegos de RPG Maker MV/MZ en Android.

Este repositorio esta pensado para subirse a GitHub como codigo fuente. No incluye carpetas generadas de build, archivos locales de Android Studio, llaves de firma, respaldos ni exports completos de RPG Maker.

## Que Incluye

- `android/`: proyecto Android Studio.
- `android/gradlew` y `android/gradlew.bat`: Gradle wrapper.
- `game-export/www/.gitkeep`: placeholder para el export de RPG Maker.
- `android/app/src/main/assets/www/index.html`: pagina placeholder.
- `tools/sync-rpgmaker-export.ps1`: script para copiar el export a Android assets.
- `android/app/src/main/assets/patches/`: parches runtime para Android.
- `docs/`: documentacion y notas de seguridad.

## Parches Incluidos

La app Android ya inyecta estos parches despues de que carga la pagina de RPG Maker:

```text
android/app/src/main/assets/patches/nekobot-pixi-texture-patch.js
android/app/src/main/assets/patches/nekobot-rpgmaker-mz-mobile-patch.js
android/app/src/main/assets/patches/nekobot-mobile-ogg-audio-patch.js
```

### 1. Pixi Texture Patch

Parchea `PIXI.Texture` para reducir crashes, pantallas negras o errores por texturas demasiado grandes o frames fuera de la textura base en Android/WebView.

### 2. RPG Maker MZ Mobile Activity Patch

Parchea `SceneManager.isGameActive()` en dispositivos moviles para que devuelva `true`. Esto ayuda a que RPG Maker MZ siga activo dentro del WebView de Android.

### 3. Mobile OGG Audio Patch

Parchea `AudioManager.audioFileExt()` para que en moviles use `.ogg` cuando `WebAudio.canPlayOgg()` este disponible, en lugar de caer siempre a `.m4a`.

## Uso Rapido

1. Exporta tu juego desde RPG Maker MV/MZ.
2. Copia el contenido del `www` exportado a:

```text
game-export/www
```

3. Ejecuta:

```powershell
.\tools\sync-rpgmaker-export.ps1
```

4. Abre `android/` en Android Studio.
5. Compila y publica desde Android Studio.

Guia visual para cambiar nombre, ID, paquete, icono y version:

[personalizar-android-studio.md](personalizar-android-studio.md)

La app carga el juego desde:

```text
file:///android_asset/www/index.html
```

## Seguridad Por Defecto

- Sin `android.permission.INTERNET` por defecto.
- Backup de Android desactivado.
- Trafico cleartext desactivado.
- Acceso universal desde `file://` desactivado.
- El sync elimina artefactos fuente/archivo como `.rar`, `.zip`, `.psd`, `.bak` y `.tmp`.

Lee tambien:

```text
docs/security-audit.md
```

## Para Publicar En GitHub

La carpeta debe conservar solo archivos fuente del repo. No subas:

- `android/.gradle/`
- `android/.idea/`
- `android/build/`
- `android/app/build/`
- `android/local.properties`
- `backups/`
- exports completos con assets comerciales si no tienes licencia para distribuirlos.
