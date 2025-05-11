import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { api } from '../axios';
import { useNavigate } from 'react-router';



const UserProfile = () => {
   
    const userId = localStorage.getItem("_id");
    const [user, setuser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    
    useEffect(() => {
        const fetchuser = async () => {
            try {
                const { data } = await api.get(`/viewuser/${userId}`);
                console.log(data);
                
                setuser(data);
                console.log({ name: data.name, email: data.email });
                
                setFormData({ name: data.name, email: data.email });
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };
        fetchuser();
    }, [userId]);

    const handleEditToggle = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            console.log("Forrm Daata",formData);
            
            const { data } = await api.put(`/profile/${userId}`, formData);
            // console.log("daataa",data);
            
            toast.success("Profile updated!");
            // setFormData({
            //     name: updateduser.name,
            //     email: updateduser.email,
            // });
            setuser(data);
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow border rounded p-4 mx-auto" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">user Profile</h2>
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
                            <span className='ms-2'>{formData?.name}</span>
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
                            <span className='ms-2'>{formData?.email}</span>
                        )}
                    </li>
                    <li className="list-group-item d-flex justify-between">
                        <strong>Registered On:</strong>
                        <span className='ms-2'>{new Date(formData?.createdAt).toLocaleDateString()}</span>
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

                {/* <button className='btn btn-success w-100 mt-3' onClick={goToUser}>Go back</button> */}
            </div>
        </div>
    );
};
export default UserProfile;
