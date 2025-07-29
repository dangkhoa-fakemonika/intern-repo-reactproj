import {
  createBrowserRouter, redirect
} from "react-router";

import {CommonLayout} from "@/configs/layouts/CommonLayout.tsx";
import {
  Home,
  SearchAndFilter,
  LoginPage,
  RegisterPage,
  UserPage,
  ShoppingCart
} from "@/features/index.tsx";
import {SingleProduct} from "@/features/SingleProduct/SingleProduct.tsx";
import {InvalidRoute} from "@/components/ui/InvalidRoute.tsx";
import {waitForRehydration} from "@/shared/helpers/wait-for-rehydration.ts";
import { AdminLayout } from "@/configs/layouts/AdminLayout";
import { AnalyticsPage, DashBoardPage, ManageOrder, ManageProducts, ManageUsers, ReportsPage, SettingAdminPage } from "@/features/AdminPage";
import {Users} from "@/shared/services/services.ts";

const authLoader = async () => {
  await waitForRehydration();
  try {
    const response = await Users.getProfile();
    return response ? redirect("/") : null;
  } catch {
    return null;
  }

}

const nonAuthLoader = async () => {
  await waitForRehydration();
  try {
    const response = await Users.getProfile();
    return response ? null : redirect("/auth/login");
  } catch {
    return redirect("/auth/login");
  }
}

const authAdminLoader = async () => {
  await waitForRehydration();
  try {
    const response = await Users.getProfile();
    return response ? response.role === "admin" ? null : redirect("/") : redirect("/auth/login");
  } catch {
    return redirect("/auth/login");
  }
}

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
        loader: authLoader,
        children: [
          {path: "login", Component: LoginPage},
          {path: "register", Component: RegisterPage},
          {path: "userpage", Component: UserPage}
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
            path: "category/:category_slug",
            Component: SearchAndFilter,
          },
          {
            path: "title/:title",
            Component: SearchAndFilter
          },
          {
            path: ":id",
            Component: SingleProduct
          }
        ]
      },
      {
        path: "shopping-cart",
        loader: nonAuthLoader,
        Component: ShoppingCart
      },

      {
        path: "*",
        Component: InvalidRoute
      }
    ]
  },
     {
    path: 'admin',
    Component: AdminLayout,
    loader: authAdminLoader,
    children: [
      { index: true, Component: DashBoardPage },
      { path: 'dashboard', Component: DashBoardPage },
      { path: 'analytics', Component: AnalyticsPage },
      { path: 'reports', Component: ReportsPage },
      { path: 'manageProducts', Component: ManageProducts },
      { path: 'manageUsers', Component: ManageUsers },
      { path: 'manageOrders', Component: ManageOrder },
      { path: 'settings', Component: SettingAdminPage}
    ],
  },
]);

export default router;