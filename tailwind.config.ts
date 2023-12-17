import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "ilex-gradient":
          "radial-gradient(circle, rgba(235,252,255,1) 0%, rgba(241,252,255,1) 33%, rgba(241,252,255,1) 36%)",
      },
      boxShadow: {
        'ilex-shadow': '0px 16px 51px 12px rgba(0, 173, 204, 0.4)'
      },
      colors: {
        'brand': '#00CCF1'
      }
    },
  },
  plugins: [],
}
export default config