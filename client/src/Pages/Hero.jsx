// 
import React, { Fragment } from 'react';
import { useState } from "react";
import LoginModal from './loginModal';
import Footer from '../Components/footer';
import Navbar from '../Components/Navbar';
import Paintingcarousel from '../Components/paintingcarousel';
import Intro from '../Components/Intro';


const Hero = () => {
    const [show, setShow] = useState(false);
    

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <Fragment>
             <div style={{background: "#213555"}}>
                <Navbar/>
                <LoginModal show={show} handleClose={handleClose} />
                <Intro />
                <Paintingcarousel />
                <Footer />
            </div>
        </Fragment>
        
    );
};

export default Hero;
