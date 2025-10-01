# 🌐 Guía: Revisar Network Tab en DevTools

## El Problema

La consola no muestra el error, pero el error aparece en la página. Esto significa que el error probablemente viene del **servidor** (backend de Zepp Console).

---

## 🔍 Cómo Revisar Network Tab

### Paso a Paso:

1. **Abre DevTools** (F12)

2. **Ve a la pestaña "Network"** (Red)

3. **MUY IMPORTANTE**: Marca la casilla **"Preserve log"**
   - Esto evita que los logs se borren al cambiar de página
   - En algunos navegadores dice "Conservar registro"

4. **Limpia el Network tab**:
   - Click en el icono 🚫 (clear) para empezar limpio

5. **Ahora intenta subir el .zab**:
   - Selecciona el archivo
   - Click en upload/submit
   - Espera el error

6. **Busca en la lista de requests**:
   - Busca uno que esté en **ROJO** (failed)
   - O busca por nombre: "upload", "manifest", "validate", "create"
   - Puede ser un POST request

7. **Click en ese request** que falló o que terminó

8. **Ve a las siguientes pestañas**:

   **A. Headers**:
   - Busca "Status Code": puede decir 400, 500, etc
   - Copia el Request URL

   **B. Response** o **Preview**:
   - Aquí está la clave! 🔑
   - Debe haber un mensaje de error del servidor
   - Puede ser JSON como:
     ```json
     {
       "error": "...",
       "message": "...",
       "details": {...}
     }
     ```
   - O puede ser HTML con el error

   **C. Payload** (si existe):
   - Muestra qué datos se enviaron

---

## 📸 Lo Que Necesito Ver

### 1. Screenshot del Network Tab
Mostrando:
- La lista de requests
- El request que tiene error (resaltado)

### 2. Response del Request Fallido
Copia COMPLETO el contenido de la pestaña "Response"

### 3. Headers del Request
- Status Code
- Request URL
- Request Method

---

## 🎯 Ejemplo de Lo Que Buscar

### Si ves algo como esto en Response:

```json
{
  "code": 400,
  "message": "Invalid manifest format",
  "error": "Missing field: targets[0].platforms",
  "field": "manifest.targets.gtr4.platforms"
}
```

**ESO es oro puro!** 🏆 Me dice exactamente qué campo falta o está mal.

### O si ves:

```json
{
  "error": "Cannot read properties of undefined (reading 'map')",
  "stack": "at validateTargets (/app/validator.js:123)",
  "field": "..."
}
```

**Eso también me dice exactamente qué está fallando!**

---

## 🔧 Instrucciones Visuales

```
DevTools (F12)
├── Console (tab)          ← Ya revisamos, no muestra nada
└── Network (tab)          ← REVISA ESTE AHORA! ⭐
    ├── ☑️ Preserve log    ← MARCA ESTO
    ├── 🚫 Clear           ← Click aquí primero
    └── [Lista de requests cuando subes el archivo]
        └── Click en el request que falla
            ├── Headers    ← Mira Status Code
            ├── Response   ← ⭐ COPIA TODO ESTO
            └── Preview    ← Visualización del Response
```

---

## 💡 Tips

### Si no ves ningún request en rojo:
- Busca el request más reciente después del error
- Puede estar en verde pero tener un error en el response
- Busca requests tipo POST

### Si ves muchos requests:
- Filtra por "XHR" o "Fetch" (opciones arriba)
- Busca por nombre: escribe "upload" o "manifest" en el filtro

### El request puede llamarse:
- `/api/upload`
- `/api/watchface/create`
- `/api/manifest/validate`
- O algo similar

---

## 🎯 ACCIÓN INMEDIATA

**HAZ ESTO AHORA**:

1. ✅ Abre DevTools (F12)
2. ✅ Ve a pestaña **"Network"**
3. ✅ Marca **"Preserve log"**
4. ✅ Click en 🚫 (clear) para limpiar
5. ✅ Intenta subir `retro-80s-minimal.zab`
6. ✅ Cuando aparezca el error:
   - **NO cierres nada**
   - Mira la lista de requests
   - Click en el último request POST
7. ✅ Ve a pestaña **"Response"**
8. ✅ **COPIA TODO** el contenido
9. ✅ **Compártelo conmigo**

---

## 📊 Probabilidad Alta

Hay un 90% de probabilidad de que el Response del servidor tenga un mensaje de error específico que nos diga exactamente qué está mal.

**El servidor de Zepp está validando el manifest y encontrando algo que no le gusta.**

El Response nos dirá QUÉ campo exactamente.

---

**Por favor revisa el Network tab y comparte el Response!** 🌐
