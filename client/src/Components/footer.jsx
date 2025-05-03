import React, { Fragment } from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
    return (
        <Fragment>
            <div style={{background :"#F5EFE7"}}>
            <div  className='d-flex container'>
            <hr />
            <div className=' d-flex container flex-column'>
            <div className='mt-3'>
            <FaInstagram  style={{height:"20px", width:"30px"}} className='ms-4 '/>
            <FaFacebook style={{height:"20px", width:"30px"}} className='ms-2'/>
            <IoLogoWhatsapp style={{height:"20px", width:"30px"}} className='ms-2'/>
            </div>
             <ul className='mt-3'>
                <li style={{listStyleType:"none"}}>
                    <a href="" className="text-decoration-none  d-flex" style={{color:"#5a5a56"}} ><strong>Email :&nbsp;</strong><p style={{color:"#777772"}}>galeria@gmail.com</p></a>
                </li>
                <li style={{listStyleType:"none"}}>
                    <a href="" className="text-decoration-none d-flex" style={{color:"#5a5a56"}} ><strong>Phone : &nbsp;</strong><p style={{color:"#777772"}}>+114 76463</p></a>
                </li>
                <li style={{listStyleType:"none"}}>
                    <a href="" className="text-decoration-none d-flex" style={{color:"#5a5a56"}} ><strong>Address :  &nbsp;</strong><p style={{color:"#777772"}}> 8 Marts St, Haasts Bluff 0947584</p></a>
                </li>
                
            </ul>
            </div> 
            <div>
                <p style={{color:"#777772"}} className='mt-3'>This website contain the names, images, artworks and stories of people.</p>
                <ul >
                <li style={{listStyleType:"none",margin: 0, padding: 0,}}>
                    <a href="" className="text-decoration-none  d-flex mt-2" style={{color:"#5a5a56"}} ><strong>TERMS AND CONDITIONS</strong></a>
                </li>
                <li style={{listStyleType:"none"}}>
                    <a href="" className="text-decoration-none d-flex mt-2" style={{color:"#5a5a56"}} ><strong>PRIVACY</strong></a>
                </li>
                <li style={{listStyleType:"none"}}>
                    <a href="" className="text-decoration-none d-flex mt-2" style={{color:"#5a5a56"}} ><strong>FAQS</strong></a>
                </li>
                
            </ul>
            </div>
            </div>
            
            </div>
        </Fragment>
    );
}

export default Footer;
