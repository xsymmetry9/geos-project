import React from "react";
import Index from "./pages/Index";
import Layout from "./Layout";
import SPRForm from "./pages/SPRForm";
import Homepage from "./pages/Homepage";
import PrintPage from "./components/PrintSPR";
import LevelCheckForm from "./pages/LevelCheckForm";
import Admin from "./pages/Admin/AdminPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
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
  { path: "admin",
    element: <Admin />
  },
  {
    path: "admin/home",
    element: <Layout />,
    children: [
      {index: true, element: <AdminHomepage />}
    ]
  }
];

export default routes;
