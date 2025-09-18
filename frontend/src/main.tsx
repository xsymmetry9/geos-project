import { createRoot } from "react-dom/client";
import { UserProvider } from "@/context/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes";

const router = createBrowserRouter(routes,
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
)
const container = document.getElementById("app");
if (!container) throw new Error("No element with ID 'app' found");
createRoot(container).render(
  // <StrictMode>
  <UserProvider>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </UserProvider>

  // </StrictMode>,
);