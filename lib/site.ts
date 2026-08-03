export const siteConfig = {
  name: "Monarka TECH",
  tagline: "Sueña Grande. Transforma Completo. Vuela Más Lejos.",
  url: "https://monarka.tech",
  location: "El Paso, Texas",
  description:
    "Monarka TECH es una empresa de software de El Paso, TX. Creadores de CATA — el diario gastronómico social para quienes viven para comer.",
};

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/products" },
  { label: "Servicios", href: "/services" },
  { label: "Nosotros", href: "/about" },
  { label: "Contacto", href: "/contact" },
];

export const footerNav = {
  cata: [
    { label: "CATA", href: "/products/cata" },
    { label: "Preguntas frecuentes", href: "/products/cata/faq" },
    { label: "Soporte", href: "/products/cata/support" },
    { label: "Eliminar cuenta", href: "/products/cata/delete-account" },
  ],
  monarka: [
    { label: "Nosotros", href: "/about" },
    { label: "Servicios", href: "/services" },
    { label: "Contacto", href: "/contact" },
  ],
  legal: [
    { label: "Privacidad", href: "/legal/privacy" },
    { label: "Términos", href: "/legal/terms" },
  ],
};
