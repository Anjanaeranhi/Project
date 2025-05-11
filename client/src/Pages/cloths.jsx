import React, { Fragment, useEffect, useState } from "react";
import { FaPaintBrush, FaShoppingCart, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import {  userapi } from "../axios";
import { useNavigate } from "react-router";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

const Cloths = ({ cartitems, setCartItems }) => {
  const [wishItems, setWishItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState([]);
  const [products, setProduct] = useState([]);

  const navigate = useNavigate();
  const goToCart = () => navigate("/cart");
  const goToWishlist = () => navigate("/wishlist");
  const goToHistory = () => navigate("/history");
  const goToProfile = () => navigate("/userprofile");
  const goToLogin = () => {
    localStorage.removeItem("userToken");
    navigate("/hero");
  }

  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("_id")

  const setRed = async ({ userId, product }) => {
    try {
      const response = await userapi.post("/wishlist", { userId, product });
      toast.success(response.data.message);
      const res = await userapi.get(`/wishlist/${userId}`);
      setWishItems(res?.data);
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await userapi.get(`/cart/${userId}`);
        setCartItems(res.data);
        setSearchItem(res.data);
      } catch (err) {
        console.log("Error fetching cart on mount", err);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, []);

  useEffect(() => {
    const fetchwishlist = async () => {
      try {
        const { data } = await userapi.get(`/wishlist/${userId}`);
        setWishItems(data);
      } catch (error) {
        toast.error("Failed to load wishlist");
      }
    };
    fetchwishlist();
  }, [userId]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchItem(searchResults);
  };

  const AddProduct = async ({ userId, product }) => {
    try {
      if (!userId) {
        toast.error("user Id not found");
        return;
      }
      const { data } = await userapi.post("/cart", { product, userId });
      toast.success(data.message);
      const res = await userapi.get(`/cart/${userId}`);
      setCartItems(res.data);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleQty = async (userId, product, type) => {
    try {
      const { _id, qty } = product;
      const updatedQty = type === "inc" ? qty + 1 : qty > 1 ? qty - 1 : 1;

      const { data } = await userapi.put("/cart/update", {
        userId,
        product: { _id, qty: updatedQty },
        type,
      });

      const res = await userapi.get(`/cart/${userId}`);
      setCartItems(res?.data);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const removeWishlist = async ({ userId, productId }) => {
    try {
      const { data } = await userapi.delete(`/wishlist/${userId}/${productId}`);
      toast.success(data.message);
      const res = await userapi.get(`/wishlist/${userId}`);
      setWishItems(res?.data);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await userapi.get("/products");
        setProduct(data.product);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  return (
    <Fragment>
      {/* Header Section */}
      <div
        className="container p-3 shadow-sm bg-white rounded"
        style={{ marginBottom: "40px", marginTop: "20px" }}
      >
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center shadow"
              style={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                background: "#fff",
              }}
            >
              <FaPaintBrush style={{ height: "25px", width: "25px", color: "#6554af" }} />
            </div>
            <h2
              className="ms-3"
              style={{
                background: "linear-gradient(to right, #6554af, #ff7eb3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              Galeria
            </h2>
          </div>

          {/* Search Bar */}
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search here..."
              onChange={handleSearch}
              className="form-control shadow-sm"
              style={{
                borderRadius: "20px",
                width: "220px",
                transition: "width 0.3s ease-in-out",
              }}
              onFocus={(e) => (e.target.style.width = "270px")}
              onBlur={(e) => (e.target.style.width = "220px")}
            />
          </div>

         
          
            


          {/*Profile, Wishlist & Cart Icons */}
          <div className="d-flex align-items-center gap-4">

          <div className="position-relative" style={{ cursor: "pointer" }}>
              <FaRegUserCircle className="fs-4 " onClick={goToProfile} style={{ color: "black" }}/>
            </div>
            <div className="position-relative" style={{ cursor: "pointer" }}>
              <FaHistory className="fs-4 " onClick={goToHistory} style={{ color: "black" }}/>
            </div>
            <div className="position-relative" style={{ cursor: "pointer" }}>
              <FaHeart className="fs-4 " style={{ color: "red" }} />
              <span
                className="badge bg-danger rounded-circle"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  fontSize: "0.8rem",
                }}
                onClick={goToWishlist}
              >
                {wishItems?.length}
              </span>
            </div>

            <div className="position-relative" style={{ cursor: "pointer" }}>
              <FaShoppingCart className="fs-4 text-dark" />
              <span
                className="badge bg-danger rounded-circle"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  fontSize: "0.8rem",
                }}
                onClick={goToCart}
              >
                {cartitems.length}
              </span>
            </div>
            <button className="btn btn-danger" onClick={goToLogin}>Sign Out</button>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="container">
        <div className="row g-4 justify-content-center">
          {(search ? searchItem : products).map((product) => (
            <div key={product._id} className="col-md-4 col-lg-3">
              <div
                className="card border-0 shadow-sm rounded-3 overflow-hidden"
                style={{
                  opacity: product.disabled ? 0.7 : 1,
                  position: "relative",
                }}
              >
                <img
                  src={`http://localhost:8080${product.image}`}
                  alt="Product"
                  className="card-img-top img-fluid"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">
                    Price: <strong>₹{product.price}</strong>
                  </p>

                  {!product.disabled && (
                    <>
                      <div className="d-flex justify-content-between">
                        <FaHeart
                          className="fs-4"
                          onClick={() => {
                            const isWished = wishItems.find(
                              (item) => item?._id === product?._id
                            );
                            if (isWished) {
                              removeWishlist({ userId, productId: product?._id });
                            } else {
                              setRed({ userId, product });
                            }
                          }}
                          style={{
                            color: wishItems.find((item) => item?._id === product?._id)
                              ? "red"
                              : "grey",
                            cursor: "pointer",
                          }}
                        />
                      </div>

                      {cartitems.find((item) => item._id === product._id) ? (
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleQty(userId, product, "dec")}
                          >
                            -
                          </button>
                          <div>
                            {cartitems.find((item) => item._id === product._id)?.qty}
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleQty(userId, product, "inc")}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-dark w-100 rounded-pill"
                          onClick={() => AddProduct({ userId, product })}
                        >
                          Add to Cart
                        </button>
                      )}
                    </>
                  )}

                  {product.disabled && (
                    <div className="position-absolute top-50 start-50 translate-middle text-white bg-dark px-2 py-1 rounded">
                      Not Available
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Cloths;
