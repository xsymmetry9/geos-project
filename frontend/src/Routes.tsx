import Language from "@/pages/Language";
import Layout from "@/Layout";
import SPRForm from "@/pages/SPRForm";
import Homepage from "@/pages/Homepage";
import PrintPage from "@/components/PrintSPR";
import {LevelCheckEdit, LevelCheckForm, LevelCheckPreview } from "./pages/LevelCheck";
import AuthRedirect from "@/components/AuthRedirect";
import Levels from "@/pages/Levels";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AuthRedirect /> },
      { path: "language", element: <Language />},
      { path: "home", element: <Homepage /> },
    ],
  },
  {
    path: "spr/",
    element: <Layout />,
    children: [
      { index: true, element: <SPRForm /> },
      { path: "print/:id", element: <PrintPage /> },
      { path: "edit/:id", element: <SPRForm /> },
    ],
  },
  {
    path: "levelCheck",
    element: <Layout />,
    children: [{ index: true, element: <LevelCheckForm /> },
      {path: "edit/:id", element: <LevelCheckEdit />},
      {path: "preview/:id", element: <LevelCheckPreview />}
    ],
  },
  {
    path: "levels",
    element: <Layout />,
    children: [{
      index: true, element: <Levels />
    }]
  }
];

export default routes;
