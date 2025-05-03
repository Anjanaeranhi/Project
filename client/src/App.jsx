import {React, useState, useEffect} from 'react';
import Hero from './Pages/Hero';
import { BrowserRouter, Route, Routes } from "react-router";
import Signup from './Pages/signup';
// import Crafts from './Pages/crafts';
import Cloths from './Pages/cloths';
// import Paintings from './Pages/paintings';
import Homepage from './Components/Homepage';
import Recover from './Pages/Recover';
import Cart from './Pages/Cart';
import { api } from "./axios";
import Wishlist from './Pages/Wishlist';
import Admin from './Pages/Admin';
import Sample from './Pages/sample';
import Address from './Pages/Address';
import Seller from './Pages/Seller';
import Products from './Pages/Products';
import Adminlogin from './Components/adminlogin';
import SellerLogin from './Pages/SellerLogin';
import SellerSignUp from './Pages/sellersignup';
import Checkout from './Pages/Checkout';
import Invoice from './Pages/invoice';
import SellerProfile from './Pages/SellerProfile';
import SellerDashboard from './Pages/SellerDashboard';
import SellerProducts from './Pages/sellerProducts';
import Sales from './Pages/Sales';
import AdminReport from './Pages/adminReport';
import DebitCard from './Pages/DebitCard';
import PaymentSuccess from './Pages/PaymentSuccess';
import PaymentCancel from './Pages/PaymentCancel';
import History from './Pages/History';
import UserProfile from './Pages/UserProfile';
import Singleview from './Pages/Singleview';
import  { ProtectRouter } from './Pages/ProtectedRoute';

// import toast from 'react-hot-toast';


const App = () => {
  const [cartitems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  // const userId = localStorage.getItem("_id");

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       if (userId) {
  //         const { data } = await api.get(`/cart/${userId}`);
  //         setCartItems(data);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchCart();
  // }, [userId]);

  // useEffect(() => {
  //   const fetchwishlist = async () => {
  //     try {
  //       const { data } = await api.get(`/wishlist/${userId}`);
  //       setWishItems(data);
  //       // console.log("Wishlist Items:", data);
  //     } catch (error) {
  //       console.log(error.message);
  //       toast.error("Failed to load wishlist");
  //     }
  //   };
  //   fetchwishlist();
  // }, [userId]);
  return (
    // <Hero/>
    

<BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero />}/>
          <Route path='hero' element={<Homepage />}/>
          {/* <Route path='signin' Component={Login} /> */}
          <Route path='signup' element={<Signup />}/>
          {/* <Route path='crafts' element={<Crafts cartitems={cartitems} setCartItems= {setCartItems} />} /> */}
          <Route path='cloths' element={<Cloths cartitems={cartitems} setCartItems= {setCartItems}/>}/>
          {/* <Route path='paintings' element={<Paintings cartitems={cartitems} setCartItems= {setCartItems}/>} /> */}
          <Route path='recover' element={<Recover />}/>
          <Route path='cart' element={<Cart cartitems={cartitems} setCartItems= {setCartItems}  wishitems ={wishItems}  setWishItems= {setWishItems}/>}/>
          <Route path='wishlist' element={<Wishlist cartitems={cartitems} setCartItems= {setCartItems} wishitems ={wishItems}  setWishItems= {setWishItems}/>}/>
          <Route path='admin' element ={<ProtectRouter auth = {true}><Admin/></ProtectRouter>}/> 
          <Route path='sample' element={<Sample />} />
          <Route path='address' element={<Address/>}/>
          <Route path='seller' element={<Seller />}/>
          <Route path='products' element={<Products />}/>
          <Route path='adminlogin' element={<ProtectRouter ><Adminlogin /></ProtectRouter>}/> 
          <Route path='sellerlogin' element={<SellerLogin />}/>
          <Route path='sellersignup' element={<SellerSignUp />}/>
          <Route path='checkout' element={<Checkout/> }/>
          <Route path='invoice' element={<Invoice />}/>
          <Route path='sellerprofile' element={<SellerProfile />}/>
          <Route path='sellerdashboard' element={<SellerDashboard />}/>
          <Route path='viewproduct' element={<SellerProducts/>}/>
          <Route path='viewusers' element={<Sales />}/>
          <Route path='adminreport' element={<AdminReport />}/>
          {/* <Route path='card' element={<DebitCard/>}/> */}
          <Route path='payment-success' element={<PaymentSuccess/>}/>
          <Route path='payment-cancel' element={<PaymentCancel />}/>
          <Route path='history' element={<History />}/>
          <Route path='userprofile' element={<UserProfile/>}/>
          <Route path='singleview' element={<Singleview/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
