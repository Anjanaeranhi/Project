import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

const Cllothcarousel = () => {
    return (
        <div className='bg-light' style={{ marginTop:"-16px"}}>
            <h3 className='bold ms-5 mt-3' style={{color:'#606665'}}>Clothings</h3>
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
                        src="data:image/jpeg;base64,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"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Classic Denim Jacket</Card.Title>
                        <Card.Text>
                            A timeless denim jacket, perfect for casual outings and versatile layering.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSisoce3yJn-WagjpBjcWWrFIGZM25WNfSMkysl_deOJE_4PLfwQAzgTWneF1_SW9tQNJjfzUR6QimArt38CZEcWG3GpypXoyKh6ki0xBhjoYuYOQrTl34E"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Floral Summer Dress</Card.Title>
                        <Card.Text>
                            Light and breezy, this floral dress is ideal for summer days and warm evenings.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqCtXLBbQguz8STcd2TxTQ6Y0eb3bUvKG2jqUmXL815BIJBHMC3St1001um8ImH1Z-eyI&usqp=CAU"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Elegant Evening Gown</Card.Title>
                        <Card.Text>
                            Make a statement with this stunning evening gown, designed for formal occasions.
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
                        src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSn3SG_TfyKPRqKWTc4y8EMXu_3DJ8j4FjJFcD3UjhBHYsvh5AnjM-VV3Fc2O-ijocsJb6DNMWv-DST5RPoWQy2QunP1gjhRN42_TexYJRMq1MAruB3E9SJ"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Casual Hoodie</Card.Title>
                        <Card.Text>
                            Stay cozy with this comfortable hoodie, ideal for relaxed weekends.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://images.stockcake.com/public/6/d/9/6d9d0aad-42d5-45d1-8025-241655cc61a4_large/stylish-businessman-posing-stockcake.jpg"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Tailored Suit</Card.Title>
                        <Card.Text>
                            A perfectly tailored suit that exudes professionalism and sophistication.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '30%', margin: '10px', height: 'auto' }}>
                    <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-mr3IaickQjv13F719jQcZzr3s-Igw1O3w&s"
                        style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <Card.Body>
                        <Card.Title>Sporty Tracksuit</Card.Title>
                        <Card.Text>
                            Stylish and functional, this tracksuit is perfect for both workouts and leisure.
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

export default Cllothcarousel;
