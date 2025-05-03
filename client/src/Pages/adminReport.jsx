import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const AdminReport = () => {

    useEffect(()=>{
        const fetchUser = async() =>{
            try {
                const {data} = api.get("/viewusers");
                console.log(data);
                
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            }
        }

        fetchUser();
    },[])
    return (
        <div>
            Hello
        </div>
    );
}

export default AdminReport;
