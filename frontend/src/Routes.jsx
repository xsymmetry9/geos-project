import React from 'react';
import Index from "./pages/Index";
import Layout from "./Layout";
import LevelCheck_App from "./LevelCheck_App";
import SPRForm from "./pages/SPRForm";
import Preview from "./pages/Preview";
import Homepage from './pages/Homepage';
import SPRContent from "./components/SPRContent";
import { elements } from 'chart.js';

const routes = [
    {
        path: "/",
        element: <Layout />,
        children:[
            {index: true, element: <Index />},
            {path: "home/:language", element: <Homepage />},
        ]
    },
    {
        path:"spr/:language",
        element: <Layout />,
        children:[
            { index: true, element: <SPRForm />},
            { path: "preview", element: <Preview />},
            { path: "print/:id", element: <SPRContent />}
        ]
    },
    {
        path:"levelCheck/:language",
        element: <Layout />,
        children: [
            {index: true, element: <LevelCheck_App />}
        ]
    },
    {
        path:"spr/print/:id",
        element: <SPRContent />
    }
];

export default routes;