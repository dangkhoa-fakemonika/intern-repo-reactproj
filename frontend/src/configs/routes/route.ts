import {
  createBrowserRouter, redirect
} from "react-router";

import {CommonLayout} from "@/configs/layouts/CommonLayout.tsx";
import {Home, SearchAndFilter, LoginPage, RegisterPage, UserPage, ShoppingCart} from "@/features/index.tsx";
import {SingleProduct} from "@/features/SingleProduct/SingleProduct.tsx";
import {InvalidRoute} from "@/components/ui/InvalidRoute.tsx";
import {store} from "@/shared/stores/store.ts";
import {waitForRehydration} from "@/shared/helpers/wait-for-rehydration.ts";
import { AdminLayout } from "@/configs/layouts/AdminLayout";
import { AnalyticsPage, DashBoardPage, ManageOrder, ManageProducts, ManageUsers, ReportsPage, SettingAdminPage } from "@/features/AdminPage";

const authLoader = async () => {
  await waitForRehydration();
  const userState = store.getState().user;
  if (userState.access_token !== undefined) {
    return redirect("/");
  }
  else return null;
}

const nonAuthLoader = async () => {
  await waitForRehydration();
  const userState = store.getState().user;
  if (userState.access_token === undefined) return redirect("/auth/login");
  else return null;
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

      {
        path: "auth",
        loader: authLoader,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },
      {
        path: "userpage",
        Component: UserPage,
        loader: nonAuthLoader
      },
      

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
        path : "shopping-cart",
        loader : nonAuthLoader,
        Component: ShoppingCart
      },
      
      {
        path: "*",
        Component: InvalidRoute
      }
    ]
  },
     {
    path: '/admin',
    Component: AdminLayout,
    loader: nonAuthLoader,
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