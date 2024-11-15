import {createRoot} from "react-dom/client"
import "./styles/index.scss";
import App from "./App.jsx";
import { StrictMode } from "react";

import {
    createBrowserRouter, RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App DEFAULT_LANGUAGE = "English" />
    },
    {
        path:"/ch",
        element: <App DEFAULT_LANGUAGE = "Chinese" />
    },
    {
        path:"/jp",
        element: <App DEFAULT_LANGUAGE = "Japanese" />
    },
    {
        path: "/kor",
        element: <App DEFAULT_LANGUAGE = "Korean" />
    }
],
   );
const container = document.getElementById("app");
createRoot(container).render(
    <StrictMode>
        <RouterProvider router = {router} />
    </StrictMode>
)