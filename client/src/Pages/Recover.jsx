import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';


const Recover = () => {
        const navigate = useNavigate();
        const goToHome = () =>{navigate("/")}
        const [msg, setMsg] = useState('');
        const [load, setLoad] = useState(false);

    const handleMessage = async () =>{
        try {
            if(!msg){
                console.log("Message not found"); 
            }
            setLoad(true);
            const res = await axios.post("http://localhost:8080/email", {email: msg});
            if(!res){
                toast.error("No user");
            }
            toast.success(res.data.message);
            goToHome()
        } catch (error) {
            console.log(error.response?.data?.message || error);
            setLoad(false)
        }
    }
    return (
        <div className="forgot-container d-flex justify-content-center align-items-center vh-100 " style={{backgroundColor:"#21211a"}}>
        <div className="form-box p-5 rounded shadow" style={{backgroundColor:"#24241d"}}>
            <h3 className="mb-4 text-center text-primary">Forgot Password</h3>
            <input 
                type="email" 
                className="form-control mb-3" 
                placeholder="Enter your email" 
                value={msg}
                onChange={(e) => setMsg(e.target.value)} 
            />
            <button className="btn btn-primary w-100" onClick={handleMessage}>
                Send Email
            </button>
            {load && (
                <div className="text-center my-3">
                    <div className="spinner-border text-primary" >
                    </div>
                </div>
                )}
        </div>
    </div>
    );
}

export default Recover;
