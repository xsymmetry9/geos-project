import {createRoot} from "react-dom/client"
import "./styles/index.scss";
import { StrictMode } from "react";
import routes from "./Routes";

import { createBrowserRouter, RouterProvider} from "react-router-dom";

const Routes = createBrowserRouter(routes, {
    future:{
        v7_fetcherPersist: true,
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
})


const container = document.getElementById("app");
createRoot(container).render(
    <StrictMode>
        <RouterProvider 
            router = {Routes}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }} />
    </StrictMode>
)