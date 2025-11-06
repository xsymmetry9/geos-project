import Language from "@/pages/Language";
import Layout from "@/Layout";
import SPRForm from "@/pages/SPRForm";
import Homepage from "@/pages/Homepage";
import PrintPage from "@/components/PrintSPR";
import AuthRedirect from "@/components/AuthRedirect";
import Levels from "@/pages/Levels";
import CreateLevelCheckForm from "./pages/LevelCheckPage/CreateLevelCheckForm";
import UpdatePage from "./pages/LevelCheckPage/UpdatePage";
import PreviewPage from "./pages/LevelCheckPage/PreviewPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AuthRedirect /> },
      { path: "language", element: <Language /> },
      { path: "home", element: <Homepage /> },
    ],
  },
  {
    path: "spr/",
    element: <Layout />,
    children: [
      { index: true, element: <SPRForm /> },
      { path: "print/:id", element: <PrintPage /> },
      { path: "view/:id", element: <PrintPage /> },
      { path: "edit/:id", element: <SPRForm /> },
    ],
  },
  {
    path: "levelCheck",
    element: <Layout />,
    children: [
      { index: true, element: <CreateLevelCheckForm /> },
      { path: "new", element: <CreateLevelCheckForm /> },
      { path: "edit/:id", element: <UpdatePage /> },
      { path: "preview/:id", element: <PreviewPage /> },
    ],
  },
  {
    path: "levels",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Levels />,
      },
    ],
  },
];

export default routes;
