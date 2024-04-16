/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["apps/**/*.{html,js}"],
    plugins: [],
    theme: {
        extend: {
            colors: {
                "green-leaf": "#39B54A",
                "green-n": "#2BCF3C",
                "green-l": "#74FF82",
                "green-l-hover": "#1BAB43",
                "green-l-onclick": "#0D9232",
                "green-ll": "#EBFFEE",
                "green-ll-hover": "#C6FFCE",
                "green-ll-onclick": "#6CB877",
                "red-l": "#FF7474",
                "gray-n": "#EDEDED",
                "gray-d": "#BABABA",
            },
            fontFamily: {
                play: ["Play"],
                jockeyone: ["'Jockey One'"],
            },
        },
    },
};
