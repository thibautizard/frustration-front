/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "stone-texture": "url('/img/asfalt-dark.png')",
        "frustration-wallpaper": "url('/img/frustration_background_home_desktop.webp')"
      }
    },
    colors: {
      yellow: "#fff200",
      red: "#700002",
      black: "#000",
      white: "#fff",
      purple: "#5c5db7"
    },
    fontFamily: {
      bebas: "Bebas Neue",
      arca: "'Arca Majora 3'",
      "open-sans": "Open Sans"
    }
  }
};
