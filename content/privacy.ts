export const lastUpdated = "12 de junio de 2026";

export type PrivacySubsection = {
  h3?: string;
  paragraphs?: string[];
  list?: string[];
};

export type PrivacySection = {
  title: string;
  cata?: boolean;
  intro?: string[];
  subsections?: PrivacySubsection[];
  outro?: string[];
};

export const privacySections: PrivacySection[] = [
  {
    title: "1. Introducción",
    intro: [
      `En Monarka TECH ("nosotros", "nuestro"), con sede en El Paso, TX, nos comprometemos a proteger tu privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y compartimos la información personal que obtenemos a través de:`,
    ],
    subsections: [
      {
        list: [
          "Nuestro sitio web monarka.tech",
          "La aplicación móvil CATA — Dining Journal (iOS y Android)",
          "Cualquier otro servicio digital operado por Monarka TECH",
        ],
      },
    ],
    outro: [
      "Al usar nuestros servicios, aceptas las prácticas descritas en esta política. Si no estás de acuerdo, te pedimos que no utilices nuestros servicios.",
    ],
  },
  {
    title: "2. Información que Recopilamos",
    subsections: [
      {
        h3: "2.1 Información que proporcionas directamente",
        list: [
          "Nombre, dirección de correo electrónico y datos de contacto al crear una cuenta o llenar formularios de contacto",
          "Información de perfil como nombre de usuario y foto de perfil",
          "Contenido que publicas, incluyendo reseñas, comentarios, fotos y calificaciones",
          "Comunicaciones que nos envías a través de formularios de contacto o correo electrónico",
        ],
      },
      {
        h3: "2.2 Información recopilada automáticamente",
        list: [
          "Datos del dispositivo: modelo, sistema operativo, identificadores únicos",
          "Datos de uso: páginas visitadas, funciones utilizadas, tiempo de sesión",
          "Datos de ubicación aproximada (solo si otorgas permiso explícito)",
          "Dirección IP y datos de conexión",
        ],
      },
    ],
  },
  {
    title: "3. Datos Específicos de CATA",
    cata: true,
    intro: [
      "La aplicación CATA — Dining Journal recopila información adicional relacionada con la experiencia gastronómica:",
    ],
    subsections: [
      {
        h3: "3.1 Contenido gastronómico",
        list: [
          "Registros de platillos (Log Dish): fotos, nombres, calificaciones, notas personales y restaurante asociado",
          'Colecciones de platillos en "My Menu", Food Journeys y estadísticas de logros (Badges)',
          "Actividad social: publicaciones en el Feed, likes, comentarios, usuarios que sigues",
        ],
      },
      {
        h3: "3.2 Datos de restaurantes y servicios",
        list: [
          "Búsquedas de restaurantes y resultados de exploración en el mapa",
          "Restaurantes marcados como visitados y páginas de restaurante reclamadas",
          "Contenido publicado en Restaurant Mode: menús oficiales, historias de 48h",
        ],
      },
      {
        h3: "3.3 Gamificación y logros",
        list: [
          "Puntos acumulados y posición en el Leaderboard por ciudad",
          "Badges desbloqueados, Food Journeys creados y estadísticas de uso",
        ],
      },
      {
        h3: "3.4 Datos sociales y comunidades",
        list: [
          "Comunidades y grupos a los que perteneces",
          "Participación en mesas (Group Tables) y eventos de la comunidad",
        ],
      },
    ],
  },
  {
    title: "4. Cómo Usamos tu Información",
    subsections: [
      {
        list: [
          "Proveer, mantener y mejorar nuestros servicios y aplicaciones",
          "Personalizar tu experiencia y recomendaciones",
          "Procesar reservaciones y solicitudes de servicio",
          "Enviar comunicaciones relevantes sobre tu cuenta o servicios",
          "Generar estadísticas agregadas y anónimas para mejorar la plataforma",
          "Prevenir fraude y proteger la seguridad de nuestros usuarios",
          "Cumplir con obligaciones legales aplicables",
        ],
      },
    ],
  },
  {
    title: "5. Compartir Información",
    intro: [
      "No vendemos tu información personal. Podemos compartir datos en los siguientes casos:",
    ],
    subsections: [
      {
        list: [
          "Contenido público: Las publicaciones del Feed, reseñas y tu perfil público son visibles para otros usuarios según tu configuración de privacidad",
          "Restaurantes asociados: Cuando realizas una reservación, compartimos la información necesaria con el establecimiento",
          "Proveedores de servicio: Trabajamos con terceros que nos ayudan a operar nuestros servicios (hosting, análisis, notificaciones), bajo acuerdos de confidencialidad",
          "Requisitos legales: Cuando sea requerido por ley, orden judicial o proceso legal",
          "Protección de derechos: Para proteger los derechos, propiedad o seguridad de Monarka TECH, nuestros usuarios o el público",
        ],
      },
    ],
  },
  {
    title: "6. Almacenamiento y Seguridad",
    intro: [
      "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información, incluyendo cifrado en tránsito y en reposo. Sin embargo, ningún sistema es completamente seguro, y no podemos garantizar seguridad absoluta.",
      "Retenemos tu información personal mientras tu cuenta esté activa o según sea necesario para proveer nuestros servicios. Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento.",
    ],
  },
  {
    title: "7. Tus Derechos",
    intro: ["Dependiendo de tu ubicación, puedes tener los siguientes derechos:"],
    subsections: [
      {
        list: [
          "Acceso: Solicitar una copia de los datos personales que tenemos sobre ti",
          "Corrección: Solicitar la corrección de datos inexactos",
          "Eliminación: Solicitar la eliminación de tus datos personales",
          "Portabilidad: Solicitar tus datos en un formato estructurado y legible",
          "Oposición: Oponerte al procesamiento de tus datos en ciertos casos",
          "Retiro de consentimiento: Retirar cualquier consentimiento previamente otorgado",
        ],
      },
    ],
    outro: ["Para ejercer estos derechos, contáctanos en privacy@monarka.tech."],
  },
  {
    title: "8. Menores de Edad",
    intro: [
      "Nuestros servicios no están dirigidos a menores de 13 años. No recopilamos intencionalmente información de menores de 13 años. Si descubrimos que hemos recopilado datos de un menor sin el consentimiento parental adecuado, los eliminaremos de nuestros sistemas.",
    ],
  },
  {
    title: "9. Cookies y Tecnologías Similares",
    intro: [
      "Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la experiencia de navegación, analizar el tráfico y personalizar el contenido. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.",
    ],
  },
  {
    title: "10. Cambios a esta Política",
    intro: [
      "Podemos actualizar esta Política de Privacidad periódicamente. Publicaremos cualquier cambio en esta página con la fecha de actualización revisada. Te recomendamos revisar esta política regularmente. El uso continuado de nuestros servicios después de los cambios constituye tu aceptación de la política actualizada.",
    ],
  },
  {
    title: "11. Contacto",
    intro: [
      "Si tienes preguntas o inquietudes sobre esta Política de Privacidad, puedes contactarnos en:",
    ],
    subsections: [
      {
        list: [
          "Empresa: Monarka TECH",
          "Ubicación: El Paso, TX",
          "Correo: privacy@monarka.tech",
          "Sitio web: monarka.tech",
        ],
      },
    ],
  },
];
