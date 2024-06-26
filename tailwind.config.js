/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ["var(--font-dMSans)"],
        kumbhSans: ["var(--font-kumbhSans)"],
        signature: ["var(--font-signature)"],
      },
      colors: {
        rose: "#f33274", // Adjust color names as needed for clarity
        "light-rose": "#ea3c7a",
        "bg-dark": "#06062a",
        "bg-overly": "#090e38",
        "gb-footer": "#08082d",
        cyan: "#707281",
        "light-dark": "#292962",
        lime: "#35e8b4",
        "footer-dark": "#191919",
      },

      fontSize: {
        xs: "0.75rem",
        sm: ["0.875rem", "1.75rem"],
        base: ["1rem", "1.875rem"],
        md: ["1.125rem", "1.875rem"],
        lg: ["1.25rem", "2rem"],
        xl: ["1.625rem", "2.25rem"],
        "2xl": ["2.25rem", "2.5rem"],
        "3xl": ["3rem", "3.75rem"],
        "4xl": ["3.125rem", "3.875rem"],
        "5xl": ["3.625rem", "3.975rem"],
        "6xl": ["4rem", "5rem"],
      },
      maxWidth: {
        container: "1170px",
      },
      spacing: {
        container: "0.938rem",
        section: "128px",
      },
      backgroundImage: {
        hero: "url('/img/home/home-hero-bg-2.jpg')",
        "hero-text": "url('/img/home/bg-text.png')",
        featured: "url('/img/home/feature-bg.webp')",
        footer: "url('/img/home/footer-bg.jpg')",
        albums: "url('/img/home/music-bg.png')",
        podcast: "url('/img/home/bg-podcast.png')",
        hero2: "url('/img/home/home-hero-bg.png')",
        "hero2-text": "url('/img/home/home2-hero-text.png')",
        "albums-2": "url('/img/home/music-bg-2.png')",
        "footer-2": "url('/img/home/footer-bg-2.png')",
        "hero-color": "url('/img/home/bg-color.png')",
      },
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1100px",

      xl: "1280px",

      "2xl": "1536px",
    },
  },
  plugins: [],
};
