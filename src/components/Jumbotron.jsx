import React from 'react';
import Card from 'react-bootstrap/Card';
import "../style/style.css";


function Jumbotron() {
    return (
        
        <Card className="bg-dark text-white pt-2 myJumbotron" >
            <Card.ImgOverlay >
                <Card.Title className='text-warning'>Search your book among the stars</Card.Title>
                
                <Card.Text ></Card.Text>
            </Card.ImgOverlay>
        </Card>
        
    )
}

export default Jumbotron