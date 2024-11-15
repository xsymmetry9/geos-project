import {createRoot} from "react-dom/client"
import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";

const container = document.getElementById("root");
createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>
)