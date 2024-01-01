/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                "dark-background": "#1D1F25",
                "dark-input": "#2D323D",
                "dark-input-border": "#323844",
                "dark-blue": "#4062FF",
                "dark-blue-hover": "#334ECC",
            },
            spacing: {
                // padding-x, size: 8px to 384px, viewport: 320px to 1280px
                "fluid-page": "clamp(0.25rem, -7.6667rem + 39.5833vw, 24rem)",
                // padding-y, size: 8px to 12px, viewport: 320px to 1280px
                "fluid-input-field":
                    "clamp(0.25rem, 0.1667rem + 0.4167vw, 0.5rem)",
                // gap, size: 8px to 12px, viewport: 320px to 1280px
                "fluid-main-comp":
                    "clamp(0.5rem, 0.4167rem + 0.4167vw, 0.75rem);",
            },
        },
    },
    plugins: [],
};
