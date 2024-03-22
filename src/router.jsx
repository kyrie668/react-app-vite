import React, { lazy, Suspense } from "react";
// Navigate重定向组件
import { Navigate } from "react-router-dom";

const ItemBankPage = lazy(() => import("./pages/ItemBank"));
const DiscussPage = lazy(() => import("./pages/Discuss"));
const LoginPage = lazy(() => import("./pages/Login"));
const RacePage = lazy(() => import("./pages/Race"));
const RegisterPage = lazy(() => import("./pages/Register"));
const ShopPage = lazy(() => import("./pages/Shop"));
const StudyPage = lazy(() => import("./pages/Study"));
const WorkPage = lazy(() => import("./pages/Work"));


const routes = [
  {
    path: "/",
    element: <Navigate to="/ItemBank" />,
  },
  {
    path: "/ItemBank",
    element: (
      <Suspense fallback={<></>}>
        <ItemBankPage />
      </Suspense>
    ),
  },
  {
    path: "/Discuss",
    element: (
      <Suspense fallback={<></>}>
        <DiscussPage />
      </Suspense>
    ),
  },
  {
    path: "/Login",
    element: (
      <Suspense fallback={<></>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/Race",
    element: (
      <Suspense fallback={<></>}>
        <RacePage />
      </Suspense>
    ),
  },
  {
    path: "/Register",
    element: (
      <Suspense fallback={<></>}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/Shop",
    element: (
      <Suspense fallback={<></>}>
        <ShopPage />
      </Suspense>
    ),
  },
  {
    path: "/Study",
    element: (
      <Suspense fallback={<></>}>
        <StudyPage />
      </Suspense>
    ),
  },
  {
    path: "/Work",
    element: (
      <Suspense fallback={<></>}>
        <WorkPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/ItemBank" />,
  },
];
export default routes;
