export type FeedPost = {
  id: string;
  name: string;
  initials: string;
  location: string;
  dish: string;
  rating: number;
  likes: number;
  comments: number;
  image: string;
  avatarBg: string;
  avatarColor: string;
};

export const feedPosts: FeedPost[] = [
  {
    id: "p1",
    name: "Ana Martínez",
    initials: "AM",
    location: "Ciudad de México",
    dish: "Ramen Tonkotsu",
    rating: 5,
    likes: 248,
    comments: 32,
    image: "/assets/cata/dish-1.jpg",
    avatarBg: "#FAECE7",
    avatarColor: "#712B13",
  },
  {
    id: "p2",
    name: "Carlos Reyes",
    initials: "CR",
    location: "Guadalajara",
    dish: "Wagyu Omakase",
    rating: 5,
    likes: 412,
    comments: 58,
    image: "/assets/cata/dish-3.jpg",
    avatarBg: "#E1F5EE",
    avatarColor: "#085041",
  },
  {
    id: "p3",
    name: "Priya Singh",
    initials: "PS",
    location: "El Paso, TX",
    dish: "Birria Taco",
    rating: 4,
    likes: 176,
    comments: 21,
    image: "/assets/cata/dish-2.jpg",
    avatarBg: "#EEEDFE",
    avatarColor: "#3C3489",
  },
];

export const exploreDishes = [
  { id: "e1", name: "Cochinillo Asado", image: "/assets/cata/dish-6.jpg" },
  { id: "e2", name: "Carbonara Clásica", image: "/assets/cata/dish-5.jpg" },
  { id: "e3", name: "Ramen Tonkotsu", image: "/assets/cata/dish-1.jpg" },
  { id: "e4", name: "Birria Taco", image: "/assets/cata/dish-2.jpg" },
  { id: "e5", name: "Wagyu Omakase", image: "/assets/cata/dish-3.jpg" },
  { id: "e6", name: "Tostada A5", image: "/assets/cata/dish-4.jpg" },
];

export type MenuEntry = {
  id: string;
  name: string;
  image?: string;
  rating: number;
  paletteFrom?: string;
  paletteTo?: string;
};

export const seedMyMenu: MenuEntry[] = [
  { id: "m1", name: "Ramen Tonkotsu", image: "/assets/cata/dish-1.jpg", rating: 5 },
  { id: "m2", name: "Birria Taco", image: "/assets/cata/dish-2.jpg", rating: 5 },
  { id: "m3", name: "Wagyu Omakase", image: "/assets/cata/dish-3.jpg", rating: 5 },
  { id: "m4", name: "Tostada A5", image: "/assets/cata/dish-4.jpg", rating: 5 },
];

// Placeholder gradient palettes for freshly-logged demo dishes with no photo —
// mirrors the real app's cardPalettes fallback system (src/theme/index.js).
export const cardPalettes = [
  ["#8A6848", "#5A4838"],
  ["#5A8868", "#3A6848"],
  ["#7A88A8", "#4A5878"],
  ["#B87858", "#8A4838"],
];
