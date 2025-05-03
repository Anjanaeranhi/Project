import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';



const Craftcarousel = () => {
    return (
        <div className='bg-light' style={{ marginTop:"-16px"}}>
            
            <h3 className='bold ms-5 mt-3' style={{color:'#606665'}}>Crafts</h3>
           
<div className='container'
    style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    }}
>
    <Carousel
        style={{
            width: '95%',
            maxWidth: '1500px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            margin: 'auto',
        }}
        interval={3000}
        indicators={false}
    >
        <Carousel.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: "0px" }}>
                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://www.silkrute.com/images/detailed/1440/419OtLAbcVL.jpg"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Handmade Pottery Vase</Card.Title>
                        <Card.Text>
                            A beautifully crafted pottery vase, perfect for home decor and flower arrangements.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://handmade.gifts/selleruploads/gifts/4064.jpg"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Macramé Wall Hanging</Card.Title>
                        <Card.Text>
                            This intricate macramé wall hanging adds a boho-chic vibe to any space.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://terrestra.com/cdn/shop/products/large-cocobolo-jewelry-box1.jpg"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Wooden Jewelry Box</Card.Title>
                        <Card.Text>
                            A handcrafted wooden jewelry box with intricate carvings, ideal for safekeeping treasures.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Carousel.Item>

        <Carousel.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: "0px" }}>
                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/superdry/W9310069A1JL/0/nUZ-14ewXd-410409131001_1.jpg"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Knitted Wool Scarf</Card.Title>
                        <Card.Text>
                            Cozy and colorful, this knitted wool scarf is perfect for chilly days.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2nlAZd6u5WJsHCCy2hCUKUOvLycxMHoocaA&s"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Decorative Candles</Card.Title>
                        <Card.Text>
                            Hand-poured decorative candles with unique designs and delightful fragrances.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://i.ytimg.com/vi/rh_q7v8tQxI/maxresdefault.jpg"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Origami Paper Art</Card.Title>
                        <Card.Text>
                            Exquisite origami creations showcasing the beauty of folded paper art.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Carousel.Item>
    </Carousel>
</div>

        </div>
    );
}

export default Craftcarousel;
