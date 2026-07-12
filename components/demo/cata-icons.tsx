// Exact SVG icon pack from the real app (D:\CATA\CATA_App\assets\icons\modern),
// not a generic icon library — linework uses currentColor, the small accent
// marks are the app's fixed terracotta (#B5432A), same as the real app's
// src/components/Icon.js.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 64 64",
  fill: "none",
} as const;

export function IconHome(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Home</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 30.5 L32 16.5 L50 30.5" />
        <path d="M19 27.5 V45 H45 V27.5" />
        <path d="M27.5 45 V37.5 Q27.5 34.5 32 34.5 Q36.5 34.5 36.5 37.5 V45" />
      </g>
      <circle cx="34.3" cy="40" r="1" fill="#B5432A" />
    </svg>
  );
}

export function IconLogDish(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Log a dish</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="29.5" cy="35" r="11" />
        <circle cx="29.5" cy="35" r="5.5" strokeWidth="1.5" opacity="0.85" />
      </g>
      <path d="M45.5 16 V28 M39.5 22 H51.5" stroke="#B5432A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Search</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="10" />
        <path d="M36 36 L46 46" strokeWidth="2.4" />
      </g>
      <path d="M22 26 Q23 21 28 20" stroke="#B5432A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconMyMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>My menu</title>
      <rect x="21.5" y="16.5" width="21" height="31" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M26.5 24 H37.5" stroke="#B5432A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M26.5 30 H37.5 M26.5 35 H37.5 M26.5 40 H33" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconProfile(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Profile</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="24" r="6.5" />
        <path d="M18 45 Q18 33 32 33 Q46 33 46 45" />
      </g>
      <path d="M46 16 V21 M43.5 18.5 H48.5" stroke="#B5432A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconFavorite(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Favorite</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 16 L36 25.5 L46 26.3 L38.5 33 L41 43 L32 37.5 L23 43 L25.5 33 L18 26.3 L28 25.5 Z" />
      </g>
    </svg>
  );
}

export function IconLike(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Like</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 44 C25 38 19 33.5 19 27 C19 21.5 23.5 19 27 20 C29.3 20.7 30.8 22.4 32 24.4 C33.2 22.4 34.7 20.7 37 20 C40.5 19 45 21.5 45 27 C45 33.5 39 38 32 44 Z" />
      </g>
      <path d="M24.5 25.5 Q24.8 22.8 27.3 22.2" stroke="#B5432A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconComments(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Comments</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 18 H44.5 Q46.5 18 46.5 20 V34.5 Q46.5 36.5 44.5 36.5 H30 L22.8 43.5 L25 36.5 H19.5 Q17.5 36.5 17.5 34.5 V20 Q17.5 18 19.5 18 Z" />
      </g>
      <circle cx="26" cy="27.3" r="1.7" fill="#B5432A" />
      <circle cx="32" cy="27.3" r="1.7" fill="#B5432A" />
      <circle cx="38" cy="27.3" r="1.7" fill="#B5432A" />
    </svg>
  );
}

export function IconShare(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Share</title>
      <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 39.5 L42.5 22" />
        <path d="M31.5 21.5 H43 V33" />
      </g>
      <circle cx="22.5" cy="42.3" r="1.5" fill="#B5432A" />
      <circle cx="19.8" cy="45" r="1.1" fill="#B5432A" />
    </svg>
  );
}

export function IconAddPhoto(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Add photo</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 26 Q16 23.5 18.5 23.5 H25 L27.5 19 H36.5 L39 23.5 H45.5 Q48 23.5 48 26 V41 Q48 43.5 45.5 43.5 H18.5 Q16 43.5 16 41 Z" />
        <circle cx="32" cy="33" r="6.5" />
        <circle cx="32" cy="33" r="2.8" strokeWidth="1.5" />
      </g>
      <circle cx="43.5" cy="28" r="1.7" fill="#B5432A" />
    </svg>
  );
}

export function IconSave(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <title>Save</title>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 16 H41 Q43 16 43 18 V46 L32 38 L21 46 V18 Q21 16 23 16 Z" />
      </g>
      <path d="M27 23 H37" stroke="#B5432A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
