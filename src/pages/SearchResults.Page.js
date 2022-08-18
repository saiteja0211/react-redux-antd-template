import React from "react";
import { useLocation } from "react-router";
import ProductList from "../components/ProductList";

const SearchResultsPage = () => {
  const location = useLocation();
  const productName = location?.state?.productName;
  const affiliateDetails = location?.state?.affiliateDetails;
  console.log("SearchResultsPage", location, affiliateDetails);
  return (
    <ProductList
      key={productName}
      type="productsearch"
      breadCrumbItem={productName}
      endPoint="GetProductsByName"
      affiliateList={affiliateDetails || []}
      payload={{
        keyword: productName,
      }}
    />
  );
};

export default SearchResultsPage;
