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
    future: {
        unstable_tailwind_color_format: 'rgb', 
    },
    corePlugins:{
        preflight: false,
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
