// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { api } from '../axios';

// const Sales = () => {
//   const [productIds, setProductIds] = useState([]);
//   const sellerId = localStorage.getItem('_id');
//   const [myProducts, setMyProducts] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await api.get("/getusers");

//         const allProductIds = [];

//         data.user.forEach(user => {
//           if (user.orders && user.orders.length > 0) {
//             user.orders.forEach(order => {
//               order.products.forEach(product => {
//                 if (product._id) {
//                   allProductIds.push(product._id);
//                 }
//               });
//             });
//           }
//         });

//         setProductIds(allProductIds); 
//         console.log("Collected Product IDs:", allProductIds);

//         const res = await api.get(`/seller/getmyproduct/${sellerId}`);
//         console.log("My daataa",res.data.products);
//         const myProductIds = res.data.products.map(product => product._id);
//         setMyProducts(myProductIds); // update the state with product ids
//         console.log("Product IDs for my products:", myProductIds);
        
       
//       } catch (error) {
//         console.log(error.message);
//         toast.error(error.message);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <h3>Sales Report</h3>
//       <p>Total Products Sold: {productIds.length}</p>
//       <ul>
//         {productIds.map((id, index) => (
//           <li key={index}>{id}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sales;


import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, sellerapi } from '../axios';
import { useDispatch, useSelector } from 'react-redux';

const Sales = () => {
  const [productIds, setProductIds] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [matchingProducts, setMatchingProducts] = useState([]);
  // const sellerId = localStorage.getItem('_id');

    const { userData } = useSelector(states => states.User);
    const dispatch = useDispatch();
  
    const sellerId = userData?._id || localStorage.getItem('sellerid');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. Fetch all ordered products
        const { data } = await sellerapi.get("/getusers");
        const allProductIds = [];
  
        data.user.forEach(user => {
          user.orders?.forEach(order => {
            order.products?.forEach(product => {
              if (product._id) {
                allProductIds.push({ id: product._id, name: product.name, qty: product.qty });
              }
            });
          });
        });
  
        console.log("Collected Product IDs and details:", allProductIds);
  
        // 2. Fetch your own products
        const res = await sellerapi.get(`/seller/getmyproduct/${sellerId}`);
        const myProductsFull = res.data.products;
        console.log("My Products:", myProductsFull);
        console.log("My Product IDs:", myProductsFull.map(p => p._id));
        console.log("Ordered Product IDs:", allProductIds.map(p => p.id));

  
        // 3. Filter matching by _id
        const matchedProducts = allProductIds.filter(orderProduct =>
            myProductsFull.some(myProduct => myProduct.name?.toLowerCase() === orderProduct.name?.toLowerCase())
          );
          
  
        setMatchingProducts(matchedProducts);
        console.log("Matched Products:", matchedProducts);
  
      } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message || error.message);
      }
    };
  
    fetchUser();
  }, [sellerId]);

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Sales Report</h3>

      <div style={styles.card}>
        <h4 style={styles.subheading}>Products Purchased</h4>
        <ul style={styles.list}>
          {matchingProducts.length === 0 ? (
            <li style={styles.listItem}>No matching products found in the orders.</li>
          ) : (
            matchingProducts.map((product, index) => (
              <li key={index} style={styles.listItem}>
                <strong>{product.name}</strong> (Quantity: {product.qty})
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      fontSize: '24px',
      marginBottom: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    subheading: {
      fontSize: '20px',
      color: '#444',
      marginBottom: '15px',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      backgroundColor: '#f1f1f1',
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      color: '#333',
      fontSize: '16px',
    },
  };
  

export default Sales;
