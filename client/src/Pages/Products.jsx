import React, { useEffect, useState } from 'react';
import { api } from '../axios';

const Products = () => {

    const [products, setProduct] = useState([]);
    const [cartitems, setCartItems] = useState([]);
    const userId = localStorage.getItem("_id");
    useEffect(()=>{
        const getProduct = async() =>{
            try {
                const {data} = await api.get("/products");
                console.log(data.product);
                setProduct(data.product);
            } catch (error) {
                console.log(error.response?.data?.message || error);
                
            }
        }

        getProduct();
    },[])

    const AddProduct = async({userId, product}) =>{
        try {
          if(!userId){
            toast.error("user Id not found")
          }
          const {data} = await api.post("/cart", {product, userId});
          // setCartItems(data)
          toast.success(data.message)
          const res = await api.get(`/cart/${userId}`);
          setCartItems(res.data);
        } catch (error) {
          console.log(error?.data?.message);
          toast.error(error.response?.data?.message || error?.data?.message)
        }
      }
    return (
        <div>
        <div className="container">
        <div className="row g-4 justify-content-center">
          {products.map((item) => (
            <div key={item._id} className="col-md-4 col-lg-3">
              <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                <img
                  src={item.image}
                  alt="Product"
                  className="card-img-top img-fluid"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-muted">Price: <strong>${item.price}</strong></p>
                  <div className="d-flex justify-content-between">
                  {/* <p className="card-text text-muted">⭐ {item.rating}</p> */}
                  {/* <FaHeart className="fs-4 " onClick={() => {const isWished = wishItems.find(item => item?.id === item?.id);
                      if (isWished) {
                          removeWishlist({ userId, itemId: item?._id });
                      } else {
                        setRed({ userId, item });
                      }}
                   }
                  style={{ color:  wishItems.find(item => item?.id == item?.id) ? 'red' : 'grey', cursor: 'pointer' }}/> */}
                  </div>
                  
                  {
                      cartitems.find(item => item.id === item.id) ? (
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button className="btn btn-primary" onClick={() => handleQty(userId, item, "dec")}>-</button>
                          <div>{cartitems.find(item => item.id === item.id)?.qty}</div>
                          <button className="btn btn-primary" onClick={() => handleQty(userId, item, "inc")}>+</button>
                        </div>
                      ) : (
                        <button className="btn btn-dark w-100 rounded-pill" onClick={() => AddProduct({userId,product})}>
                          Add to Cart
                        </button>
                      )
                    }
                </div>
              </div>
            </div>
          ))}
        </div> 
        </div>
        </div>
    );
}

export default Products;
