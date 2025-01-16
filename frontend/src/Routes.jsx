import React from 'react';
import SPR_APP from "./SPR_App";
import Homepage from "./pages/Homepage";
import App from "./App";
import LevelCheck_App from "./LevelCheck_App";
import Create from "./pages/Create";
import Preview from "./pages/Preview";
const routes = [
    {
        path: "/",
        element: <App />,
        children:[
            {index: true, element: <Homepage />},
            {path: "home/:language", element: <Homepage />},
        ]
    },
    {
        path:"spr/:language",
        element: <App />,
        children:[
            { index: true, element: <SPR_APP />},
            { path: "create", element: <Create />},
            { path: "preview", element: <Preview />},
        ]
    },
    {
        path:"levelCheck/:language",
        element: <App />,
        children: [
            {index: true, element: <LevelCheck_App />}
        ]
    }
];

export default routes;