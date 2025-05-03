import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from 'react-router';
// import other icons as needed

const SellerDashboard = () => {
    const navigate = useNavigate();
    const goToHero = () => {
        navigate("/hero");
        localStorage.removeItem("sellerToken")
    };
    const goToProfile = () => {navigate("/sellerprofile")};
    const goToAddProduct = () => {navigate("/seller")};
    const goToViewProduct = () =>{navigate("/viewproduct")};
    const goToSales = () =>{navigate("/viewusers")}
    return (
        <>
            <div className="d-flex align-items-center justify-content-between bg-dark p-3 " style={{height:"100%"}}>
                <h2 className='text-center flex-grow-1 mb-0' style={{ color: "#0c8dcd" }}>Seller Dashboard</h2>
                <button className='btn btn-danger me-2' onClick={goToHero}>Sign Out</button>
            </div>

            <div className="p-4 bg-dark" style={{ minHeight: '100vh' }}>
                <div className="row g-4" style={{ paddingTop: "40px", paddingBottom: "70px" }}>
                    <div className="col-md-6">
                        <div className="icon-box text-center">
                            <CgProfile size={100} style={{ color: "white" }} />
                            <h5 className="text-white mt-2" style={{ cursor: 'pointer' }} onClick={goToProfile}>Profile</h5>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="icon-box text-center">
                            <MdOutlineProductionQuantityLimits size={100} style={{ color: "white" }}/>
                            <h5 className="text-white mt-2" style={{ cursor: 'pointer' }} onClick={goToViewProduct}>View Products</h5>
                        </div>
                    </div>
                    <div className="col-md-6 mt-5">
                        <div className="icon-box text-center">
                            <MdOutlineUpdate size={100} style={{ color: "white" }} />
                            <h5 className="text-white mt-2" style={{ cursor: 'pointer' }} onClick={goToAddProduct}>Add Product</h5>
                        </div>
                    </div>
                    <div className="col-md-6 mt-5">
                        <div className="icon-box text-center">
                            <FcSalesPerformance size={100}/>
                            <h5 className="text-white mt-2" style={{ cursor: 'pointer' }} onClick={goToSales}>Sales</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerDashboard;
