//Routes.tsx

import {Layout, ProfileLayout, LayoutForNonmember} from "./Layout";
import Language from "./pages/Language";
import {SPRForm, EditSPRForm} from "./pages/SPRForm";
import Homepage from "./pages/Homepage";
import PrintPage from "./components/PrintSPR";
import Admin from "./pages/Admin/AdminPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import TeacherPage from "./pages/Admin/TeacherPage";
import {Login, CreateNewAccount, SignInLayout, Success, Failure} from "./pages/Nonmember/NonMember.js";
import ProfilePage from "./pages/member/ProfilePage";
import {LevelCheckEdit, LevelCheckForm, LevelCheckPreview } from "./pages/LevelCheck";
import AuthRedirect from "./components/AuthRedirect";
import ForgotPassword from "./pages/Nonmember/ForgotPassword";
import {StudentPage, CreateStudent, EditStudent} from "./pages/member/StudentPage";
import SettingPage from "./pages/member/SettingPage";

import type {RouteObject} from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutForNonmember />,
    children: [
      { index: true, element: <AuthRedirect /> },
      { path: "home/:language", element: <Homepage /> },
      {
        path: "login", 
        element: <SignInLayout />,
        children: [
        { index: true, element: <Login />},
        { path: "success", element: <Success  /> },
        { path: "failure", element: <Failure  />}
        ]
      },
      {
        path: "createAccount",
        element: <SignInLayout />,
        children: [
          {index: true, element: <CreateNewAccount />},
          { path: "success", element: <Success /> },
          { path: "failure", element: <Failure />}
        ], 
      },
      {
        path: "forgotPassword",
        element: <SignInLayout />,
        children: [
          {index: true, element: <ForgotPassword />}
        ],
      },
    ],
  },
  {
    path: "profile",
    element: <ProfileLayout />,
    children: [
      {index: true, element: <ProfilePage />},
      {path: "createStudent", element: <CreateStudent />},
      {path: "viewStudent/:id", element: <StudentPage />},
      {path: "viewStudents", element: <ProfilePage />},
      {path: "editStudent/:id", element: <EditStudent />},
      {path: "setting", element: <SettingPage />}
    ]
  },
  {
    path: "spr/:studentId",
    element: <Layout />,
    children: [
      { index: true, element: <Language /> },
      { path: ":language/create", element: <SPRForm />},
      { path: "print/:formId", element: <PrintPage /> },
      { path: "edit/:formId", element: <EditSPRForm /> },
    ],
  },
  {
    path: "levelCheck/:studentId",
    element: <Layout />,
    children: [{ index: true, element: <LevelCheckForm /> },
      {path: "edit/:formId", element: <LevelCheckEdit />},
      {path: "preview/:formId", element: <LevelCheckPreview />}
    ],
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
