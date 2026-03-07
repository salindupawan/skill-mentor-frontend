/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // This maps the Tailwind name to the CSS variable
        "brand-primary": "var(--brand-primary)",
        "brand-secondary": "var(--brand-secondary)",
      },
    },
  },
}