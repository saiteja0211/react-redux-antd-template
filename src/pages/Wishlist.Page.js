import React from "react";
import { useSelector } from "react-redux";

import ProductList from "../components/ProductList";

const WishlistPage = ({ location }) => {
  const individualId = useSelector((state) => state.AppReducer.individualId);

  return (
    <ProductList
      key="wishlist"
      type="wishlist"
      breadCrumbItem="Wishlist"
      endPoint="individuals/getWishlist"
      affiliateList={[]}
      payload={{
        listOfIds:
          JSON.parse(localStorage.getItem("boWIts" + individualId)) || [],
      }}
    />
  );
};

export default WishlistPage;
