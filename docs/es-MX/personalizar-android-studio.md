# Personalizar El Proyecto En Android Studio

Esta guia explica los archivos que debes cambiar antes de publicar tu app.

## 1. Cambiar Nombre De La App

Archivo:

```text
android/app/src/main/res/values/strings.xml
```

Cambia:

```xml
<string name="app_name">RPG Nekos by Nekobot</string>
```

por el nombre de tu juego.

## 2. Cambiar Application ID

Archivo:

```text
android/app/build.gradle
```

Cambia:

```gradle
applicationId "com.nekobot.rpgnekos"
namespace "com.nekobot.rpgnekos"
```

Ejemplo:

```gradle
applicationId "com.tuestudio.tujuego"
namespace "com.tuestudio.tujuego"
```

Este ID debe ser unico si vas a publicar en Google Play.

## 3. Cambiar Paquete Java

Ruta actual:

```text
android/app/src/main/java/com/nekobot/rpgnekos/MainActivity.java
```

Si cambias el paquete a `com.tuestudio.tujuego`, mueve el archivo a:

```text
android/app/src/main/java/com/tuestudio/tujuego/MainActivity.java
```

Y cambia la primera linea:

```java
package com.tuestudio.tujuego;
```

Android Studio puede hacer esto con `Refactor > Rename` sobre las carpetas del paquete.

## 4. Cambiar Manifest

Archivo:

```text
android/app/src/main/AndroidManifest.xml
```

Normalmente puedes dejar:

```xml
android:name=".MainActivity"
```

si `MainActivity` sigue dentro del mismo paquete definido por `namespace`.

## 5. Cambiar Version

Archivo:

```text
android/app/build.gradle
```

Cambia:

```gradle
versionCode 1
versionName "1.0.0"
```

Cada update para Google Play debe subir `versionCode`.

## 6. Cambiar Icono

Reemplaza estos archivos:

```text
android/app/src/main/res/mipmap-mdpi/ic_launcher.png
android/app/src/main/res/mipmap-hdpi/ic_launcher.png
android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
```

El manifest ya usa:

```xml
android:icon="@mipmap/ic_launcher"
```

## 7. Cambiar Nombre Del Proyecto Android Studio

Archivo:

```text
android/settings.gradle
```

Cambia:

```gradle
rootProject.name = "RPG Nekos by Nekobot"
```

## 8. Copiar Tu Juego RPG Maker

1. Exporta desde RPG Maker MV/MZ.
2. Copia el contenido de `www` a:

```text
game-export/www
```

3. Ejecuta:

```powershell
.\tools\sync-rpgmaker-export.ps1
```

4. Abre `android/` en Android Studio y compila.

## Parches Que Ya Incluye El Repositorio

El contenedor Android ya parchea:

- `PIXI.Texture`: reduce problemas de texturas grandes o frames invalidos.
- `SceneManager.isGameActive()`: en movil devuelve `true` para RPG Maker MZ.
- `AudioManager.audioFileExt()`: usa `.ogg` en movil si `WebAudio.canPlayOgg()` esta disponible.
