import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes";

const Routes = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const container = document.getElementById("app");
createRoot(container).render(
  <StrictMode>
    <RouterProvider
      router={Routes}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  </StrictMode>,
);
