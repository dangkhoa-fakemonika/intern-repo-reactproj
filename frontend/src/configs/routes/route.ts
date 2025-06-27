import {
  createBrowserRouter
} from "react-router";

import {CommonLayout} from "@/configs/layouts/CommonLayout.tsx";
import {Home, SearchAndFilter, LoginPage, RegisterPage  } from "@/features/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      // Authentication path
      {
        path: "auth",
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },
      // Product Browsing Path
      {
        path: "products",
        children: [
          {
            index: true,
            Component: SearchAndFilter,
          },
          {
            path: "category/:category_id",
            Component: SearchAndFilter,
          },
          {
            path: "title/:title",
            Component: SearchAndFilter
          }
        ]
      },
      {
        path: "*",
        Component: Home
      }
    ]
  }
]);

export default router;