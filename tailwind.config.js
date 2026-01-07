/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                deep: {
                    900: '#121212',
                    800: '#1e1e1e',
                }
            }
        },
    },
    plugins: [],
}
