import React from 'react';
import { FaPaintBrush } from "react-icons/fa";

const Intro = () => {
    return (
        <div style={{ background: "#3E5879", display:"flex", justifyContent:"space-between"  }}  >
            <div className="text-container" style={{ marginTop: "20px", marginLeft:"20px" }}>
                <p 
                    className='container'
                    style={{
                        fontSize: "60px",
                    }}
                >
                    <strong>Welcome to <span style={{color:"white"}}><strong>Galeria</strong></span></strong>
                </p>
                <p className='container'>
                    Explore a world of creativity with our exclusive collection of clothing, crafts, paintings, and photographs.<br /> 
                    Celebrate artistry and style, all in one place, where every piece tells a unique story.
                </p>
            </div>
            
            <FaPaintBrush style={{ height: "200px", width: "200px", color: "black", marginTop:"50px", marginRight:"100px", marginBottom:"50px" }} />
                    
        </div>
    );
}

export default Intro;

