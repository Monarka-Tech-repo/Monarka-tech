# Monarka TECH — Documento compartido de trabajo

Este archivo es la fuente compartida de contexto, coordinación y continuidad para el trabajo de **Codex**, **Claude** y Rubén en el sitio web y las herramientas internas de Monarka TECH.

> Regla principal: antes de comenzar una tarea, leer este documento completo. Al terminar una sesión de trabajo, actualizar las secciones `Estado actual`, `Tablero`, `Decisiones` y `Bitácora` según corresponda.

## 1. Visión del proyecto

Monarka TECH es un socio tecnológico para negocios en etapa temprana y en crecimiento. El sitio debe presentar a la empresa, convertir visitantes en prospectos y mostrar productos propios, comenzando con CATA.

**Marca:** Monarka TECH  
**Lema:** Sueña Grande. Transforma Completo. Vuela Más Lejos.  
**Ubicación mostrada:** El Paso, Texas  
**Idioma principal:** Español  
**Producto insignia:** CATA, diario social de alta cocina

## 2. Objetivos compartidos

1. Mantener y mejorar el sitio público de Monarka TECH.
2. Construir páginas y herramientas útiles para clientes y operaciones internas.
3. Mantener una experiencia visual consistente, rápida, accesible y adaptable a móvil.
4. Trabajar de forma incremental sin borrar cambios de Rubén ni del otro asistente.
5. Documentar decisiones importantes para evitar trabajo duplicado o contradictorio.

## 3. Estado actual

**El sitio ya NO es HTML estático.** Es una app Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + Framer Motion, desplegada en Cloudflare Pages (proyecto `monarka-tech`) y en vivo en `monarka.tech`. Los archivos `home.html`, `cata.html`, `privacy.html`, `index.html`, `waiting.html`, `assets/` (raíz) y `CNAME` fueron eliminados del repo — ya no existen, ya no son la fuente de verdad.

### Rutas conocidas (app/)

| Ruta | Propósito | Estado |
|---|---|---|
| `/` | Home Monarka TECH | Terminada |
| `/about`, `/contact`, `/products`, `/services` | Páginas Monarka | Terminada (Services con placeholder) |
| `/products/cata` | Landing CATA — ahora con la identidad visual real de la app (terracota/parchment/Fraunces) y una demo interactiva de teléfono | Terminada, en refinamiento activo |
| `/products/cata/{support,faq,terms,delete-account}` | Placeholders CATA | Pendiente contenido real |
| `/products/cata/privacy` | Redirige a `/legal/privacy` | Terminada |
| `/legal`, `/legal/privacy`, `/legal/terms` | Legal (tema azul, sin cambios) | Privacy terminada, Terms placeholder |

### Infraestructura conocida

- Next.js 16, `output: 'export'` (sitio 100% estático, sin backend).
- Cloudflare Pages conectado a GitHub (`Monarka-Tech-repo/Monarka-tech`, rama `main`) — cada push a `main` dispara un deploy automático.
- Dominio `monarka.tech` en Cloudflare (nameservers movidos, zona activa, dominio personalizado agregado al proyecto Pages).
- Formularios de contacto vía Formspree — **aún no configurado** (ver Handoff H-002).
- Assets reales en `public/assets/`, comprimidos.

### Próximo foco

- [ ] Formspree: crear cuenta + 2 forms, configurar `NEXT_PUBLIC_FORMSPREE_DINER` / `NEXT_PUBLIC_FORMSPREE_RESTAURANT` en Cloudflare Pages.
- [ ] Google Places API: crear key restringida y dársela a Claude/Codex para el autocomplete de búsqueda en la demo de Explore.
- [ ] Seguir refinando la demo interactiva de CATA (`/products/cata`) para que coincida con la estructura real de `D:\CATA\CATA_App\src\screens\*` — ver Handoff H-002.
- [ ] Contenido real pendiente: Services, CATA FAQ/Terms/Support/Delete-Account, Legal Terms.

## 4. Tablero de trabajo

Usar una fila por tarea. Una tarea solo puede tener un responsable activo.

| ID | Prioridad | Tarea | Responsable | Estado | Archivos previstos | Última actualización |
|---|---|---|---|---|---|---|
| M-001 | Alta | Definir el siguiente entregable con Rubén | Sin asignar | Terminada | — | 2026-07-11 |
| M-002 | Alta | Migrar el sitio estático (HTML) a Next.js/React/TypeScript/Tailwind, IA multi-página (Home/Products/Services/About/Contact/Legal), deploy Cloudflare Pages | Claude | Terminada | app/, components/, content/, lib/, public/, next.config.ts, package.json | 2026-07-12 |
| M-003 | Alta | Cutover de despliegue: crear proyecto Cloudflare Pages, mover dominio monarka.tech, borrar los .html viejos y assets/ raíz | Claude + Rubén | Terminada (dominio en vivo; falta Formspree, ver M-005) | — | 2026-07-12 |
| M-004 | Alta | Rebrand de CATA: reemplazar el tema neon/cyberpunk inventado por la identidad real de la app (terracota/parchment/Fraunces+Plus Jakarta Sans+Caveat) + demo interactiva de teléfono (Explore/Feed/Log/My Menu/Perfil) sin login | Claude | En curso | app/products/cata/**, components/demo/**, components/sections/cata-*.tsx, content/cata.ts, content/demo.ts, app/globals.css | 2026-07-12 |
| M-005 | Media | Configurar Formspree (cuenta + 2 forms + env vars en Cloudflare Pages) | Sin asignar (requiere a Rubén) | Pendiente | Cloudflare Pages → Settings → Environment variables | 2026-07-12 |
| M-006 | Media | Google Places API para autocomplete en la búsqueda de Explore (dentro de la demo de CATA) | Sin asignar (requiere key de Rubén, restringida a monarka.tech + Places API únicamente) | Pendiente | components/demo/demo-explore.tsx | 2026-07-12 |

Estados permitidos: `Pendiente`, `En curso`, `Bloqueada`, `En revisión`, `Terminada`.

## 5. Protocolo para Codex y Claude

### Antes de editar

1. Leer este documento y comprobar el estado del repositorio.
2. Elegir una tarea `Pendiente` o continuar una tarea propia `En curso`.
3. Escribir el nombre del responsable, cambiarla a `En curso` y anotar los archivos previstos.
4. Revisar esos archivos antes de modificarlos; no asumir que siguen iguales que en una sesión anterior.
5. Si otra tarea activa toca los mismos archivos, coordinar mediante una nota en `Handoffs` antes de editar.

### Durante el trabajo

- Hacer cambios pequeños y enfocados en la tarea asignada.
- No revertir ni reformatear código ajeno sin necesidad directa.
- No eliminar archivos, contenido o funciones sin autorización explícita de Rubén.
- Mantener HTML semántico, diseño responsive y accesibilidad básica.
- No incluir secretos, credenciales, datos privados ni claves de API en el repositorio.
- Evitar dependencias nuevas salvo que aporten valor claro y queden documentadas.
- Si cambia el alcance, actualizar primero el tablero.

### Al terminar

1. Probar el cambio en proporción a su riesgo y registrar cómo se verificó.
2. Actualizar el estado de la tarea.
3. Añadir una entrada breve a `Bitácora`.
4. Registrar decisiones duraderas en `Decisiones`.
5. Si queda trabajo, escribir un handoff preciso para el siguiente asistente.

## 6. Límites de responsabilidad

- **Rubén:** define prioridades, aprueba cambios de negocio, marca, contenido sensible, costos y publicación.
- **Asistente responsable:** implementa y verifica la tarea que tomó en el tablero.
- **Asistente revisor:** puede revisar una tarea en `En revisión`, pero no rehacerla silenciosamente; documenta hallazgos y cambios.
- Ningún asistente publica, compra servicios, envía mensajes externos ni modifica sistemas fuera de este proyecto sin autorización explícita.

## 7. Estándares del proyecto

### Experiencia y contenido

- Español natural y profesional como idioma predeterminado.
- Conservar la personalidad futurista y tecnológica de Monarka sin sacrificar legibilidad.
- Cada página debe tener un objetivo y una llamada a la acción claros.
- No inventar testimonios, métricas, clientes, precios o capacidades de la empresa.

### Código

- Preferir soluciones simples compatibles con el sitio estático actual.
- Reutilizar patrones, variables y componentes existentes antes de duplicarlos.
- Comprobar al menos vista móvil y escritorio cuando se cambie la interfaz.
- Mantener navegación por teclado, contraste razonable, textos alternativos y respeto por `prefers-reduced-motion` cuando aplique.
- Documentar cualquier servicio externo, variable de entorno o paso de despliegue requerido.

### Criterio de terminado

Una tarea se marca `Terminada` solamente cuando:

- Cumple el resultado solicitado.
- No rompe las páginas relacionadas de forma evidente.
- Se verificó y la verificación quedó registrada.
- El tablero y la bitácora están actualizados.
- No quedan decisiones importantes ocultas en la conversación de un asistente.

## 8. Decisiones

Registrar aquí decisiones que deban sobrevivir a una sesión. No borrar decisiones anteriores; si una cambia, marcarla como reemplazada y enlazar su ID nuevo.

| ID | Fecha | Decisión | Motivo | Aprobó |
|---|---|---|---|---|
| D-001 | 2026-07-11 | Usar este archivo como fuente compartida de coordinación entre Codex y Claude. | Evitar contexto perdido, trabajo duplicado y ediciones conflictivas. | Rubén solicitó el documento |
| D-002 | 2026-07-11 | Migrar el sitio de HTML estático a Next.js/React/TypeScript/Tailwind + shadcn/ui + Framer Motion, reemplazando el repo en su lugar (mismo repo, mismo historial). Deploy en Cloudflare Pages (Git integration, `output: 'export'`, sin backend). IA multi-página según `Monarka_Overnight_AI_Kit/rules/15_WEBSITE_STRUCTURE.txt`: Home / Products / Services / About / Contact / Legal, CATA anidado en `/products/cata` con Support, FAQ, Privacy, Terms, Delete Account. Formularios usan Formspree (o similar) en vez de rutas API propias. Páginas sin contenido real (Services, CATA FAQ/Terms/Support/Delete-Account, Legal Terms) se crean con placeholder visible "contenido pendiente" — no se inventa texto legal ni comercial. | Fase 2 del rediseño ya confirmada por Rubén (ver memoria de Claude); calidad/escala tipo Apple-Linear-Vercel para presentación a inversionistas. | Rubén (confirmó en sesión 2026-07-11) |
| D-003 | 2026-07-12 | Cutover completo a Cloudflare Pages: nameservers movidos, proyecto `monarka-tech` conectado a GitHub, dominio personalizado `monarka.tech` agregado y activo. Se eliminó el proyecto Pages duplicado `monarkatech` (creado por error en un primer intento). Se borraron del repo los archivos estáticos viejos y `assets/` raíz una vez confirmado que Cloudflare servía el sitio nuevo correctamente. | GitHub Pages ya no es necesario; un solo proyecto Pages evita confusión. | Rubén (en sesión, paso a paso vía dashboard + Claude usando la API de Cloudflare con un token que Rubén generó) |
| D-004 | 2026-07-12 | Reemplazar el tema "neon/cyberpunk" de `/products/cata` (Orbitron, negro puro, naranja neón) — que era una invención sin relación con la app real — por la identidad visual real de CATA, tomada directamente de `D:\CATA\CATA_App\src\theme\index.js`: terracota (#B8442A) + parchment/crema + Fraunces (serif) + Plus Jakarta Sans + Caveat (manuscrita). Monarka TECH (negro/naranja) y el tema Legal (azul) no cambian. La demo interactiva de teléfono en `/products/cata` (Explore/Feed/Log/My Menu/Perfil) también se reconstruyó para reflejar la estructura real de las pantallas (`FeedScreen.js`, `ExploreScreen.js`, `MyMenuScreen.js`) y el set de íconos real (`assets/icons/modern/*.svg`), no aproximaciones genéricas. | Rubén notó repetidamente que el GUI no coincidía con la app real; la causa raíz era que el tema original del sitio nunca se basó en el diseño real de la app. | Rubén (en sesión 2026-07-12, iterando sobre capturas y código fuente real) |

## 9. Handoffs

Añadir handoffs activos arriba de los anteriores usando este formato:

```text
### H-000 — Título breve
- De: Codex/Claude
- Para: Codex/Claude/Rubén
- Tarea: M-000
- Estado: qué ya funciona
- Pendiente: siguiente acción concreta
- Archivos: rutas relevantes
- Verificación: pruebas realizadas y resultado
- Riesgos/preguntas: decisiones que todavía necesita Rubén
```

### H-002 — Cutover terminado, CATA rebrandeado; sesión pausada a media tarea de la demo
- De: Claude
- Para: Codex/Claude (quien retome mañana) y Rubén
- Tarea: M-003 (terminada) / M-004 (en curso) / M-005, M-006 (pendientes, requieren a Rubén)
- Estado:
  - **Cutover completo.** `monarka.tech` sirve la app Next.js en vivo desde Cloudflare Pages (proyecto `monarka-tech`). Los archivos estáticos viejos ya no existen en el repo (ver D-003). Confirmado con capturas y checks de HTTP en la sesión.
  - **CATA rebrandeado.** `/products/cata` y sus subrutas ya no usan el tema neon/cyberpunk inventado — usan la paleta y tipografía reales de la app (ver D-004). `SiteHeader`/`SiteFooter` ahora son theme-aware (`theme="cata"` muestra el badge/wordmark real de CATA en vez del logo de Monarka).
  - **Demo interactiva construida y en refinamiento.** `/products/cata` tiene un mockup de teléfono completamente interactivo (`components/demo/`) sin login: tabs Explore/Feed/Log/My Menu/Perfil con los íconos SVG reales de la app (`components/demo/cata-icons.tsx`, copiados de `assets/icons/modern/*.svg`, no un ícono genérico). Feed reconstruido como las secciones horizontales reales (Amigos, Restaurantes, Más Visitados, Favoritos) en vez de un feed vertical estilo Instagram. Explore tiene los tabs reales (Para ti/Ranking/Comunidad/Feed/Amigos). My Menu tiene los category pills reales (Fraunces itálica, cápsula noir/roja). El flujo de "Log Dish" es realmente funcional: calificar con estrellas, escribir un nombre, guardar, y el platillo aparece al instante en My Menu — todo con datos de demo, sin backend.
  - Rubén dio feedback iterativo varias veces ("no coincide") hasta que se comparó directamente contra el código fuente real en `D:\CATA\CATA_App\src\screens\*.js` en vez de aproximar de memoria — ahí fue cuando por fin coincidió.
- Pendiente para la próxima sesión:
  1. **Formspree** (M-005): Rubén debe crear la cuenta + 2 forms y darle los IDs a quien continúe, para configurar `NEXT_PUBLIC_FORMSPREE_DINER`/`NEXT_PUBLIC_FORMSPREE_RESTAURANT` en Cloudflare Pages vía API o dashboard.
  2. **Google Places API** (M-006): Rubén va a crear una API key **separada** de la que ya usa la app móvil (`EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`), restringida a referrer `monarka.tech/*` y solo "Places API (New)". Con esa key, cablear autocomplete (solo autocomplete, no Place Details — decisión ya tomada) en la barra de búsqueda de `components/demo/demo-explore.tsx`.
  3. Seguir subiendo la fidelidad de la demo si Rubén sigue viendo diferencias — el método que funcionó fue: pedirle captura o señalar la sección exacta, luego leer el archivo real correspondiente en `D:\CATA\CATA_App\src\screens\` (o `src\components\`, `src\theme\index.js`) en vez de adivinar.
  4. Sigue pendiente: contenido real para Services, CATA FAQ/Terms/Support/Delete-Account, Legal Terms (nadie ha inventado nada, siguen con placeholder).
- Archivos: `components/demo/**`, `components/sections/cata-*.tsx`, `components/layout/site-header.tsx`, `components/layout/site-footer.tsx`, `content/cata.ts`, `content/demo.ts`, `app/globals.css`, `app/products/cata/**`
- Verificación: `npm run build` y `npm run lint` limpios en cada paso; cada cambio se verificó visualmente en navegador headless (Playwright) contra `localhost:3000` y luego contra `monarka.tech` en vivo tras cada deploy; el flujo de Log Dish se probó interactuando de verdad (escribir, calificar, guardar, verificar que aparece en My Menu).
- Riesgos/preguntas: Un token de API de Cloudflare (permisos Pages:Edit + Zone DNS:Edit, sin acceso de cuenta completo) se usó durante la sesión para automatizar el setup — Rubén dijo que lo revocaría/rotaría después de terminar todo el trabajo de Cloudflare. Confirmar si ya lo hizo antes de asumir que sigue válido.

### H-001 — Migración Next.js lista para revisión; falta cutover de despliegue
- De: Claude
- Para: Rubén (y Codex si continúa el trabajo)
- Tarea: M-002 (código) / M-003 (cutover, nueva)
- Estado: App Next.js 16 + TS + Tailwind v4 + shadcn/ui + Framer Motion completa en 14 rutas (`/`, `/about`, `/contact`, `/products`, `/products/cata` + 5 subrutas, `/legal` + 2 subrutas, `/services`). `npm run build` y `npm run lint` pasan limpio. Contenido real (home, CATA, política de privacidad) migrado verbatim; páginas sin copy real (Services, CATA FAQ/Terms/Support/Delete-Account, Legal Terms) muestran placeholder "contenido pendiente" visible. Assets comprimidos (logo 638KB→106KB). SEO base añadida (metadata por ruta, sitemap.xml, robots.txt, favicons reales, manifest). `public/_redirects` cubre las URLs viejas de GitHub Pages.
- Pendiente: (1) Rubén crea el proyecto Cloudflare Pages y conecta este repo; (2) Rubén mueve el dominio monarka.tech de GitHub Pages a Cloudflare Pages; (3) Rubén crea cuenta Formspree y llena `NEXT_PUBLIC_FORMSPREE_DINER` / `NEXT_PUBLIC_FORMSPREE_RESTAURANT` en las variables de entorno de Cloudflare Pages; (4) solo después de que Cloudflare esté sirviendo el sitio en vivo, borrar `home.html`, `cata.html`, `privacy.html`, `index.html`, `waiting.html`, `assets/` (raíz) y `CNAME` — **no se borraron todavía a propósito** porque GitHub Pages sigue sirviendo el sitio en vivo desde esos archivos y borrarlos ahora tumbaría monarka.tech antes del cutover. Nada de este trabajo se ha empujado (`push`) a origin.
- Archivos: `app/`, `components/`, `content/`, `lib/`, `public/`, `next.config.ts`, `package.json`
- Verificación: `npm run build` (19-22 rutas estáticas, sin errores), `npm run lint` (limpio), revisión visual en navegador (Playwright headless) de las 8 páginas principales en desktop y móvil — sin errores de consola, sin imágenes rotas, temas Monarka/CATA/Legal renderizando correctamente.
- Riesgos/preguntas: Contenido pendiente en Services, CATA FAQ/Terms/Support/Delete-Account y Legal Terms — necesita copy real de Rubén (no se inventó nada). Confirmar con Rubén si quiere que Codex o Claude redacten un primer borrador de Términos de Servicio o si eso lo maneja él/asesoría legal directamente.

## 10. Bitácora

Añadir entradas nuevas arriba de las anteriores.

### 2026-07-12 — Claude

- Empujó la app Next.js a `origin/main` (a petición de Rubén) y guio el setup de Cloudflare Pages paso a paso (Rubén operando el dashboard).
- Detectó y corrigió un proyecto Pages duplicado (`monarkatech` vs `monarka-tech`) usando la API de Cloudflare con un token que Rubén generó en la sesión.
- Confirmó el cutover: `monarka.tech` activo en Cloudflare, dominio personalizado agregado al proyecto `monarka-tech`, zona DNS activa.
- Borró los archivos estáticos viejos (`home.html`, `cata.html`, `privacy.html`, `index.html`, `waiting.html`, `assets/` raíz, `CNAME`) solo después de confirmar que el sitio nuevo estaba en vivo — ver D-003.
- A petición de Rubén, investigó el código fuente real de la app (`D:\CATA\CATA_App`) y descubrió que el tema visual de CATA en el sitio (neon/cyberpunk) nunca coincidió con el diseño real de la app (terracota/parchment/editorial) — ver D-004. Rebrandeó `/products/cata` por completo con los tokens de diseño reales.
- Construyó una demo interactiva de teléfono en `/products/cata` (Explore/Feed/Log/My Menu/Perfil, sin login, sin backend) e iteró varias veces con Rubén hasta que la estructura coincidiera con las pantallas reales (`FeedScreen.js`, `ExploreScreen.js`, `MyMenuScreen.js`) y el set de íconos real (`assets/icons/modern/*.svg`).
- Verificación: `npm run build`/`npm run lint` limpios en cada iteración; revisión visual + interacción real (Playwright headless) en cada paso, contra local y contra `monarka.tech` en vivo después de cada deploy.
- Pendiente: ver Handoff H-002 — Formspree y Google Places API key, ambos requieren acción de Rubén antes de continuar esa parte.

### 2026-07-11 — Claude

- Tomó la tarea M-002: migración completa del sitio estático a Next.js/React/TypeScript/Tailwind.
- Inventarió el sitio actual (secciones, assets, formularios, SEO) antes de diseñar la migración.
- Definió arquitectura, sitemap y sistema de componentes siguiendo `Monarka_Overnight_AI_Kit`; plan aprobado por Rubén.
- Construyó la app completa: fundación (tokens de diseño, temas por ruta, fuentes, layout, componentes compartidos) y las 14 rutas del sitemap con contenido migrado 1:1 desde el HTML original.
- Comprimió assets (`scripts/optimize-images.mjs`), generó favicons/manifest reales, añadió sitemap.xml/robots.txt, y `public/_redirects` para las URLs viejas.
- Verificación: `npm run build` y `npm run lint` limpios; revisión visual en navegador headless de las 8 páginas principales (desktop 1440px y móvil 375px), sin errores de consola.
- Pendiente: M-003 (cutover de despliegue) — ver Handoff H-001. Morning Engineering Report guardado en `D:\RULES ]\Monarka_Overnight_AI_Kit\reports\`.

### 2026-07-11 — Codex

- Creó el documento compartido de colaboración.
- Registró el inventario inicial de páginas y las reglas para evitar conflictos.
- Verificación: se inspeccionó la estructura actual del repositorio; no se modificó ninguna página existente.

## 11. Preguntas abiertas para Rubén

- ¿Cuál es el primer resultado que debe construirse: mejorar el sitio, terminar CATA o crear una herramienta nueva?
- ¿Quién es el público principal inmediato: startups, negocios locales, restaurantes o clientes de soporte IT?
- ¿Qué acción quieres que realice un visitante después de conocer Monarka TECH?

