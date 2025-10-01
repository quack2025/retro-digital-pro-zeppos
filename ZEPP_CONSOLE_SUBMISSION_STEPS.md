# 🚀 Guía Paso a Paso - Submission a Zepp Console

## Preparación Final

### 📁 Organiza tus archivos:

```
C:\Users\jorge\zeppos\
├── submission-assets/
│   ├── icon/
│   │   └── icon.png (192x192)
│   ├── screenshots-gtr4/
│   │   ├── 01-retro-green.png (466x466)
│   │   ├── 02-neon-pink.png
│   │   ├── 03-cyber-purple.png
│   │   ├── 04-health-data.png
│   │   └── 05-12hour-format.png
│   └── screenshots-gts4/
│       ├── 01-retro-green.png (390x390)
│       ├── 02-neon-pink.png
│       ├── 03-cyber-purple.png
│       ├── 04-health-data.png
│       └── 05-12hour-format.png
└── retro-80s-v2.zab
```

**ACCIÓN**: Copia tus screenshots generados a estas carpetas.

---

## PASO 1: Acceso a Zepp Console

### 1.1 Ir a Zepp Developer Console
- URL: **https://console.zepp.com/**
- Si no tienes cuenta: Click "Register" y completa el registro
- Si ya tienes cuenta: Login con tu email/password

### 1.2 Verificar Cuenta de Desarrollador
- Ir a **Account Settings** → **Developer Verification**
- Si no estás verificado, completar el proceso:
  - Nombre completo
  - Email
  - Información de contacto
  - Aceptar términos de desarrollador

---

## PASO 2: Crear Nueva Aplicación

### 2.1 Navegar a Aplicaciones
- En el dashboard principal, click **"Applications"** en el menú izquierdo
- Click botón **"Create Application"** o **"Upload New"**

### 2.2 Seleccionar Tipo
- Tipo: **"Watch Face"**
- Platform: **"Zepp OS"**
- Click **"Next"** o **"Continue"**

---

## PASO 3: Información Básica de la App

### 3.1 App ID y Nombre
```
App ID: 1091559
App Name (English): Retro 80's
Package Name: (auto-generado por Zepp Console)
```

⚠️ **IMPORTANTE**: El App ID debe ser exactamente `1091559` (el que está en tu app.json)

### 3.2 Categoría
```
Category: Watch Face → Digital
Sub-Category: Retro/Vintage (si está disponible)
```

### 3.3 Versión
```
Version Code: 2
Version Name: 2.0.0
```

### 3.4 Información del Desarrollador
```
Developer Name: jorgealejandro.rosales
Developer Email: [tu email]
Support URL: [opcional - tu GitHub o sitio web]
```

---

## PASO 4: Upload del Package (.zab)

### 4.1 Subir Archivo
- Click en **"Upload Package"** o **"Choose File"**
- Seleccionar: `C:\Users\jorge\zeppos\retro-80s-v2.zab`
- Esperar validación (puede tomar 1-2 minutos)

### 4.2 Verificar Compatibilidad
El sistema detectará automáticamente:
- ✅ Amazfit GTR 4
- ✅ Amazfit GTS 4
- Posiblemente otros modelos compatibles

⚠️ **Si hay errores**:
- Verificar que app.json tenga App ID correcto
- Verificar que la estructura del .zab sea correcta
- Si persiste, regenerar el .zab con el build.js

---

## PASO 5: Upload de Assets Visuales

### 5.1 App Icon
```
Requirement: 192x192 pixels, PNG format
Location: submission-assets/icon/icon.png
```

- Click **"Upload Icon"**
- Seleccionar tu icon 192x192
- Preview debe verse limpio y reconocible

### 5.2 Screenshots - GTR4 (Round)
```
Requirement: 466x466 pixels, PNG format
Minimum: 3 screenshots
Recommended: 4-5 screenshots
```

**Sugerencia de orden**:
1. Screenshot principal (tema Retro Green) - **Imagen destacada**
2. Tema alternativo (Neon Pink o Cyber Purple)
3. Formato 12 horas mostrando AM/PM
4. Health data visible claramente
5. Otro tema de colección Luxury

### 5.3 Screenshots - GTS4 (Square)
```
Requirement: 390x390 pixels, PNG format
Minimum: 3 screenshots
Recommended: 4-5 screenshots
```

**Mismo orden que GTR4 pero con pantalla cuadrada**

⚠️ **Tips**:
- Primera imagen es la más importante (se muestra en store)
- Usar colores vibrantes y contrastantes
- Asegurar que los datos sean legibles
- No incluir marcas de agua o texto adicional

---

## PASO 6: Descripciones Multiidioma

### 6.1 English (Obligatorio)

**App Name**:
```
Retro 80's
```

**Short Description** (80-100 caracteres):
```
Premium retro digital watchface with 9 themes and 12/24h toggle
```

**Full Description** (500-1000 caracteres):
```
Experience the nostalgic charm of the 1980s with this premium digital watch face featuring 9 stunning color themes and complete customization.

🎨 THEMES (9 Professional Color Schemes):
• Classic Collection: Retro Green, Ice Blue, Amber Gold
• Gaming Collection: Neon Pink, Cyber Purple, Matrix Green
• Luxury Collection: Rose Gold, Platinum, Deep Blue

⏰ FEATURES:
• Toggle 12/24 hour format with a tap on time display
• Interactive touch zones for easy theme switching
• Complete health tracking: steps, heart rate, calories, battery
• Persistent preferences - your settings are saved
• Optimized battery performance with smart update intervals
• Authentic retro digital aesthetics

🎮 INTERACTIVE CONTROLS:
• Tap time → Switch 12h/24h format
• Tap top → Change theme
• Tap middle → Switch collection
• Tap bottom → Quick view with backlight

Perfect for retro enthusiasts and anyone who loves customizable, functional watchfaces!
```

**Keywords** (separados por comas):
```
retro, digital, 80s, neon, customizable, themes, health, battery, interactive, vintage
```

### 6.2 Chinese Simplified (Opcional pero recomendado)

**App Name**:
```
复古80年代
```

**Short Description**:
```
高级复古数字表盘，配有9个主题和12/24小时切换
```

**Full Description**:
```
体验80年代的怀旧魅力，这款高级数字表盘拥有9个令人惊叹的颜色主题和完整的自定义功能。

🎨 主题（9个专业配色方案）：
• 经典系列：复古绿、冰蓝、琥珀金
• 游戏系列：霓虹粉、赛博紫、矩阵绿
• 奢华系列：玫瑰金、铂金、深蓝

⏰ 功能特点：
• 点击时间显示切换12/24小时格式
• 交互式触摸区域轻松切换主题
• 完整健康追踪：步数、心率、卡路里、电量
• 持久偏好设置 - 自动保存您的设置
• 智能更新间隔优化电池性能
• 正宗的复古数字美学

🎮 交互控制：
• 点击时间 → 切换12h/24h格式
• 点击上方 → 更改主题
• 点击中间 → 切换系列
• 点击下方 → 快速查看与背光

完美适合复古爱好者和喜欢可定制功能表盘的用户！
```

### 6.3 Chinese Traditional (Opcional)

**App Name**:
```
復古80年代
```

**Short Description**:
```
高級復古數字錶盤，配有9個主題和12/24小時切換
```

---

## PASO 7: Permisos y Características

### 7.1 Permisos Requeridos
Seleccionar los siguientes permisos (ya están en app.json):

- ✅ **User Health Data** → Steps
- ✅ **User Health Data** → Heart Rate
- ✅ **User Health Data** → Calories
- ✅ **Device Info** → Battery Status

**Justificación**:
```
This watchface displays real-time health and device data to provide users with comprehensive information at a glance.
```

### 7.2 Características Destacadas
Marcar las siguientes features:

- ✅ Customizable themes
- ✅ Health data display
- ✅ Battery indicator
- ✅ Multiple time formats
- ✅ Touch interactive
- ✅ Persistent settings

---

## PASO 8: Privacy & Compliance

### 8.1 Privacy Policy
```
This watchface does not collect, store, or transmit any user data.
All health information is read from device sensors and displayed
locally only. No data leaves the device. User preferences are
stored locally in device storage only.
```

### 8.2 Work Statement (Declaración de Originalidad)
```
This is an original watch face design created specifically for
Amazfit devices by jorgealejandro.rosales. All visual elements,
color schemes, and code implementation are original works. The
design draws inspiration from 1980s digital aesthetics but
contains no copyrighted material, trademarked content, or
third-party intellectual property. No external libraries or
third-party code were used. I take full responsibility for the
originality and copyright compliance of this work.
```

### 8.3 Age Rating
```
Age Rating: Everyone / All Ages
Content: No objectionable content
```

---

## PASO 9: Pricing & Distribution

### 9.1 Precio
```
Type: FREE
In-App Purchases: NO
```

### 9.2 Distribución
```
Region: Global (All Countries)
Availability: Public
```

---

## PASO 10: Review & Submit

### 10.1 Pre-Submission Checklist

Verificar que TODO esté completo:

**Package & Assets**:
- ✅ retro-80s-v2.zab uploaded
- ✅ Icon 192x192 uploaded
- ✅ 4-5 GTR4 screenshots uploaded
- ✅ 4-5 GTS4 screenshots uploaded

**Information**:
- ✅ App ID: 1091559
- ✅ Version: 2.0.0 (code: 2)
- ✅ English description complete
- ✅ Chinese descriptions (optional)
- ✅ Keywords added

**Legal**:
- ✅ Privacy policy statement
- ✅ Work statement / originality declaration
- ✅ Permisos justificados

### 10.2 Review Preview
- Click **"Preview"** para ver cómo se verá en la store
- Verificar que:
  - Todas las imágenes se vean bien
  - Descripciones sean claras
  - No haya errores de ortografía

### 10.3 Submit for Review
- Click **"Submit for Review"**
- Confirmación final de términos y condiciones
- Click **"Confirm Submission"**

---

## PASO 11: Post-Submission

### 11.1 Timeline Esperado
```
Submission → Review: 3-7 días hábiles
Review → Approval/Rejection: 1-2 días
Approval → Live on Store: Inmediato
```

### 11.2 Monitoreo
- Revisar email regularmente
- Check Zepp Console dashboard para actualizaciones
- Estados posibles:
  - **Under Review**: En proceso de revisión
  - **Changes Requested**: Necesita modificaciones
  - **Approved**: Aprobado para publicación
  - **Rejected**: Rechazado (con razones)

### 11.3 Si Solicitan Cambios
Common requests:
- Mejorar calidad de screenshots
- Ajustar descripciones
- Modificar permisos
- Actualizar icon

**Proceso**:
1. Realizar cambios solicitados
2. Re-upload assets o package
3. Re-submit para nueva revisión

### 11.4 Una Vez Aprobado
- ¡Tu watchface estará LIVE en Zepp App Store!
- Usuarios podrán buscar "Retro 80's"
- Comenzarás a ver downloads y reviews
- Puedes actualizar con nuevas versiones después

---

## 📊 Información de Contacto para Review

Si los reviewers tienen preguntas, pueden contactar:
```
Developer: jorgealejandro.rosales
Email: [tu email]
Support: [opcional - GitHub issues o sitio web]
```

---

## 🎯 Tips para Approval Rápido

1. ✅ **Screenshots de alta calidad** - Primera impresión es crucial
2. ✅ **Descripciones claras** - Sin exageraciones o claims falsos
3. ✅ **Permisos justificados** - Solo pedir lo que realmente usas
4. ✅ **Originalidad clara** - Work statement convincente
5. ✅ **Testing completo** - Asegurarte que el .zab funciona
6. ✅ **Responsive a feedback** - Si piden cambios, hazlos rápido

---

## 🚨 Errores Comunes a Evitar

❌ App ID incorrecto (debe ser 1091559)
❌ Screenshots de baja calidad o pixeladas
❌ Descripciones con typos o gramática mala
❌ Permisos no justificados
❌ Claims de funcionalidad que no existe
❌ Copyright issues (nombres de marcas, logos, etc)
❌ Icon poco profesional o genérico

---

## ✅ Estás Listo!

Con esta guía paso a paso, deberías poder completar la submission en **20-30 minutos**.

**Próximo paso**: Ve a https://console.zepp.com/ y comienza el proceso! 🚀

**¿Necesitas ayuda durante la submission?** Pregúntame y te guío en tiempo real.
