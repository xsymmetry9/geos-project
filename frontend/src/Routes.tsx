import Index from "./pages/Index";
import Layout from "./Layout";
import SPRForm from "./pages/SPRForm";
import Homepage from "./pages/Homepage";
import PrintPage from "./components/PrintSPR";
import LevelCheckForm from "./pages/LevelCheckForm";
import Test from "./pages/Test";
import AuthRedirect from "./components/AuthRedirect";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AuthRedirect /> },
      { path: "language", element: <Index />},
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
    children: [{ index: true, element: <LevelCheckForm /> }],
  },
  {
    path: "test",
    element: <Test />,
  },
];

export default routes;
