// @type {import('tailwindcss').Config}

export default {
    content: [
        "./index.html",
        ".src/**/*.{js, ts, jsx, tsx}",
    ],
    theme:{
        extend:{
            colors: {
                "custom-aqua": rgba(0, 161, 173, 1),
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
