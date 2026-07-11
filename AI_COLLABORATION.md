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

### Páginas conocidas

| Archivo | Propósito | Estado conocido |
|---|---|---|
| `index.html` | Pantalla de entrada/inicialización | Existente |
| `home.html` | Sitio principal de Monarka TECH | En desarrollo |
| `cata.html` | Landing page de CATA | En desarrollo |
| `privacy.html` | Política de privacidad | Existente |
| `waiting.html` | Página de espera | Existente |

### Infraestructura conocida

- Sitio estático en HTML, CSS y JavaScript.
- Dominio configurado en `CNAME`: `monarka.tech`.
- Los recursos visuales están en `assets/` y algunos archivos de imagen en la raíz.
- Hay cambios locales sin confirmar; deben considerarse propiedad de Rubén hasta saber lo contrario.

### Próximo foco

- [ ] Rubén define la primera tarea prioritaria del sitio o herramienta.
- [ ] Revisar enlaces, navegación y consistencia entre las páginas existentes.
- [ ] Definir qué herramienta interna o para clientes se construirá primero.

## 4. Tablero de trabajo

Usar una fila por tarea. Una tarea solo puede tener un responsable activo.

| ID | Prioridad | Tarea | Responsable | Estado | Archivos previstos | Última actualización |
|---|---|---|---|---|---|---|
| M-001 | Alta | Definir el siguiente entregable con Rubén | Sin asignar | Terminada | — | 2026-07-11 |
| M-002 | Alta | Migrar el sitio estático (HTML) a Next.js/React/TypeScript/Tailwind, IA multi-página (Home/Products/Services/About/Contact/Legal), deploy Cloudflare Pages | Claude | En curso | app/, components/, content/, lib/, public/, next.config.ts, package.json, tailwind.config.ts | 2026-07-11 |

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

No hay handoffs activos.

## 10. Bitácora

Añadir entradas nuevas arriba de las anteriores.

### 2026-07-11 — Claude

- Tomó la tarea M-002: migración completa del sitio estático a Next.js/React/TypeScript/Tailwind.
- Inventarió el sitio actual (secciones, assets, formularios, SEO) antes de diseñar la migración.
- Definió arquitectura, sitemap y sistema de componentes siguiendo `Monarka_Overnight_AI_Kit`; plan aprobado por Rubén.
- Verificación: se confirmó Node v22.17.1 / npm 10.9.2 disponibles antes de iniciar el scaffold.
- Pendiente: ver M-002 en el tablero; próximos pasos en el Morning Engineering Report al finalizar.

### 2026-07-11 — Codex

- Creó el documento compartido de colaboración.
- Registró el inventario inicial de páginas y las reglas para evitar conflictos.
- Verificación: se inspeccionó la estructura actual del repositorio; no se modificó ninguna página existente.

## 11. Preguntas abiertas para Rubén

- ¿Cuál es el primer resultado que debe construirse: mejorar el sitio, terminar CATA o crear una herramienta nueva?
- ¿Quién es el público principal inmediato: startups, negocios locales, restaurantes o clientes de soporte IT?
- ¿Qué acción quieres que realice un visitante después de conocer Monarka TECH?

