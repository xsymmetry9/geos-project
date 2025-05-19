import React from "react";
import Index from "./pages/Index";
import {Layout, LayoutForNonmember} from "./Layout";
import SPRForm from "./pages/SPRForm";
import Homepage from "./pages/Homepage";
import PrintPage from "./components/PrintSPR";
import LevelCheckForm from "./pages/LevelCheckForm";
import Admin from "./pages/Admin/AdminPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import TeacherPage from "./pages/Admin/TeacherPage";
import {Login, CreateNewAccount, SignInLayout, Success, Failure} from "./pages/Nonmember/NonMember";

const routes = [
  {
    path: "/",
    element: <LayoutForNonmember />,
    children: [
      { index: true, element: <Index /> },
      { path: "home/:language", element: <Homepage /> },
      {
        path: "login", 
        element: <SignInLayout />,
        children: [
        { index: true, element: <Login />},
        { path: "/login/success", element: <Success type="login" /> },
        { path: "/login/failure", element: <Failure type="login" />}
        ]
      },
      {
        path: "createAccount",
        element: <SignInLayout />,
        children: [
          {index: true, element: <CreateNewAccount />},
          { path: "/createAccount/success", element: <Success type="createAccount"/> },
          { path: "/createAccount/failure", element: <Failure type="createAccount"/>}
        ] 
      }
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
      {index: true, element: <AdminHomepage />},
      {path: "teacherPage/:email", element: <TeacherPage />}
    ]
  },
];

export default routes;
