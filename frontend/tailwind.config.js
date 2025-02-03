/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["src/**/*.{html,js}", "public/**/*.{html,js}"],
    theme: {
        clipPolygonSliceSize: {
            1: "10px",
            2: "20px",
            3: "30px",
            4: "40px",
            8: "80px",
        },
        gridRepeatAuto: {
            1: "100px",
            2: "200px",
            3: "300px",
            4: "400px",
        },
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
                jockeyone: ["JockeyOne"],
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "clip-polygon-steep": (value) => ({
                        "clip-path": `polygon(
                        ${value} 0%,
                        calc(100% - ${value}) 0%,
                        100% ${stringDivider(value, 2)},
                        100% calc(100% - ${stringDivider(value, 2)}),
                        calc(100% - ${value}) 100%,
                        ${value} 100%,
                        0% calc(100% - ${stringDivider(value, 2)}),
                        0% ${stringDivider(value, 2)}
                    )`,
                    }),
                    "clip-polygon-right": (value) => ({
                        "clip-path": `polygon(
                        ${value} 0%,
                        calc(100% - ${value}) 0%,
                        100% ${value},
                        100% calc(100% - ${value}),
                        calc(100% - ${value}) 100%,
                        ${value} 100%,
                        0% calc(100% - ${value}),
                        0% ${value}
                    )`,
                    }),
                },
                { values: theme("clipPolygonSliceSize") },
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "grid-repeat-auto-fit": (value) => ({
                        "grid-template-columns": `repeat(auto-fit, minmax(${value}, 1fr))`,
                    }),
                },
                { values: theme("gridRepeatAuto") },
            );
        }),
    ],
};

function stringDivider(stringNumerator, numericalDenominator) {
    // Divide number with measurement unit symbols
    const numeratorNumber = stringNumerator.match(/-?\d+\.?\d*/)[0];
    const numeratorUnit = stringNumerator.match(/[a-z%]*$/)[0];

    return numeratorNumber / numericalDenominator + numeratorUnit;
}
