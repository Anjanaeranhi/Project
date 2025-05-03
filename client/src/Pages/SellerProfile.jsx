// import React, { useEffect, useState } from 'react';
// import { toast } from "react-hot-toast";
// import { sellerapi } from '../axios';
// import { useDispatch, useSelector } from 'react-redux';

// const SellerProfile = () => {
//     // localStorage.getItem("sellerTo")
//     // const userId = localStorage.getItem("sellerid");
//     const { userData } = useSelector(states => states.User);
   
    
//     const dispatch = useDispatch();
//     dispatch(userData);
//     console.log("Userdaaaataaa", userData);
//     const userId = userData?._id;
//     const [seller, setSeller] = useState({});
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: ''
//     });

//     useEffect(() => {
//         const fetchSeller = async () => {
//             try {
                
//                 console.log("UUUUUUUUUUUUSER IDDDDDD", userId);
                
//                 const { data } = await sellerapi.get(`/seller/profile/${userId}`);
//                 setSeller("daaaaaaaaaaaaytaaaaaaaaaaaaa",data);
//                 setFormData({ name: data.user.name, email: data.user.email });
//             } catch (error) {
//                 toast.error(error.message);
//             }
//         };
//         fetchSeller();
//     }, [userId]);

//     const handleEditToggle = () => {
//         setIsEditing(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSave = async () => {
//         try {
//             const { data } = await sellerapi.put(`/seller/profile/${userId}`, formData);
//             toast.success("Profile updated!");
//             setSeller(data.updatedSeller);
//             setIsEditing(false);
//         } catch (error) {
//             toast.error("Failed to update profile");
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="card shadow border rounded p-4 mx-auto" style={{ maxWidth: '500px' }}>
//                 <h2 className="text-center mb-4">Seller Profile</h2>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item d-flex justify-between">
//                         <strong>Name:</strong>
//                         {isEditing ? (
//                             <input
//                                 type="text"
//                                 className="form-control form-control-sm ms-2"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                             />
//                         ) : (
//                             <span>{seller.name}</span>
//                         )}
//                     </li>
//                     <li className="list-group-item d-flex justify-between">
//                         <strong>Email:</strong>
//                         {isEditing ? (
//                             <input
//                                 type="email"
//                                 className="form-control form-control-sm ms-2"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                             />
//                         ) : (
//                             <span>{seller.email}</span>
//                         )}
//                     </li>
//                     <li className="list-group-item d-flex justify-between">
//                         <strong>Registered On:</strong>
//                         <span>{new Date(seller.createdAt).toLocaleDateString()}</span>
//                     </li>
//                 </ul>

//                 {!isEditing ? (
//                     <button className="btn btn-primary mt-4 w-100" onClick={handleEditToggle}>
//                         Edit Profile
//                     </button>
//                 ) : (
//                     <button className="btn btn-success mt-4 w-100" onClick={handleSave}>
//                         Save Changes
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SellerProfile;













import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { sellerapi } from '../axios';
import { useDispatch, useSelector } from 'react-redux';

const SellerProfile = () => {
    // localStorage.clear();
    const { userData } = useSelector(states => states.User);
    // const userId = localStorage.getItem("sellerid");
    // console.log("userID::::",userId);
    // const name = localStorage.getItem("name")
    // console.log("name", name);
    const dispatch = useDispatch();

    const userId = userData?._id || localStorage.getItem("sellerid");
    

    
    
    const [seller, setSeller] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        if (!userId) return;
        
        

        const fetchSeller = async () => {
            try {
                console.log("sellerIDDD", userId);
                console.log("Fetching seller with ID:", userId);
                const { data } = await sellerapi.get(`/seller/profile/${userId}`);
                setSeller(data.user);
                setFormData({ name: data.user.name, email: data.user.email });
            } catch (error) {
                toast.error(error.message || "Failed to fetch seller profile");
            }
        };

        fetchSeller();
    }, [userId]);

    // useEffect(() => {
    //     let id = userId || localStorage.getItem("sellerid");
    //     // localStorage.setItem("sellerid", data.user._id); 
    //     if (!id) return;
      
    //     const fetchSeller = async () => {
    //       try {
    //         const { data } = await sellerapi.get(`/seller/profile/${id}`);
    //         setSeller(data.user);
    //         setFormData({ name: data.user.name, email: data.user.email });
    //       } catch (error) {
    //         toast.error(error.message);
    //       }
    //     };
      
    //     fetchSeller();
    //   }, [userId]);
      

    const handleEditToggle = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const { data } = await sellerapi.put(`/seller/profile/${userId}`, formData);
            toast.success("Profile updated!");
            setSeller(data.updatedSeller);
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow border rounded p-4 mx-auto" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Seller Profile</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-between">
                        <strong>Name:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                className="form-control form-control-sm ms-2"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{seller.name}</span>
                        )}
                    </li>
                    <li className="list-group-item d-flex justify-between">
                        <strong>Email:</strong>
                        {isEditing ? (
                            <input
                                type="email"
                                className="form-control form-control-sm ms-2"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{seller.email}</span>
                        )}
                    </li>
                    <li className="list-group-item d-flex justify-between">
                        <strong>Registered On:</strong>
                        <span>{seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </li>
                </ul>

                {!isEditing ? (
                    <button className="btn btn-primary mt-4 w-100" onClick={handleEditToggle}>
                        Edit Profile
                    </button>
                ) : (
                    <button className="btn btn-success mt-4 w-100" onClick={handleSave}>
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
};

export default SellerProfile;
