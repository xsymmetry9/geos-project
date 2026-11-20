import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Homepage from "@/pages/Homepage";

function AuthRedirect() {
  const { user, isHydrated } = useUser();

  if (!isHydrated) return <div>Loading ...</div>;

  if (!user?.language) return <Navigate to="/language" replace />;

  return <Homepage />;
}

/** Old bookmarks to /home land on / and keep ?view=. */
export function LegacyHomeRedirect() {
  const { search } = useLocation();
  return <Navigate to={{ pathname: "/", search }} replace />;
}

export default AuthRedirect;
