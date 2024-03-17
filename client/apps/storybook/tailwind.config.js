const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: createGlobPatternsForDependencies(__dirname),
    corePlugins: { preflight: false },
    theme: {
        extend: {
            fontFamily: ['Inter', 'sans-serif'],
        },
    },
    plugins: [],
};
