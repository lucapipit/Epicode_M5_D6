import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function SingleBook({ asin, img, title, price, category, theme }) {
    return (
        <Card className={`p-0 m-2`} style={{ width: '18rem' }}>
            <div style={{ height: "450px" }}>
                <Card.Img variant="top" src={img} style={{ height: "100%" }} />
            </div>
            <Card.Body className={theme ? "lightTheme" : "darkTheme"}>
                <Card.Title>{title}</Card.Title>
                <Card.Text>$ {price}</Card.Text>
                <Card.Text>{category}<span className='ms-1'>- {asin}</span></Card.Text>
                <a href="#" className='text-info' style={{ textDecoration: "none" }}>(5) comments</a>
                <Link to={`bookDetail/${asin}`}>
                    <a href="#" className='text-warning ms-3'> detail</a>
                </Link>

            </Card.Body>
        </Card>
    )
}

export default SingleBook