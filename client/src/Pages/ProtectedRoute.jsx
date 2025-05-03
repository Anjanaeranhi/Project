import { Navigate } from "react-router"

export const ProtectRouter = ({children, auth=false}) =>{
    const token = localStorage.getItem("access_token");
    console.log("token>>>>>>>>>>>>>>>>>>>>>>>>>>>>..",token, "endssssssssssssssssssssssssssssssssssssssssssssss");
    
    if(auth){
        if(!token){
            return <Navigate to={"/adminlogin"}/> 
        }
        return children  
    }else{
        if(!token){
            return children
        }
        return <Navigate to={"/admin"}/> 
    }
}


