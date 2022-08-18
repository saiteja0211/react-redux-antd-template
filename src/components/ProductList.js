import {
  FilterTwoTone,
  PlusCircleTwoTone,
  ShoppingCartOutlined,
  CheckCircleFilled,
  HeartFilled,
  HeartTwoTone,
  ShareAltOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  Row,
  Tag,
  Select,
  Image,
  Divider,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "throttle-debounce";
import Cookies from "js-cookie";

import ProductShare from "../components/ProductShare";
import AddKeywordsModal from "../components/modalbox/AddKeywords";
import { productsLimit } from "../constants";
import {
  clearBreadCrumbs,
  updateBreadCrumbs,
  updateGlobalModal,
  updateShowLoginModal,
} from "../redux/actions/ActionCreators";
import useAxios from "../utils/useAxios";
import { filterList } from "../utils/reusableFunctions";

const { Option } = Select;

const ProductList = ({
  location,
  breadCrumbItem,
  endPoint,
  payload,
  categoryId,
  categoryName,
  productName,
  affiliateList,
  type,
}) => {
  const isProductSearch = type === "productsearch";
  const limit = productsLimit;
  const dispatch = useDispatch();
  const {
    isSpinning,
    countryCode,
    countryCurrencySymbol,
    isLoggedIn,
    individualId,
  } = useSelector((state) => state.AppReducer);

  const { axiosPost } = useAxios();
  const [products, setProducts] = useState();
  const [cachedProducts, setCachedProducts] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [hideLoadMore, setHideLoadMore] = useState(true);
  const [endOfList, setEndOfList] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [inactiveImages, setInactiveImages] = useState([]);

  useEffect(() => {
    dispatch(updateBreadCrumbs([breadCrumbItem]));
    getProducts();
    window.scrollTo({ top: 0 });
    setWishlistedItems(
      JSON.parse(localStorage.getItem("boWIts" + individualId)) || []
    );

    return () => {
      dispatch(clearBreadCrumbs());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const deleteFromWishlist = (productId) => {
    if (!isLoggedIn) {
      dispatch(
        updateShowLoginModal({
          showLoginModal: true,
          formAlertMessage: "Please login for wishlisting a product",
        })
      );

      return;
    }

    const index = wishlistedItems.indexOf(productId);
    let newItems;
    if (index > -1) {
      // removing from wishlist
      newItems = [
        ...wishlistedItems.slice(0, index),
        ...wishlistedItems.slice(index + 1),
      ];
      setWishlistedItems(newItems);
      localStorage.setItem("boWIts" + individualId, JSON.stringify(newItems));

      const filteredPrds = products.filter((each) => each._id !== productId);
      setProducts(filteredPrds);
    }

    try {
      axiosPost({
        url: "individuals/deleteFromWishlist",
        data: { individualId, productId },
      });
    } catch (e) {
      console.log("Unable update inactive images: ", e);
    }
  };

  const addToWishlist = (productId) => {
    if (!isLoggedIn) {
      dispatch(
        updateShowLoginModal({
          showLoginModal: true,
          formAlertMessage: "Please login for wishlisting a product",
        })
      );

      return;
    }
    const index = wishlistedItems.indexOf(productId);
    let newItems;
    if (index > -1) {
      return;
    } else {
      // adding to wishlist
      newItems = [...wishlistedItems, productId];
    }
    setWishlistedItems(newItems);
    localStorage.setItem("boWIts" + individualId, JSON.stringify(newItems));

    try {
      axiosPost({
        url: "individuals/addToWishlist",
        data: { individualId, productId },
      });
    } catch (e) {
      console.log("Unable update inactive images: ", e);
    }
  };

  const updateInactiveImages = debounce(5000, () => {
    try {
      if (!inactiveImages.length) {
        return;
      }
      axiosPost({
        url: "updateInactiveImages",
        data: { listOfIds: inactiveImages },
      });
    } catch (e) {
      console.log("Unable update inactive images: ", e);
    }
    console.log("XXX updateInactiveImages", inactiveImages);
  });

  const getProducts = async () => {
    try {
      const { data } = await axiosPost({
        url: endPoint,
        data: {
          ...payload,
          limit,
          pageNum,
          countryCode,
          userName: Cookies.get("userName"),
        },
      });
      setPageNum(pageNum + 1);
      let prdts =
        cachedProducts && Array.isArray(cachedProducts)
          ? [...cachedProducts, ...data]
          : data;

      // calculating and creating discount:value in each product
      prdts.forEach(
        (eachProduct) =>
          (eachProduct["discount"] = calculateDiscount(
            eachProduct.strikePrice,
            eachProduct.price
          ))
      );
      setCachedProducts(prdts);
      setProducts(prdts);

      if (data?.length === 0 || data.length < limit) {
        setHideLoadMore(true);
        setEndOfList(true);
      } else {
        setHideLoadMore(false);
      }

      if (type === "wishlist") {
        let ids = prdts.map((each) => each._id);
        setWishlistedItems(ids);
        localStorage.setItem("boWIts" + individualId, JSON.stringify(ids));
      }
    } catch (err) {
      console.log("Error while getting products:", err);
    }
  };

  const calculateDiscount = (listingPrice, sellingPrice) => {
    let listPrice = escapeNonDigits(listingPrice);
    let sellPrice = escapeNonDigits(sellingPrice);
    if (!listPrice || !sellPrice || listPrice - sellPrice < 0) return 0;
    let discount = ((listPrice - sellPrice) * 100) / listPrice;
    discount = parseInt(discount.toFixed());
    if (discount) {
      return discount;
    }
  };

  const escapeNonDigits = (price) => {
    return parseFloat(
      (price + "").replace(/[\D`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g, "")
    );
  };

  const filterProducts = debounce(500, (product) => {
    if (product === "") {
      setProducts(cachedProducts);
      return;
    }
    const lookupName = "name";
    const newList = filterList(cachedProducts, lookupName, product);
    setProducts(newList);
  });

  const getAffliateName = (link) => {
    if (link.startsWith("www")) {
      link = "https://" + link;
    }
    if (link.startsWith("http")) {
      let url = new URL(link);
      let urlSplit = url?.hostname?.split(".");
      let affName = Array.isArray(urlSplit) && urlSplit[1];
      return affName.charAt(0).toUpperCase() + affName.slice(1);
    }
  };
  const getAffliateColor = (affName) => {
    let affColor;

    switch (affName?.toLowerCase()) {
      case "flipkart":
        affColor = "geekblue";
        break;
      case "amazon":
        affColor = "gold";
        break;
      case "snapdeal":
        affColor = "volcano";
        break;
      case "myntra":
        affColor = "purple";
        break;

      default:
        affColor = "cyan";
        break;
    }
    return (
      <Tag color={affColor}>
        {affName} <ShoppingCartOutlined style={{ fontSize: "0.9rem" }} />
      </Tag>
    );
  };

  const onSortProducts = (value) => {
    let sortedList = [...products];
    switch (value) {
      case "discountAscending":
        sortedList.sort((a, b) => b.discount - a.discount);
        break;
      case "discountDescending":
        sortedList.sort((a, b) => a.discount - b.discount);
        break;
      case "costAscending":
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case "costDescending":
        sortedList.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedList = cachedProducts;
        break;
    }
    setProducts(sortedList);
  };

  const openProduct = async (product, isOurAffProduct) => {
    let url, referal, influencerTag;
    if (isOurAffProduct) {
      url = product.link;
      // TODO influencerTag
      influencerTag = "shankar21";
    } else {
      url = product.searchUrl;
      referal = "shankar21";
    }

    try {
      let { data: redirectURL } = await axiosPost({
        url: "productredirect",
        data: {
          url,
          referal,
          influencerTag,
          individualId: 43, //TODO hardcoded
          keyword: breadCrumbItem,
        },
      });
      window.open(redirectURL, "_blank")?.focus();
    } catch (err) {
      console.log("Error While redirecting product", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }} onLoad={updateInactiveImages}>
      {(products?.length !== 0 || cachedProducts?.length !== 0) && (
        <Row
          style={{
            padding: "0px 7px 20px 0px",
            textAlign: "start",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
          gutter={[25, 10]}
        >
          <Col xs={0} sm={0} md={8} lg={8} xl={12} xxl={2}></Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
            <Select
              optionFilterProp="children"
              onChange={onSortProducts}
              dropdownMatchSelectWidth
              style={{ width: "100%" }}
              size="small"
              defaultValue="popularity"
              menuItemSelectedIcon={<CheckCircleFilled />}
            >
              <Option value="popularity">
                <span style={{ opacity: 0.7 }}>Sort by: Popularity</span>
              </Option>
              <Option value="discountAscending">Discount (High to Low)</Option>
              <Option value="discountDescending">Discount (Low to High)</Option>
              <Option value="costAscending">Cost (Low to High)</Option>
              <Option value="costDescending">Cost (High to Low)</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
            <Input
              size="small"
              key={!!isSpinning}
              placeholder="Filter Product name"
              suffix={<FilterTwoTone alt="filter-icon" />}
              onChange={(e) => filterProducts(e.target.value)}
            />
          </Col>
        </Row>
      )}
      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>
        {products &&
          products.length > 0 &&
          products.map((product, index) => {
            let affliateName = getAffliateName(product.link);
            return (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={6}
                key={product._id}
                id={product.link}
                _id={product._id}
              >
                <Card
                  hoverable
                  bodyStyle={{
                    textAlign: "start",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                  style={{
                    borderRadius: "0px 9px",

                    transitionDuration: "0.25s, 0.25s",
                  }}
                  className="product_Card"
                >
                  <div className="heart">
                    {wishlistedItems.includes(product._id) ? (
                      <Tooltip
                        title="Remove from Wishlist"
                        placement="topLeft"
                        arrowPointAtCenter
                        overlayInnerStyle={{ fontSize: 12, padding: "4px" }}
                        onClick={() => deleteFromWishlist(product._id)}
                      >
                        <HeartFilled
                          style={{ fontSize: 16, color: "#ff4343" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Add to Wishlist"
                        placement="topLeft"
                        arrowPointAtCenter
                        overlayInnerStyle={{ fontSize: 12, padding: "4px" }}
                        onClick={() => addToWishlist(product._id)}
                      >
                        <HeartTwoTone style={{ fontSize: 16, color: "red" }} />
                      </Tooltip>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <div className="ribbon">
                      <div className="label">{product.discount}% off</div>
                    </div>
                  )}

                  <Tooltip
                    title="Click to open the product"
                    placement="top"
                    arrowPointAtCenter
                    overlayInnerStyle={{ fontSize: 12, padding: "4px" }}
                    mouseEnterDelay={1}
                    onClick={() => openProduct(product, true)}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={product.externalImage}
                        onError={() => {
                          setInactiveImages([...inactiveImages, product._id]);
                        }}
                        fallback={
                          require(`../assets/categories-images/photo-not-found.svg`)
                            .default
                        }
                        style={{ maxWidth: 150, maxHeight: 150 }}
                        alt=""
                        preview={false}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 500,
                          fontSize: "0.8rem",
                          maxHeight: "20%",
                          maxWidth: "100%",
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={product.name}
                      >
                        {product.name}
                      </div>
                      <div
                        style={{
                          fontWeight: 500,

                          height: "10%",
                          marginBottom: 10,
                        }}
                      >
                        {product.price ? (
                          <span style={{ fontSize: "0.9rem" }}>{`${
                            countryCurrencySymbol || ""
                          } ${product.price}`}</span>
                        ) : (
                          <span>click for price</span>
                        )}
                        <span
                          style={{
                            fontSize: "0.8rem",
                            paddingLeft: 10,
                            color: "grey",
                          }}
                        >
                          {product.price && product.strikePrice && (
                            <del>
                              {`${countryCurrencySymbol || ""} ${
                                product.strikePrice
                              }`}
                            </del>
                          )}
                        </span>
                      </div>
                    </div>
                  </Tooltip>
                  {affliateName && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {getAffliateColor(affliateName)}
                      <Tooltip
                        title="Share Product"
                        placement="bottomRight"
                        arrowPointAtCenter
                        overlayInnerStyle={{
                          fontSize: 12,
                          minHeight: 12,
                          padding: 1,
                        }}
                      >
                        <Button
                          shape="circle"
                          type="primary"
                          size="small"
                          onClick={() =>
                            dispatch(
                              updateGlobalModal({
                                globalModalVisibility: true,
                                globalModalTitle: "Share",
                                globalModalFooter: "",
                                globalModalContent: <ProductShare />,
                              })
                            )
                          }
                        >
                          <ShareAltOutlined style={{ fontSize: 15 }} />
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </Card>
              </Col>
            );
          })}
      </Row>

      {!Array.isArray(products) ||
        (products.length === 0 && !affiliateList?.length && (
          <div>
            <Empty
              style={{ marginBottom: 40 }}
              description="No products available"
            />
            <div>
              <p>
                Did not find the product you are looking for? Please let us
                know.
              </p>
              <p>
                Click{" "}
                <Button
                  size="small"
                  type="primary"
                  onClick={() => setModalVisibility(true)}
                >
                  here
                </Button>{" "}
                to add product to category.
              </p>
            </div>
          </div>
        ))}

      {endOfList && hideLoadMore
        ? products?.length !== 0 &&
          !isProductSearch && (
            <div style={{ marginBottom: 40 }}>
              <h4 style={{ marginBottom: 20 }}>
                <Divider>You have reached end of the list !</Divider>
              </h4>
              <div>
                <p>
                  Did not find the product you are looking for? Please let us
                  know.
                </p>
                <p>
                  {`Click `}
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => setModalVisibility(true)}
                  >
                    {`here `}
                  </Button>
                  to add product to category.
                </p>
              </div>
            </div>
          )
        : !isSpinning && (
            <Button
              type="primary"
              size="small"
              onClick={getProducts}
              style={{ margin: "20px 0px 50px 0px" }}
            >
              Load More <PlusCircleTwoTone />
            </Button>
          )}
      {modalVisibility && (
        <AddKeywordsModal
          visible={modalVisibility}
          cancel={setModalVisibility}
          categoryId={categoryId}
          categoryName={categoryName}
          countryCode={countryCode}
        />
      )}

      {endOfList && hideLoadMore && isProductSearch && (
        <div>
          {Array.isArray(products) && products.length > 0 && (
            <Divider>You have reached end of the list !</Divider>
          )}
          {affiliateList.length !== 0 && !isSpinning && (
            <>
              <h4> "{breadCrumbItem}" might be available in below sites</h4>
              {affiliateList.map((product) => (
                <Button
                  key={product.affiliateName}
                  style={{ margin: "10px 10px 20px 10px" }}
                  size="small"
                  type="primary"
                  onClick={() => openProduct(product)}
                >
                  {product.affiliateName}
                </Button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
