import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import { api } from '../axios';
import { Modal, Button } from 'react-bootstrap';

const Paintingcarousel = () => {
    const [products, setProducts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get("/products");
                setProducts(data.product);
            } catch (error) {
                toast.error(error.message );
            }
        };

        fetchProducts();
    }, []);

    
    const groupedProducts = [];
    for (let i = 0; i < products.length; i += 3) {
        groupedProducts.push(products.slice(i, i + 3));
    }


    const viewDetails = async(item) =>{
        setSelectedUser(item);
        setShowUserModal(true);
    }

    return (
        <div className='bg-light' style={{ marginTop: "-16px" }}>
            <h3 className='bold ms-5 mt-3' style={{ color: '#606665' }}>Products</h3>
            <div className='container py-4'>
                <Carousel indicators={false} interval={3000}>
                    {groupedProducts.map((group, idx) => (
                        <Carousel.Item key={idx}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {group.map(item => (
                                    !item.disabled ?
                                    <Card key={item._id} style={{ width: '30%', margin: '10px', height: 'auto' }}>
                                        <Card.Img 
                                            variant="top"
                                            src={`http://localhost:8080${item.image}`}
                                            style={{ objectFit: 'cover', height: '250px' , cursor:'pointer'}}
                                            onClick={()=>viewDetails(item)}
                                        />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                        </Card.Body>
                                    </Card> : 
                                    <Card key={item._id} style={{ width: '30%', margin: '10px', height: 'auto' }}>
                                    <Card.Img 
                                        variant="top"
                                        src={`http://localhost:8080${item.image}`}
                                        style={{ objectFit: 'cover', height: '250px' , cursor:'pointer', opacity:".5"}}
                                    />
                                    <div className="position-absolute top-50 start-50 translate-middle text-white bg-dark px-2 py-1 rounded">
                                    Not Available
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                                ))}

                                
                            </div>
                            <div>
                            <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
                                <Modal.Header closeButton>
                                <Modal.Title>User Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                            {selectedUser ? (
                            <>
                                <img
                                variant="top"
                                src={`http://localhost:8080${selectedUser.image}`}
                                style={{ objectFit: 'cover', height: '50%', width:"100%" , cursor:'pointer'}}
                                />
                                <p><strong>Name:</strong> {selectedUser.name}</p>
                                <p><strong>Description:</strong> {selectedUser.description}</p>
                                <p><strong>Price:</strong>₹{selectedUser.price}</p>
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
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Paintingcarousel;




