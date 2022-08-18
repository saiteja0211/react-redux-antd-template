import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProductList from "../components/ProductList";
import { undoReplaceSpaces } from "../utils/reusableFunctions";

const ProductsPage = ({ location }) => {
  const categories = useSelector((state) => state.AppReducer.fetchedCategories);

  let categoryId = location?.state?.categoryId;
  let categoryName = location?.state?.categoryName;
  const history = useNavigate();
  // logic to get the products though user directly hits /products/product-keyword
  if (history.location.pathname) {
    const preCategoryPathName = "/products/";
    const start = preCategoryPathName.length;
    const myCategoryName = undoReplaceSpaces(
      history.location.pathname.slice(start) || ""
    );
    if (myCategoryName) {
      const obj = categories.find(
        (each) => each.name.toLowerCase() === myCategoryName
      );
      categoryId = obj?.id;
      categoryName = obj?.name;
    }
  }

  return (
    <ProductList
      key={categoryId}
      breadCrumbItem={categoryName}
      categoryId={categoryId}
      categoryName={categoryName}
      endPoint="GetProductsByCategoryId"
      payload={{
        categoryId,
      }}
    />
  );
};

export default ProductsPage;
