import React from 'react';
import SPR_APP from "./SPR_App";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import Preview from "./pages/Preview";
import LevelCheck_App from "./LevelCheck_App";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children:[
            {index: true, element: <Homepage />},
            {path: "home/:language", element: <Homepage />},
        ]
    },
    {
        path:"spr/:language",
        element: <Layout />,
        children:[
            { index: true, element: <SPR_APP />},
            { path: "preview", element: <Preview />}
        ]
    },
    {
        path:"levelCheck/:language",
        element: <Layout />,
        children: [
            {index: true, element: <LevelCheck_App />}
        ]
    }
];

export default routes;