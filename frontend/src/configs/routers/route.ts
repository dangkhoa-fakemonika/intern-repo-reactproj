import {
  createBrowserRouter
} from "react-router";

import {CommonLayout} from "@/configs/layouts/CommonLayout.tsx";
import {
  Home,
  SearchAndFilter,
  SingleProduct,
  ShoppingCart
} from "@/features/index.tsx";

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
        // Component: AuthLayout,
        // children: [
        //   { path: "login", Component: Login },
        //   { path: "register", Component: Register },
        // ],
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
            path: ":id",
            Component: SingleProduct
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
        path: "shopping-cart",
        Component: ShoppingCart
      },
      {
        path: "*",
        Component: Home
      }
    ]
  }
]);

export default router;
