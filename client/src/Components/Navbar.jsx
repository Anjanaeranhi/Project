import React, { useEffect, useState } from "react";
import { FaPaintBrush, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";
import { api } from "../axios";
import toast from "react-hot-toast";
// import LoginModal from "../Pages/loginModal";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // const [cartitems,setCartItems] = useState([]);
  // const [wishItems, setWishItems] = useState([]);
  const navigate = useNavigate();
  const hello = localStorage.getItem("access_token");
  const goToHome = () =>{navigate("/Hero")};
  const goToadmin = () => {navigate("/admin")}

  // const goToCart = () =>{navigate("/cart")};
  // const goToWishlist = () => {navigate("/wishlist")};

  // const userId = localStorage.getItem("_id");
  // useEffect(() => {
  //   const fetchwishlist = async () => {
  //     try {
  //       const { data } = await api.get(`/wishlist/${userId}`);
  //       setWishItems(data);
  //       console.log("Wishlist Items:", data);
  //     } catch (error) {
  //       console.log(error.response?.data?.message);
  //       toast.error("Failed to load wishlist");
  //     }
  //   };
  //   fetchwishlist();
  // }, [userId]);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const res = await api.get(`/cart/${userId}`);
  //       setCartItems(res?.data);
  //       setSearchItem(res?.data);
  //     } catch (err) {
  //       console.log("Error fetching cart on mount", err?.message);
  //     }
  //   };
  
  //   if (userId) {
  //     fetchCart();
  //   }
  // }, []);
  return (
    <div
      
      style={{
        padding: "15px 20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        top: 0,
        
      }}
    >
      {/* Logo Section */}
      <div className="d-flex align-items-center justify-content-between flex-wrap" style={{marginTop:"40px", marginBottom:"30px"}}>
      <div className="d-flex align-items-center" style={{ marginBottom: "10px"}}>
        <div
          style={{
            borderRadius: "50%",
            height: "45px",
            width: "45px",
            background :"white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FaPaintBrush style={{ height: "25px", width: "25px", color: "#11110e" }} />
        </div>
        <h2
          style={{
            background: "linear-gradient(to bottom right, #6554af, white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            letterSpacing: "1px",
            marginLeft: "10px",
          }}
        >
          Galeria
        </h2>
      </div>

      {/* Search Bar */}
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px 20px",
        }}
      >
        <input
          type="text"
          placeholder="Search here..."
          style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
            width: "200px",
            transition: "width 0.3s",
          }}
          onFocus={(e) => (e.target.style.width = "250px")}
          onBlur={(e) => (e.target.style.width = "200px")}
        />
      </div> */}

      {/* Navigation Links */}
      <div>
        <ul
          className="d-flex flex-wrap justify-content-center"
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <li
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              listStyle: "none",
              fontSize: "16px",
              cursor: "pointer",
              padding: "10px 15px",
              borderRadius: "5px",
              transition: "all 0.3s ease",
              position: "relative",
            }}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            Categories
            {showCategories && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  left: 0,
                  background: "#FFF",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  zIndex: 100,
                  padding: "10px",
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <li style={{ padding: "5px 10px", cursor: "pointer", color:"#606665" }}>Painting</li>
                  <li style={{ padding: "5px 10px", cursor: "pointer", color:"#606665" }}>Clothings</li>
                  <li style={{ padding: "5px 10px", cursor: "pointer", color:"#606665" }}>Crafts</li>
                  <li style={{ padding: "5px 10px", cursor: "pointer", color:"#606665" }}>Digital Art</li>
                  <li style={{ padding: "5px 10px", cursor: "pointer", color:"#606665" }}>Photography</li>

                </ul>
              </div>
            )}
          </li>
          <li
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              listStyle: "none",
              cursor: "pointer",
              padding: "10px 15px",
              borderRadius: "5px",
              transition: "all 0.3s ease",
            }}
          >
            Artists
          </li>
          <li
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              listStyle: "none",
              cursor: "pointer",
              padding: "10px 15px",
              borderRadius: "5px",
              transition: "all 0.3s ease",
            }}
          >
            About Us
          </li>
        </ul>
      </div>

      {/* <div className="position-relative" style={{ cursor: "pointer" }}>
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
             <div className="position-relative" style={{ cursor: "pointer" }}>
                                          <FaHeart  className="fs-4 " style={{color:"red"}}/>
                                          <span
                                            className="badge bg-danger rounded-circle"
                                            style={{
                                              position: "absolute",
                                              top: "-5px",
                                              right: "-10px",
                                              fontSize: "0.8rem"
                                              
                                            }} onClick = {goToWishlist}>
                                            {wishItems?.length} 
                                           </span>
                                        </div> */}

      

      {/* Login Button */}
      <div>
        
        {
          hello ?
          <div>
            <button
          className="btn btn-primary"
          onClick={goToadmin}
          style={{
            padding: "10px 20px",
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Admin
        </button>
          </div> : <button
          className="btn btn-primary"
          onClick={goToHome}
          style={{
            padding: "10px 20px",
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Sign In
        </button>
        }
        {/* <LoginModal show={show} handleClose={handleClose} /> */}
        {/* <Signup  show={handleSignup}/> */}
      </div>
      </div>
    </div>
  );
};

export default Navbar;

