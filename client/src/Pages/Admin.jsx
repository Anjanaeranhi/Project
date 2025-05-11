import React, { Fragment, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import toast from 'react-hot-toast';
import { FaBars, FaPaintBrush } from 'react-icons/fa';
import { api } from '../axios';
import { CgProfile } from 'react-icons/cg';
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlineProductionQuantityLimits, MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';



const Admin = () => {
  const [show, setShow] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [products, setProduct] = useState([]);
  const [sellers, setsellers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  
  const [salesReport, setSalesReport] = useState([]);
  const token = localStorage.getItem("access_token");
  const handleToggleDisable = async (userId) => {
    try {
      await api.put(`/admin/user/${userId}/toggle`);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, disabled: !user.disabled } : user
        )
      );

      toast.success("User status updated");
    } catch (error) {
      toast.error(error.response?.data?.message ||"Failed to update user status");
    }
  };
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleToggleDisableSeller = async (sellerId) => {
    try {
      await api.put(`/admin/seller/${sellerId}/toggle`); 
      setsellers(prevSellers =>
        prevSellers.map(seller =>
          seller._id === sellerId ? { ...seller, disabled: !seller.disabled } : seller
        )
      );
      toast.success("Seller status updated");
    } catch (error) {
      toast.error(error.response?.data?.message ||"Failed to update seller status");
    }
  };
  
  const handleToggleDisableProduct = async (productId) => {
    try {
      console.log(productId);
      
      await api.put(`/admin/product/${productId}/toggle`); 
      setProduct(prevProducts =>
        prevProducts.map(product =>
          product._id === productId ? { ...product, disabled: !product.disabled } : product
        )
      );
      toast.success("Product status updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product status");
    }
  };
  
  

  
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(localStorage.getItem("access_token"))
        const res = await api.get("/admin/users");
        const userList = res?.data?.user || [];
        setUsers(userList);
  
        const reportData = userList.map(user => {
          const productNames = [];
          let totalAmount = 0;
  
          user.orders?.forEach(order => {
            totalAmount += order.totalAmount || 0;
  
            order.products?.forEach(product => {
              if (product?.name) {
                productNames.push(product.name);
              }
            });
          });
  
          return {
            userName: user.name,
            products: productNames,
            totalAmount: totalAmount
          };
        });
  
        setSalesReport(reportData);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error fetching users");
      }
    };
  
    fetchUser();
  }, []);
  

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const { data } = await api.get("/admin/seller");
        setsellers(data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error fetching sellers");
      }
    };
    fetchSeller();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get("/products");
        setProduct(data.product || []);
      } catch (error) {
        toast.error(error.response?.data?.message ||"Error fetching products");
      }
    };
    fetchProduct();
  }, []);


  const navigate = useNavigate();
  const goToHero = () =>{
    localStorage.removeItem("access_token")
    navigate("/hero")
  };


  return (
    <Fragment>
      <div>
        
        <div className="container p-3 shadow-sm bg-white rounded mt-3 mb-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <>
              <FaBars className='m-4' size={20} onClick={() => setShow(true)} />
              <Offcanvas show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title style={{ textAlign: "center" }}>Admin Controller</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className='mb-2'  style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}} onClick={() => { setActiveView("dashboard"); setShow(false); }}>Dashboard</div>
                  <div className='mb-2'  style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}} onClick={() => { setActiveView("users"); setShow(false); }}>Users</div>
                  <div className='mb-2'  style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}} onClick={() => { setActiveView("sellers"); setShow(false); }}>Sellers</div>
                  <div className='mb-2'  style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}} onClick={() => { setActiveView("products"); setShow(false); }}>Products</div>
                  <div className='mb-2'  style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}} onClick={() => { setActiveView("report"); setShow(false);}}>Sales Report</div>
                </Offcanvas.Body>
              </Offcanvas>
            </>
            <div className="d-flex align-items-center">
              <div className="d-flex justify-content-center align-items-center shadow" style={{
                borderRadius: "50%", height: "50px", width: "50px", background: "#fff"
              }}>
                <FaPaintBrush style={{ height: "25px", width: "25px", color: "#6554af" }} />
              </div>
              <h2 className="ms-3" style={{
                background: "linear-gradient(to right, #6554af, #ff7eb3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}>
                Galeria
              </h2>
            </div>
            <button className="btn btn-danger me-2" onClick={goToHero}>Sign Out</button>
          </div>
        </div>

        
        {activeView === "users" && (
          
          <div className="table-responsive container">
            <div className="d-flex justify-content-between w-100 mb-4">
            <h2>Users</h2>
            <button className="btn btn-success" onClick={() => setActiveView("dashboard")}>Go back</button>
          </div>
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th className="p-3">Users</th>
                  <th className="p-3">Email</th>
                  <th className="p-3"></th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <button className="btn btn-secondary" onClick={() => handleViewUser(user)}>View User</button>
                    </td>
                    <td className="p-3">
                      <button className={`btn ${user.disabled ? 'btn-danger' : 'btn-secondary'}`} onClick={()=>handleToggleDisable(user._id)}>{user.disabled ? "Enable User" : "Disable User"}</button>
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
            <div>
            <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
               {selectedUser ? (
                <>
                      <p><strong>Name:</strong> {selectedUser.name}</p>
                      <p><strong>Email:</strong> {selectedUser.email}</p>
                      <p><strong>Number of Orders:</strong> {selectedUser.orders?.length || 0}</p>
                      <div>
                        <strong>Products Ordered:</strong>
                        <ul>
                          {selectedUser.orders?.flatMap(order =>
                            order.products?.map(product => (
                              <li key={product._id}>{product.name}</li>
                            ))
                          )}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowUserModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>
          </div>
        )}

        
        {activeView === "sellers" && (
          <div className="container" style={{ border: "4px solid white" }}>
            <div className="d-flex justify-content-between w-100 mb-4">
              <h2>Sellers</h2>
              <button className="btn btn-success" onClick={() => setActiveView("dashboard")}>Go back</button>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th className="p-3">Seller</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.map(seller => (
                    <tr key={seller._id}>
                      <td className="p-3">{seller.name}</td>
                      <td className="p-3">{seller.email}</td>
                      <td className="p-3">
                        <button
                          className={`btn ${seller.disabled ? 'btn-danger' : 'btn-secondary'}`}
                          onClick={() => handleToggleDisableSeller(seller._id)}
                        >
                          {seller.disabled ? "Enable Seller" : "Disable Seller"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        
        {activeView === "products" && (
          <div className="container" style={{ border: "4px solid white" }}>
            <div className="d-flex justify-content-between w-100 mb-4">
              <h2>Products</h2>
              <button className="btn btn-success" onClick={() => setActiveView("dashboard")}>Go back</button>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th className="p-3">Clothings</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td className="p-3">
                        <img
                          src={`http://localhost:8080${product.image}`}
                          alt="Product"
                          style={{ width: "40px", height: "20px", objectFit: "contain", paddingRight: "6px" }}
                        />
                        {product.name}
                      </td>
                      <td className="p-3">${product.price}</td>
                      <td className="p-3">
                        <button
                          className={`btn ${product.disabled ? 'btn-danger' : 'btn-secondary'}`}
                          onClick={() => handleToggleDisableProduct(product._id)}
                        >
                          {product.disabled ? "Enable Product" : "Disable Product"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        
        {activeView === "report" && (
            <div className="container">
            <div className="d-flex justify-content-between w-100 mb-4">
              <h2>Sales Report</h2>
              <button className="btn btn-success" onClick={() => setActiveView("dashboard")}>Go back</button>
            </div>
        
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Products Purchased</th>
                    <th className="p-3">Total Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                {salesReport.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center p-3">No data available</td>
                      </tr>
                    ) : (
                      salesReport.map((report, index) => (
                        <tr key={index}>
                          <td className="p-3">{report.userName}</td>
                          <td className="p-3">{report.products.join(", ")}</td>
                          <td className="p-3">${report.totalAmount.toFixed(2)}</td>
                        </tr>
                      ))
                    )}

                </tbody>
              </table>
              
            </div>
          </div>
        )}


        {activeView === "dashboard" && (
          <div>
            
            <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
              <div className="row g-4" style={{ paddingTop: "40px", paddingBottom: "70px" }}>
                <div className="col-md-6">
                  <div className="icon-box text-center">
                    <CgProfile size={100} style={{ color: "black" }} />
                    <h5 className="text-black mt-2" style={{ cursor: 'pointer' }} onClick={() => setActiveView("users")}>Users</h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="icon-box text-center">
                    <MdOutlineProductionQuantityLimits size={100} style={{ color: "black" }} />
                    <h5 className="text-black mt-2" style={{ cursor: 'pointer' }} onClick={() => setActiveView("products")}>View Products</h5>
                  </div>
                </div>
                <div className="col-md-6 mt-5">
                  <div className="icon-box text-center">
                    <MdOutlineUpdate size={100} style={{ color: "black" }} />
                    <h5 className="text-black mt-2" style={{ cursor: 'pointer' }} onClick={() => setActiveView("sellers")}>Sellers</h5>
                  </div>
                </div>
                <div className="col-md-6 mt-5">
                  <div className="icon-box text-center">
                    <FcSalesPerformance size={100} />
                    <h5 className="text-black mt-2" style={{ cursor: 'pointer' }} onClick={() => setActiveView("report")}>Sales</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      
    </Fragment>
  );
};

export default Admin;
