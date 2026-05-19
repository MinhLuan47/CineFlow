/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        card: "var(--card)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        gold: "var(--gold)",
        ember: "var(--ember)",
        text: "var(--text)",
        muted: "var(--muted)",
        borderColor: "var(--border)", // Tránh trùng lặp với mặc định của Tailwind (Tailwind uses border key, we can map ours to custom border if needed or simply border)
        themeBorder: "var(--border)", // Cấu hình viền màu custom
      },
      borderRadius: {
        sharp: "2px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "sans-serif"], // Font chữ tiêu đề lớn ấn tượng
      },
    },
  },
  plugins: [],
}
