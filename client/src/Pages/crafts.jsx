// import React, { Fragment, useEffect, useState } from "react";
// import { FaPaintBrush, FaShoppingCart } from "react-icons/fa";
// import Cloth from "../Data/cloth.json";
// import { FaHeart } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { api } from "../axios";
// import { useNavigate } from "react-router";

// const Crafts = ({cartitems, setCartItems,}) => {
//       // const [wishList, setWishList] = useState({});
//       const [wishItems, setWishItems] = useState([])
//       const navigate = useNavigate("");
//       const [search, setSearch] = useState("");
//       const [searchItem, setSearchItem] = useState([]);
//       // const [wishItems, setWishItems] = useState([])
    
//       const goToCart = () =>{navigate("/cart")};
//       const goToWishlist = () => {navigate("/wishlist")};
    
//       const userId = localStorage.getItem("_id");

//       const setRed = async({userId, product}) => {
//         try {
//           const response = await api.post("/wishlist", {userId,product});
//           console.log(response?.data);
//           toast.success(response.data.message)
//           const res = await api.get(`/wishlist/${userId}`);
//           setWishItems(res?.data);
          
//         } catch (error) {
//           console.log(error?.message);
//           toast.error(error?.message)
//         }
//       };

//       useEffect(() => {
//         const fetchwishlist = async () => {
//           try {
//             const { data } = await api.get(`/wishlist/${userId}`);
//             setWishItems(data);
//             console.log("Wishlist Items:", data);
//           } catch (error) {
//             console.log(error.response?.data?.message);
//             toast.error("Failed to load wishlist");
//           }
//         };
//         fetchwishlist();
//       }, [userId]);
    
//       useEffect(() => {
//         const fetchCart = async () => {
//           try {
//             const res = await api.get(`/cart/${userId}`);
//             setCartItems(res?.data);
//             setSearchItem(res?.data);
//           } catch (err) {
//             console.log("Error fetching cart on mount", err?.message);
//           }
//         };
      
//         if (userId) {
//           fetchCart();
//         }
//       }, []);

//       const handleSearch = (event) => {
//         const searchValue = event.target.value;
//         setSearch(searchValue);
//         const searchResults = Cloth.craft.filter((product) =>
//             product.name.toLowerCase().includes(searchValue.toLowerCase())
//         );
//         setSearchItem(searchResults);
//     };
      
//       const AddProduct = async({userId, product}) =>{
//         try {
//           console.log(product);
//           if(!userId){
//             toast.error("user Id not found")
//           }
//           const {data} = await api.post("/cart", {product, userId});
//           // setCartItems(data)
//           toast.success(data?.message)
//           const res = await api.get(`/cart/${userId}`);
//           setCartItems(res?.data);
//         } catch (error) {
//           console.log(error?.data?.message);
//           toast.error(error?.data?.message)
//         }
//       }


//       const handleQty = async(userId, product, type) =>{
//         try {
//           // console.log(product);
          
//           const {data} = await api.put("/cart/update", {userId , product , type});
//           // console.log(data);

//           const res = await api.get(`/cart/${userId}`);
//           setCartItems(res?.data);
          
//         } catch (error) {
//           console.log(error?.data?.message);
//           toast.error(error?.data?.message);
//         }
//       }

//       const removeWishlist = async({userId, productId}) =>{
//         console.log("User>>>>", userId);
//         console.log("product>>>>", productId);
//         try {
//         const {data} = await api.delete(`/wishlist/${userId}/${productId}`);
//         console.log(data);
//         toast.success(data.message);
//         const res = await api.get(`/wishlist/${userId}`);
//         console.log(res?.data);
        
//         setWishItems(res?.data);
        
//         } catch (error) {
//           if(error){
//             toast.error(error?.data?.message);
//             console.log(error?.data?.message);
//           }
          
//         }
//       }
//   return (
//     <Fragment>
//       {/* Header Section */}
//       <div
//         className="container p-3 shadow-sm bg-white rounded"
//         style={{ marginBottom: "40px", marginTop: "20px" }}
//       >
//         <div className="d-flex align-items-center justify-content-between flex-wrap">
//           {/* Logo */}
//           <div className="d-flex align-items-center">
//             <div
//               className="d-flex justify-content-center align-items-center shadow"
//               style={{
//                 borderRadius: "50%",
//                 height: "50px",
//                 width: "50px",
//                 background: "#fff",
//               }}
//             >
//               <FaPaintBrush style={{ height: "25px", width: "25px", color: "#6554af" }} />
//             </div>
//             <h2
//               className="ms-3"
//               style={{
//                 background: "linear-gradient(to right, #6554af, #ff7eb3)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontWeight: "700",
//               }}
//             >
//               Galeria
//             </h2>
//           </div>

//           {/* Search Bar */}
//           <div className="d-flex align-items-center">
//             <input
//               type="text"
//               placeholder="Search here..."
//               onChange={handleSearch}
//               className="form-control shadow-sm"
//               style={{
//                 borderRadius: "20px",
//                 width: "220px",
//                 transition: "width 0.3s ease-in-out",
//               }}
//               onFocus={(e) => (e.target.style.width = "270px")}
//               onBlur={(e) => (e.target.style.width = "220px")}
//             />
//           </div>

//           {/* Cart Icon */}
//                      <div className="d-flex align-items-center gap-4">
//                               <div className="position-relative" style={{ cursor: "pointer" }}>
//                                 <FaHeart  className="fs-4 " style={{color:"red"}}/>
//                                 <span
//                                   className="badge bg-danger rounded-circle"
//                                   style={{
//                                     position: "absolute",
//                                     top: "-5px",
//                                     right: "-10px",
//                                     fontSize: "0.8rem"
                                    
//                                   }} onClick = {goToWishlist}>
//                                   {wishItems?.length} 
//                                  </span>
//                               </div>
                            
//                               {/* Cart Icon */}
//                               <div className="position-relative" style={{ cursor: "pointer" }}>
//                                 <FaShoppingCart className="fs-4 text-dark" />
//                                 <span
//                                   className="badge bg-danger rounded-circle"
//                                   style={{
//                                     position: "absolute",
//                                     top: "-5px",
//                                     right: "-10px",
//                                     fontSize: "0.8rem",
//                                   }}
//                                   onClick={goToCart}
//                                 >
//                                  {cartitems.length} 
//                                 </span>
//                               </div>
//                         </div>
//                   </div>
//         </div>

//       {/* Product Section */}
//       <div className="container">
//         <div className="row g-4 justify-content-center">
//           {(search ? searchItem : Cloth.craft).map((product) => (
//             <div key={product.id} className="col-md-4 col-lg-3">
//               <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
//                 <img
//                   src={product?.image}
//                   alt="Product"
//                   className="card-img-top img-fluid"
//                   style={{ height: "220px", objectFit: "cover" }}
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{product?.name}</h5>
//                   <p className="card-text text-muted">Price: <strong>${product?.price}</strong></p>
//                   <div className="d-flex justify-content-between">
//                       <p className="card-text text-muted">⭐ {product?.rating}</p>
//                       <FaHeart className="fs-4 " onClick={() => {const isWished = wishItems.find(item => item?.id === product?.id);
//                       if (isWished) {
//                         removeWishlist({ userId,productId: product?._id });
//                       } else {
//                         setRed({ userId, product });
//                       }}
//                     }
//                        style={{ color:  wishItems.find(item => item?.id == product?.id) ? 'red' : 'grey', cursor: 'pointer' }}/>
//                   </div>
//                   {
//                       cartitems.find(item => item.id === product.id) ? (
//                         <div className="d-flex justify-content-center align-items-center gap-2">
//                           <button className="btn btn-primary" onClick={() => handleQty(userId, product, "dec")}>-</button>
//                           <div>{cartitems.find(item => item.id === product.id)?.qty}</div>
//                           <button className="btn btn-primary" onClick={() => handleQty(userId, product, "inc")}>+</button>
//                         </div>
//                       ) : (
//                         <button className="btn btn-dark w-100 rounded-pill" onClick={() => AddProduct({userId,product})}>
//                           Add to Cart
//                         </button>
//                       )
//                     }
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Crafts;
