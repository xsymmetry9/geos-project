//Routes.tsx

import {Layout, ProfileLayout, LayoutForNonmember} from "./Layout";
import Language from "./pages/Language";
import {SPRForm, EditSPRForm} from "./pages/SPRForm";
import PrintPage from "./components/PrintSPR";
import {AdminLogin} from "./pages/Admin/AdminLogin";
import  { AdminLayout, AdminHomepage } from "./pages/Admin/AdminPage";
import TeacherPage from "./pages/Admin/TeacherPage";
import {Login, CreateNewAccount, SignInLayout, Success, Failure} from "./pages/Nonmember/NonMember.js";
import ProfilePage from "./pages/member/ProfilePage";
import {LevelCheckEdit, LevelCheckForm, LevelCheckPreview } from "./pages/LevelCheck";
import AuthRedirect from "./components/AuthRedirect";
import ForgotPassword from "./pages/Nonmember/ForgotPassword";
import {StudentPage, CreateStudent, EditStudent} from "./pages/member/StudentPage";
import SettingPage from "./pages/member/SettingPage";
import AdminAuthenticate from "./pages/Admin/AdminAuthenticate";

import type {RouteObject} from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutForNonmember />,
    children: [
      { index: true, element: <AuthRedirect /> },
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
  { path: "admin/login",
    element: <AdminLogin />
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {index: true, element: <AdminAuthenticate />},
      {path: "home", element: <AdminHomepage />},
      {path: "teacherPage/:email", element: <TeacherPage />}
    ]
  },
];

export default routes;
