export const tickerItems = [
  "Feed Social",
  "Explore",
  "Log Dish",
  "My Menu",
  "Leaderboard",
  "Communities",
  "Food Journeys",
  "AI Photo Tools",
  "Badges",
  "Bar Mode",
  "iOS & Android",
];

export const stats = [
  { target: 20, suffix: "+", label: "Funciones Integradas" },
  { target: 8, suffix: "", label: "Categorías de Platillos" },
  { target: 9, suffix: "+", label: "Idiomas Soportados" },
  { target: 2, suffix: "", label: "Plataformas: iOS & Android" },
];

export type SvcCard = {
  num: string;
  icon: string;
  name: string;
  text: string;
  tags: string[];
};

export const comensalesFeatures: SvcCard[] = [
  {
    num: "01 / FEED",
    icon: "📰",
    name: "FEED SOCIAL",
    text: "Tu feed, hecho de sabores. Sigue a otros foodies, da like y comenta los platillos que comparten, organizados por ciudad y restaurante.",
    tags: ["Likes", "Comentarios", "Seguir"],
  },
  {
    num: "02 / EXPLORE",
    icon: "🧭",
    name: "EXPLORE",
    text: "Descubre los platillos más populares de tu zona, busca por tipo de cocina — mexicana, italiana, japonesa, mariscos, francesa, española, asiática, steakhouse — o encuentra restaurantes y personas con búsqueda integrada de Google Places.",
    tags: ["Tendencias", "Cocinas", "Restaurantes"],
  },
  {
    num: "03 / LOG DISH",
    icon: "📸",
    name: "LOG DISH",
    text: "Captura cada platillo con foto, califícalo de 1 a 5 estrellas, asígnale una categoría — cena, brunch, almuerzo, bebidas, vinos, postre, street food o puros — y guarda tus notas de cata.",
    tags: ["Foto", "Rating 1-5", "Notas"],
  },
  {
    num: "04 / MY MENU",
    icon: "🗂️",
    name: "MY MENU",
    text: "Tu colección personal en formato mosaico. Filtra por categoría y revive cada experiencia, desde tu primera cena registrada hasta tu último maridaje.",
    tags: ["Mosaico", "Filtros", "Historial"],
  },
  {
    num: "05 / PERFIL",
    icon: "👤",
    name: "PERFILES & NOTIFICACIONES",
    text: "Perfil público compartible, seguidores y seguidos, y notificaciones en tiempo real cada vez que alguien interactúa con tus platillos.",
    tags: ["Perfil Público", "Seguidores", "Notificaciones"],
  },
  {
    num: "06 / BADGES",
    icon: "🏅",
    name: "BADGES & LOGROS",
    text: "Desbloquea insignias al alcanzar hitos: registra tu primer platillo, llega a 25 calificaciones de 5 estrellas, prueba 10 tipos de cocina diferentes y más.",
    tags: ["Logros", "Hitos", "Colección"],
  },
];

export const masFuncionesFeatures: SvcCard[] = [
  {
    num: "LEADERBOARD",
    icon: "🏆",
    name: "RANKING POR CIUDAD",
    text: "Gana puntos con cada platillo registrado. Ve tu posición en el ranking local y compite con los mejores foodies de tu ciudad dentro de Explore.",
    tags: ["Puntos", "Ciudad", "Global"],
  },
  {
    num: "COMMUNITIES",
    icon: "👥",
    name: "COMUNIDADES",
    text: "Únete a grupos de foodies por ciudad, tipo de cocina o interés. Comparte descubrimientos, vota el mejor platillo del mes y construye tu red gastronómica.",
    tags: ["Grupos", "Mesas", "Votos"],
  },
  {
    num: "FOOD JOURNEYS",
    icon: "🗺️",
    name: "FOOD JOURNEYS",
    text: "Agrupa platillos por viaje o evento. De El Paso a Austin, de CDMX a Tokio — tus memorias gastronómicas, organizadas como capítulos de tu historia.",
    tags: ["Viajes", "Ciudades", "Recuerdos"],
  },
  {
    num: "AI PHOTO TOOLS",
    icon: "✨",
    name: "AI BACKGROUND REMOVAL",
    text: "Elimina fondos de tus fotos de platillos directamente en el dispositivo, sin subir a la nube. Procesamiento local con IA — rápido, privado y sin conexión.",
    tags: ["On-Device AI", "Privado", "Sin Red"],
  },
];

export const restauranteFeatures: SvcCard[] = [
  {
    num: "01 / PÁGINA",
    icon: "🏪",
    name: "RECLAMA TU PÁGINA",
    text: "Busca tu restaurante en CATA y reclama su página oficial. Agrega fotos, horarios, ubicación y una descripción — todo visible para los comensales de tu zona.",
    tags: ["Verificado", "Perfil Oficial", "Google Maps"],
  },
  {
    num: "02 / MENÚ",
    icon: "📋",
    name: "MENÚ OFICIAL",
    text: "Publica tu menú directamente en CATA: platillos con fotos, descripciones y precios. El Chef Menu y el Cocktail Menu tienen sección propia dentro del Restaurant Mode.",
    tags: ["Chef Menu", "Cocktail Menu", "Precios"],
  },
  {
    num: "03 / STORIES",
    icon: "📖",
    name: "RESTAURANT STORIES",
    text: "Publica historias de 48 horas visibles para todos tus seguidores en CATA. Anuncia especiales del día, eventos, degustaciones o simplemente lo que salió del horno hoy.",
    tags: ["48h", "Especiales", "Eventos"],
  },
  {
    num: "04 / BAR MODE",
    icon: "🍹",
    name: "BAR MODE",
    text: "Activa el modo barra para mostrar tu menú de cócteles y bebidas en pantalla completa — pensado para barras de restaurante, lounge y speakeasy. Dashboard con calificaciones en tiempo real.",
    tags: ["Cócteles", "Pantalla Completa", "Dashboard"],
  },
];

export const leaderboard = [
  { rank: 1, initials: "AM", name: "Ana Martinez", meta: "Ciudad de México", count: 340, trophy: "🏆", avBg: "#FAECE7", avColor: "#712B13", gold: true },
  { rank: 2, initials: "ME", name: "Alex Ramirez", meta: "El Paso, TX", count: 218, trophy: "🥈", avBg: "var(--brand-red)", avColor: "#fff", me: true },
  { rank: 3, initials: "CR", name: "Carlos Reyes", meta: "Guadalajara", count: 195, trophy: "🥉", avBg: "#E1F5EE", avColor: "#085041" },
  { rank: 4, initials: "PS", name: "Priya Singh", meta: "Mumbai", count: 142, trophy: "", avBg: "#EEEDFE", avColor: "#3C3489" },
  { rank: 5, initials: "LV", name: "Luis Vargas", meta: "CDMX", count: 118, trophy: "", avBg: "#FAEEDA", avColor: "#633806" },
];
