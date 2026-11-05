// Spanish copy — the source of truth for the dictionary shape. Every other
// locale must match this structure exactly (enforced by `Dictionary`).
export const es = {
  meta: {
    siteDescription:
      "Monarka TECH es una empresa de software de El Paso, TX. Creadores de CATA — el diario gastronómico social para quienes viven para comer.",
    homeTitle: "Premium Software. Built to Last.",
    homeDescription:
      "Monarka TECH es una empresa de software de El Paso, TX. Creadores de CATA — el diario gastronómico social para quienes viven para comer.",
    studioTitle: "Monarka Studio — Medios 3D y Sonido",
    studioDescription:
      "Monarka Studio: audio espacial y diseño sonoro para anuncios, y el desarrollo en curso de experiencias inmersivas en 3D con Unity.",
    designsTitle: "Nuestros diseños",
    designsDescription:
      "Diseños web de Monarka TECH por industria: hotelería, empresas, diseño de interiores, restaurantes, tiendas y más. Demos reales que puedes recorrer.",
  },
  common: {
    navLabel: "Navegación principal",
    logoLabel: "Monarka TECH, inicio",
    talk: "Hablemos",
    switchLanguage: { short: "EN", label: "View this page in English" },
    musicOn: "Activar música",
    musicOff: "Silenciar música",
    taglinePhrases: ["Sueña grande", "Transforma completo", "Vuela más lejos"],
    errorMessage: "Algo salió mal. Intenta de nuevo o escríbenos a hello@monarka.tech.",
    sending: "Enviando...",
  },
  nav: {
    home: "Inicio",
    capabilities: "Capacidades",
    work: "Trabajo",
    studio: "Studio",
    about: "Nosotros",
    faq: "FAQ",
    designs: "Nuestros diseños",
  },
  home: {
    capabilities: {
      eyebrow: "Lo que hacemos",
      titleLines: ["De una posibilidad", "a un producto real."],
    },
    work: {
      eyebrow: "Trabajo seleccionado · 01",
      metaLines: ["Producto propio", "Food discovery · Social journal"],
      badge: "Beta abierta para iPhone",
      cataSubtitle: "Diario gastronómico social",
      cardEyebrow: "Producto insignia",
      cardTitle: "Tu mundo de sabores, lugares y memorias.",
      cardBody:
        "CATA convierte cada comida en una historia. Descubre lugares, registra platillos y comparte experiencias que vale la pena recordar.",
      cardCta: "Descubrir CATA",
    },
    about: {
      eyebrow: "Monarka TECH · El Paso, Texas",
      title: "Construimos para la vida real.",
      lead: "Somos una compañía de tecnología enfocada en convertir ideas ambiciosas en experiencias digitales intuitivas, útiles y humanas.",
      body: "Combinamos pensamiento de producto, diseño y desarrollo para crear tecnología con valor práctico—desde aplicaciones propias hasta soluciones para negocios en crecimiento.",
      cta: "Conoce a Monarka",
    },
    start: {
      eyebrow: "Empecemos",
      title: "¿Quieres construir algo con nosotros?",
      body: "Cuéntanos qué necesitas y te respondemos directamente a tu correo.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Antes de que preguntes.",
    },
    footer: {
      eyebrow: "¿Tienes una idea?",
      title: "Hagámosla real.",
    },
  },
  studio: {
    hero: {
      eyebrow: "Monarka Studio · Medios 3D + Sonido",
      title: "Sonido y mundos en 3D, construidos con intención.",
      body: "La rama de Monarka dedicada a experiencias sensoriales — audio espacial para anuncios hoy, y las bases de experiencias inmersivas en 3D en camino.",
    },
    available: {
      eyebrow: "Disponible hoy",
      title: "Sonido a la medida para tu marca.",
      offerings: [
        {
          num: "01",
          title: "Sonido 3D para anuncios",
          description:
            "Grabamos y producimos audio espacial pensado para anuncios que se sienten, no solo se escuchan — desde efectos envolventes hasta mezclas binaurales.",
        },
        {
          num: "02",
          title: "Diseño sonoro de marca",
          description:
            "Jingles, paisajes sonoros e identidad auditiva hechos a la medida para reforzar tu marca en cada punto de contacto.",
        },
      ],
    },
    listen: {
      eyebrow: "Escucha · Audio 3D",
      title: "Bienvenido al mundo 3D.",
      body: "Así se siente un anuncio con sonido espacial: la voz y los efectos se mueven a tu alrededor, de un oído al otro, como si estuvieras ahí.",
      headphones: "Ponte audífonos para vivirlo completo",
      play: "Reproducir audio 3D",
      pause: "Pausar audio 3D",
      trackTitle: "Welcome to the 3D World",
      left: "Izquierda",
      right: "Derecha",
      seek: "Posición del audio",
    },
    demos: {
      eyebrow: "Demos en vivo",
      title: "Sitios que puedes recorrer.",
      body: "Demos funcionales que diseñamos y programamos, listos para recorrer. Pasa el cursor para ver la página completa o haz clic para explorarla en grande.",
      fictional: "Marcas ficticias creadas para mostrar nuestro trabajo",
      open: "Explorar",
      fictionalShort: "Marca ficticia",
      close: "Cerrar demo",
      prev: "Demo anterior",
      next: "Siguiente demo",
      viewAll: "Ver todos nuestros diseños",
      items: [
        {
          slug: "construction-timelapse",
          type: "construction",
          name: "Strata Build Co.",
          category: "Construcción",
          description: "Constructora con un timelapse animado al hacer scroll: del terreno vacío al edificio terminado, piso por piso.",
        },
        {
          slug: "construction",
          type: "construction",
          name: "Meridian",
          category: "Construcción",
          description: "Alianza nacional de constructoras con red de firmas, casos de estudio, socios principales y contacto.",
        },
        {
          slug: "villa-orso",
          type: "hospitality",
          name: "Villa Orso",
          category: "Hospedaje boutique",
          description: "Apartamentos boutique en Trieste con galería de departamentos, anfitriona, reseñas, ubicación y reservas.",
        },
        {
          slug: "saas",
          type: "business",
          name: "Nimbus",
          category: "SaaS",
          description: "Plataforma de analítica para desarrolladores con globo ASCII interactivo, ejemplos de código, precios y preguntas frecuentes.",
        },
        {
          slug: "fornello",
          type: "restaurants",
          name: "Fornello",
          category: "Pizzería y bar",
          description: "Pizzería familiar con bar y lounge en la azotea: menú animado, historia desde 1974, reservas y bolsa de trabajo.",
        },
        {
          slug: "lindehof",
          type: "hospitality",
          name: "Lindehof",
          category: "Retiro de negocios",
          description: "Granja restaurada para reuniones, eventos corporativos y estancias tranquilas, con espacios, galería y boletín.",
        },
        {
          slug: "portfolio",
          type: "portfolio",
          name: "Alex Moreno",
          category: "Portafolio",
          description: "Portafolio de diseñador y desarrollador con proyectos seleccionados en 3D interactivo y transiciones de color.",
        },
        {
          slug: "interactive-dev",
          type: "portfolio",
          name: "Elio Varenne",
          category: "Desarrollador freelance",
          description: "Sitio personal de un desarrollador interactivo freelance con efectos visuales, proyectos y contacto directo.",
        },
      ],
    },
    webDesign: {
      eyebrow: "Diseño web",
      title: "Diseños web optimizados para cualquier tipo de marca.",
      body: "Restaurantes, gimnasios, boutiques, startups — diseñamos y construimos sitios a la medida de tu identidad, rápidos y listos para convertir visitas en clientes.",
      points: [
        "Diseño a la medida de tu marca, no plantillas genéricas",
        "Carga rápida y optimizado para Google (SEO)",
        "Perfecto en celular, tablet y computadora",
        "Pensado para que te contacten y te compren",
      ],
      cta: "Quiero mi sitio web",
      screenHint: "Pasa el cursor para recorrerlo · Haz clic para explorarlo",
    },
    building: {
      eyebrow: "En construcción",
      title: "Aprendiendo Unity para llevar el sonido a mundos completos.",
      lead: "Estamos desarrollando experiencias 3D e inmersivas en Unity — el siguiente capítulo de Monarka Studio.",
      body: "Es un trabajo en progreso y lo estamos documentando en el camino. Si tienes un proyecto que podría beneficiarse de audio espacial hoy, o quieres ser de los primeros en probar lo que viene en 3D, escríbenos.",
      cta: "Hablemos de tu proyecto",
    },
    footer: {
      eyebrow: "¿Tienes un proyecto en mente?",
      title: "Hagámoslo sonar.",
    },
  },
  designs: {
    hero: {
      eyebrow: "Nuestros diseños",
      title: "Un diseño para cada tipo de negocio.",
      body: "Sitios reales que diseñamos y programamos, organizados por industria. Recórrelos, ábrelos en grande y encuentra el estilo que va con tu marca.",
    },
    sectionsLabel: "Industrias",
    all: "Todas",
    countOne: "1 diseño",
    countMany: "{n} diseños",
    categories: [
      { id: "hospitality", title: "Hotelería", description: "Hoteles, apartamentos boutique y hospedajes con reservas, galerías y reseñas." },
      { id: "business", title: "Empresa", description: "Software, startups y empresas de servicios con precios, demos de producto y formularios de contacto." },
      { id: "construction", title: "Construcción y arquitectura", description: "Constructoras, desarrolladoras y despachos con proyectos, procesos, equipos y contacto para cotizar." },
      { id: "interiors", title: "Diseño de interiores", description: "Estudios de interiorismo y arquitectura con portafolios visuales y casos de proyecto." },
      { id: "restaurants", title: "Restaurantes", description: "Menús interactivos, reservas en línea y pedidos para restaurantes, cafés y bares." },
      { id: "retail", title: "Tiendas y e-commerce", description: "Catálogos, colecciones y tiendas en línea para marcas de moda, productos y boutiques." },
      { id: "wellness", title: "Salud y bienestar", description: "Gimnasios, clínicas, spas y estudios con horarios, planes y citas." },
      { id: "realestate", title: "Bienes raíces", description: "Inmobiliarias y desarrollos con listados de propiedades, mapas y visitas." },
      { id: "education", title: "Educación", description: "Escuelas, academias y cursos con programas, inscripciones y calendarios." },
      { id: "events", title: "Eventos y bodas", description: "Bodas, conferencias y experiencias con agenda, RSVP y venta de boletos." },
      { id: "portfolio", title: "Portafolios y creativos", description: "Fotógrafos, artistas, agencias y marcas personales con galerías y proyectos." },
    ],
    comingSoon: {
      label: "Próximamente",
      title: "Tu sitio podría ser el primero aquí.",
      body: "Estamos preparando diseños para esta industria. Si tienes un negocio así, lo diseñamos a la medida.",
      cta: "Quiero mi diseño",
    },
    cta: {
      eyebrow: "¿No ves tu industria?",
      title: "Diseñamos para cualquier tipo de marca.",
      body: "Cuéntanos de tu negocio y te mostramos cómo se vería tu sitio.",
      button: "Hablemos de tu sitio",
    },
  },
  capabilities: {
    digitalProducts: {
      title: "Productos digitales",
      description: "Concepto, estrategia y experiencias que se sienten naturales desde el primer toque.",
    },
    apps: {
      title: "Apps y plataformas",
      description: "Aplicaciones móviles y plataformas web construidas para evolucionar, no para caducar.",
    },
    automation: {
      title: "Automatización",
      description: "Sistemas inteligentes que eliminan fricción y convierten trabajo repetitivo en impulso.",
    },
    support: {
      title: "Tecnología y soporte",
      description: "Infraestructura, implementación y acompañamiento técnico para negocios en movimiento.",
    },
    studio: {
      title: "Monarka 3D Studio",
      description: "Medios 3D y sonido — audio espacial para anuncios, y experiencias inmersivas en camino.",
    },
  },
  cataShowcase: {
    screenshotAlt: "Captura de la app CATA",
    captions: [
      ["Tu perfil de sabor", "CATA descubre tu estilo: sabores favoritos, insignias e historias de tus comidas."],
      ["Explora a tu alrededor", "Busca platillos, restaurantes y personas, y encuentra lugares cerca de ti según tu gusto."],
      ["¿No sabes dónde comer?", "Elige un tipo de cocina y deja que CATA sortee un lugar cerca de ti."],
      ["Conoce cada restaurante", "Fotos, calificaciones y dirección. Guárdalo, márcalo como visitado o súmalo a tu viaje."],
      ["Registra cada platillo", "Agrega foto, fecha, restaurante y con quién lo compartiste."],
      ["Califica lo que probaste", "Marca ingredientes, sabores y aromas con una intensidad del 1 al 5."],
      ["Revisa y publica", "Confirma tu reseña y elige quién puede verla."],
      ["Tu radar de sabor", "Descubre qué intensidades dominan tu paladar: mantecoso, cálido, dulce y más."],
      ["Tu diario gastronómico", "Guarda cada viaje como una colección: Italia, Ciudad de México, Copenhague y más."],
      ["Planea tu ruta", "Ve tus paradas en orden sobre el mapa, con un botón para llegar a cada una."],
      ["Agrega paradas a tu viaje", "Restaurante, platillo, fecha, calificación y notas de cada parada."],
      ["Listas para descubrir", "Guarda listas curadas, solicita unirte y compártelas con tus amigos."],
      ["Crea tus propias recetas", "Importa desde un enlace, foto o texto, con ingredientes y pasos."],
    ] as [string, string][],
  },
  faq: [
    {
      q: "¿Cuánto tiempo toma un proyecto?",
      a: "Depende del alcance, pero desde la primera conversación te damos un cronograma claro y realista.",
    },
    {
      q: "¿Qué tecnologías usan?",
      a: "Elegimos tecnología moderna y escalable según las necesidades específicas de cada proyecto, no una plantilla fija.",
    },
    {
      q: "¿Ofrecen soporte después del lanzamiento?",
      a: "Sí. Ofrecemos soporte continuo y mantenimiento para que tu producto siga funcionando bien con el tiempo.",
    },
    {
      q: "¿Trabajan con negocios pequeños y grandes?",
      a: "Sí, trabajamos con negocios en distintas etapas — desde ideas nuevas hasta empresas ya establecidas.",
    },
    {
      q: "¿Cómo empiezo un proyecto con Monarka?",
      a: "Completa el formulario de solicitud de proyecto en esta misma página, o escríbenos directamente a hello@monarka.tech.",
    },
  ],
  contactForm: {
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Correo",
    emailPlaceholder: "tu@correo.com",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu proyecto, idea o pregunta.",
    submit: "Enviar mensaje",
    sentTitle: "Mensaje enviado",
    sentBody: "Te responderemos pronto a tu correo.",
  },
  funnel: {
    areaPrompt: "¿Qué necesitas?",
    areas: {
      web: "Productos digitales",
      app: "Apps y plataformas",
      automation: "Automatización",
      support: "Tecnología y soporte",
    },
    questions: {
      web: [
        { key: "existing_site", label: "¿Ya tienes un sitio web?", type: "choice", options: ["Sí", "No"] },
        {
          key: "goal",
          label: "¿Cuál es el objetivo principal?",
          type: "choice",
          options: ["Vender productos", "Mostrar mi portafolio o servicios", "Generar clientes potenciales", "Otro"],
        },
        { key: "industry", label: "¿En qué industria está tu negocio?", type: "text" },
      ],
      app: [
        { key: "platform", label: "¿Qué plataforma necesitas?", type: "choice", options: ["iOS", "Android", "Ambas", "Web"] },
        { key: "designs", label: "¿Ya tienes diseños o wireframes?", type: "choice", options: ["Sí", "No", "Parcialmente"] },
        { key: "stage", label: "¿Es una idea nueva o un producto existente?", type: "choice", options: ["Idea nueva", "Producto existente"] },
      ],
      automation: [
        { key: "process", label: "¿Qué proceso te gustaría automatizar?", type: "text" },
        { key: "tools", label: "¿Qué herramientas usan actualmente?", type: "text" },
      ],
      support: [
        {
          key: "support_type",
          label: "¿Qué tipo de soporte necesitas?",
          type: "choice",
          options: ["Hosting", "Mantenimiento", "Seguridad", "Migración", "Otro"],
        },
        { key: "existing_system", label: "¿Tienen un sistema existente que necesita ayuda?", type: "choice", options: ["Sí", "No"] },
      ],
    } as Record<FunnelArea, FunnelQuestion[]>,
    answerPlaceholder: "Tu respuesta",
    continue: "Continuar",
    back: "Atrás",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Correo",
    emailPlaceholder: "tu@correo.com",
    business: "Negocio o proyecto (opcional)",
    businessPlaceholder: "Nombre de tu negocio o idea",
    comments: "Algo más que quieras contarnos (opcional)",
    commentsPlaceholder: "Cualquier detalle adicional",
    submit: "Enviar solicitud",
    sentTitle: "Solicitud enviada",
    sentBody: "Gracias por contarnos sobre tu proyecto — te responderemos pronto.",
  },
};

export type FunnelArea = "web" | "app" | "automation" | "support";
export type FunnelQuestion = { key: string; label: string; type: "choice" | "text"; options?: string[] };

export type Dictionary = typeof es;
