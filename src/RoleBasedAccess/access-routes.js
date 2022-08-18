import roles from "../RoleBasedAccess/roles";

// Components

import { lazy } from "react";
import WishlistPage from "../pages/Wishlist.Page";
// TODO:
/*
 * 1. Make title optional
 * 2. Make title multi type support ie: (string, node, react element)
 * */

const ProductsPage = lazy(() => import("../pages/Products.Page"));
const SearchResultsPage = lazy(() => import("../pages/SearchResults.Page"));
const ProfilePage = lazy(() => import("../pages/Profile.Page"));
const AffiliateForm = lazy(() => import("../components/forms/AffiliateForm"));
// const WishlistPage = lazy(() => import("../pages/Wishlist.Page"));
const UserDashboard = lazy(() => import("../components/UserDashboard"));

const accessRoutes = [
  {
    component: ProductsPage,
    path: "/products",
    title: "Products",
  },
  {
    component: SearchResultsPage,
    path: "/search",
    title: "Search",
  },
  {
    component: AffiliateForm,
    path: "/affiliate-signup-form",
    title: "Affiliate Signup Form",
  },
  {
    component: ProfilePage,
    path: "/myprofile",
    title: "MyProfile",
    permission: [roles.ADMIN, roles.INFLUENCER, roles.INDIVIDUAL],
    subComponents: [
      {
        component: UserDashboard,
        title: "Dashboard",
        permission: [roles.ADMIN, roles.INFLUENCER],
      },
    ],
  },
  {
    component: WishlistPage,
    path: "/wishlist",
    title: "Wishlist",
    permission: [roles.ADMIN, roles.INFLUENCER, roles.INDIVIDUAL],
  },
];

export default accessRoutes;
