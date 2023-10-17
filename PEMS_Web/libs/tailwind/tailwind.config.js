const {createGlobPatternsForDependencies} = require('@nx/angular/tailwind');
const {join} = require('path');
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
    theme: {
        colors: {
            primary: {
                light: '#5eead4',
                DEFAULT: '#14b8a6',
                dark: '#0f766e',
            },
            secondary: {
                light: '#bae6fd',
                DEFAULT: '#0ea5e9',
                dark: '#0369a1',
            },
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,
            blue: colors.blue,
        },
        spacing: {
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
        },
        fontSize: {}
    },
    plugins: []
};
