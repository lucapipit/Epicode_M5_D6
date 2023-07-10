import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterComments, starRateAverage, setElementId, setCurrentAsin } from "../states/commentState";
import { selectSingleBook } from "../states/categoryState";
import "../style/style.css"


function SingleBook({ asin, img, title, price, category }) {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.bookComments.isLightMode)


    return (
        <Card className="p-0 m-2 myCard" style={{ maxWidth: "18rem" }}>
            <div style={{ height: "450px" }}>
                <Card.Img variant="top" src={img} style={{ height: "100%" }} />
            </div>
            <Card.Body className={theme ? "lightTheme" : "darkTheme"}>
                <Card.Title>{title}</Card.Title>
                <Card.Text>$ {price}</Card.Text>
                <Card.Text>{category}<span className='ms-1'>{/* - {asin} */}</span></Card.Text>
                <a className='text-primary'
                    onClick={() => {
                        dispatch(filterComments(asin));
                        dispatch(setCurrentAsin(asin));
                        dispatch(starRateAverage(title));
                        dispatch(setElementId(asin))
                    }} style={{ textDecoration: "none", cursor: "pointer" }}> <i class="bi bi-chat-fill text-primary"> </i>
                    comments
                </a>
                <Link to={`bookDetail/${asin}`} style={{ textDecoration: "none" }}>
                    <div className='text-success'
                        onClick={() => {
                            dispatch(selectSingleBook(asin));
                            dispatch(filterComments(asin));
                        }} style={{ cursor: "pointer" }}><i class="bi bi-eye-fill text-success"></i> detail</div>
                </Link>

            </Card.Body>
        </Card>
    )
}

export default SingleBook