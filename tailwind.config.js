module.exports = {
    content: ["./index.html", "./src/**/*.{js,css}"],
    theme: {
        extend: {
            colors: {
                'custom-yellow': '#FFD15B',
                'custom-gray': '#1B1B1B',
                'custom-gray-icon': '#7A7A7A',
                'light-gray': '#C6C6C6',
            },
            fontFamily: {
                'manrope': ['Manrope', 'sans-serif'],
                'anton': ['Anton', 'sans-serif']
            }
        }
    },
    plugins: [],
};