import React, { Fragment,useEffect, useState } from "react";
// import Cloth from "../Data/cloth.json";
import { FaPaintBrush } from "react-icons/fa";


const Sample = () => {

  return (
    <Fragment>

     {/* Header */}
               <div className="container p-3 shadow-sm bg-white rounded mt-3 mb-4">
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
                 </div>
               </div>
                      <div className="container d-flex w-100 " style={{  border:"4px solid white" }}>
                      
                                <div className="d-flex flex-wrap w-100" >
                                  
                                  <div className="table-responsive ">
                                      
                                        <table className="table">
                                          <thead className="table-light">
                                            <tr>
                                              <th className="p-3 ">Product</th>
                                              {/* <th className="p-3 ">Qty</th> */}
                                              <th className="p-3">Price</th>
                                              <th className="p-3">Actions</th>
                                              {/* <th className="p-3">Add to Cart</th> */}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {Cloth.clothing?.map((product) => (
                                              <tr key={product?._id}>
                                                <td className="p-3 "> <img
                                                    src={product?.image}
                                                    alt="Product"
                                                    style={{ width: "40px", height: "20px", objectFit: "contain", paddingRight:"6px" }}
                                                  />
                                                  {product?.name}
                                                  </td>
                                                {/* <td className="p-3">{product?.qty}</td> */}
                                                <td className="p-3">${product?.price}</td>
                                                <td className="p-3">
                                                  <button className="btn btn-secondary">Disable Product</button>
                                                </td>
                                                
                                                {/* <FaCartArrowDown size={20} style={{cursor:"pointer"}} onClick={() => AddProduct(product)}/> */}
                                            
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      
                                    </div>
                                  </div>
                                  </div>
    </Fragment>
  );
};

export default Sample;
