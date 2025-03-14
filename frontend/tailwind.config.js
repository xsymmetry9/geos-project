// @type {import('tailwindcss').Config}

export default {
    content: [
        "./index.html",
        ".src/**/*.{js, ts, jsx, tsx}",
    ],
    theme:{
        extend:{},
        colors: require("tailwindcss/colors")
        ,
    },
    corePlugins:{
        preflight: false,
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
