import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';
import {  sellerapi } from '../axios';
import { useDispatch, useSelector } from 'react-redux';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  
  const { userData } = useSelector(states => states.User);
  const dispatch = useDispatch();

  const sellerId = userData?._id || localStorage.getItem('sellerid');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(sellerId);
        
        const res = await axios.get(`http://localhost:8080/seller/products/${sellerId}`);
        console.log(res.data.products);
        
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [sellerId]);
 const deleteProduct = async({name, id, sellerId}) =>{
  console.log(sellerId);
  console.log(id);
    try {
        const {data} =await sellerapi.delete(`/seller/delete/${id}/${sellerId}`, {data: { name }});
        console.log(data);
        
        setProducts(products.filter(product => product._id !== id));
        toast.success("Product deleted successfully");
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
 }
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#0c8dcd" }}>Your Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card bg-dark text-white shadow-lg product-card h-100">
                <img
                  src={`http://localhost:8080${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: "0.375rem", borderTopRightRadius: "0.375rem" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ₹{product.price}</p>
                    <p className="card-text text-truncate" title={product.description}>
                      {product.description}
                    </p>
                  </div>
                  <div className="text-end">
                    <MdDeleteForever
                      size={32}
                      color="red"
                      title="Delete Product"
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onClick={() => deleteProduct({name: product.name, id: product._id, sellerId })}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;
