/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                theme: {
                    lightest: '#fcdcc6',
                    lighter: '#f8b6c4',
                    light: '#d35fed',
                    base: '#474747',
                    dark: '#363636',
                },
            },
        },
    },
    plugins: [],
}
