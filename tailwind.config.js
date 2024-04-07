/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["apps/**/*.{html,js}"],
    plugins: [],
    theme: {
        extend: {
            colors: {
                "red example": "#ff0000",
            },
        },
    },
};
