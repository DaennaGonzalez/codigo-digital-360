# Código Digital 360

Sitio educativo independiente de Cultura Digital I. Incluye siete páginas, trece recursos visuales, cuatro infografías ampliables, laboratorio interactivo de prompts, dos videos con carga bajo demanda, cronología, bibliografía, galería y audio real de 3:21 con transcripción.

## Requisitos

- Node.js 20 o posterior
- npm

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre la dirección local que muestre Vite. Para comprobar tipos y crear la versión de producción:

```bash
npm run check
npm run build
npm run preview
```

La compilación queda en `dist/`.

## Publicar

- **Netlify:** importa el repositorio, usa `npm run build` y publica `dist`. `netlify.toml` conserva las rutas de React Router.
- **Vercel:** importa el repositorio; el framework Vite se detecta automáticamente. `vercel.json` dirige las rutas internas a `index.html`.
- También puedes alojar el contenido de `dist/` en cualquier servidor estático que redirija rutas desconocidas a `index.html`.

## Editar contenido y recursos

- Páginas: `src/pages/`
- Componentes interactivos: `src/components/`
- Navegación, prompts, galería y transcripción: `src/data/content.ts`
- Colores y diseño: variables al inicio de `src/styles/global.css`
- Imágenes: `public/assets/images/`
- Audio: `public/assets/audio/reflexion_cultura_digital_ia.mp3`
- Documentos: `public/assets/docs/`

## Verificación pendiente antes de publicar abiertamente

Las nueve fotografías o ilustraciones externas fueron proporcionadas sin prueba verificable de autoría o licencia. Deben rastrearse y documentarse antes de una publicación pública. Las cuatro infografías se acreditan como generadas con IA. Conviene comprobar periódicamente la disponibilidad de los videos y enlaces externos.

Este proyecto no es un portal oficial de la UANL ni está alojado en SharePoint.
