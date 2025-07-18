import Language from "./pages/Language";
import Layout from "./Layout";
import SPRForm from "./pages/SPRForm";
import Homepage from "./pages/Homepage";
import PrintPage from "./components/PrintSPR";
import {LevelCheckForm, LevelCheckPreview } from "./pages/LevelCheck";
import Test from "./pages/Test";
import AuthRedirect from "./components/AuthRedirect";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AuthRedirect /> },
      { path: "language", element: <Language />},
      { path: "home/:language", element: <Homepage /> },
    ],
  },
  {
    path: "spr/:language",
    element: <Layout />,
    children: [
      { index: true, element: <SPRForm /> },
      { path: "print/:id", element: <PrintPage /> },
      { path: "edit/:id", element: <SPRForm /> },
    ],
  },
  {
    path: "levelCheck/:language",
    element: <Layout />,
    children: [{ index: true, element: <LevelCheckForm /> },
      {path: "preview/:id", element: <LevelCheckPreview />}
    ],
  },
  {
    path: "test",
    element: <Test />,
  },
];

export default routes;
