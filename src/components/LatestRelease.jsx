import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import SingleBook from './SingleBook';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, searchFilter } from '../states/categoryState';
import { getCommentsFunc, starRateAverage } from "../states/commentState"
import Comments from './Comments';
import SendComment from './SendComment';
import Spinner from 'react-bootstrap/Spinner';
import "../style/style.css"
//Data Json
import SciFi from "../data/scifi.json"
import Horror from "../data/horror.json"
import Romance from "../data/romance.json"
import History from "../data/history.json"
import Fantasy from "../data/fantasy.json"
import ViewStarsRating from './ViewStarsRating';


function LatestRelease({ theme }) {

    const dispatch = useDispatch();
    const myBooks = useSelector((state) => state.category.category);
    const myFilteredBooks = useSelector((state) => state.category.filteredSearchBooks);
    const myComments = useSelector((state) => state.bookComments.comments);
    const filteredComm = useSelector((state) => state.bookComments.filteredComments);
    const isFirstOpen = useSelector((state) => state.bookComments.isFirstOpen);
    const rateBookAverage = useSelector((state) => state.bookComments.rateAverage);
    const selectedBookName = useSelector((state) => state.bookComments.selectedBookName)


    useEffect(() => {
        dispatch(searchFilter())
        dispatch(getCommentsFunc());
        setTimeout(() => {
            dispatch(starRateAverage())
        }, 2000);

        console.log(myComments);
        switch (myBooks) {
            case SciFi:
                dispatch(getCategory(SciFi));
                break;
            case Romance:
                dispatch(getCategory(Romance));
                break;
            case Fantasy:
                dispatch(getCategory(Fantasy));
                break;
            case Horror:
                dispatch(getCategory(Horror));
                break;
            case History:
                dispatch(getCategory(History));
                break;
            default:
                dispatch(getCategory(History));

        }
    }, [myBooks])


    return (
        <Container fluid className='mt-2'>
            <Row className='mt-4 '>
                <Col sm={8} >
                    <Row className='d-flex justify-content-center'>
                        {myFilteredBooks && myFilteredBooks.map((el) => {
                            return <SingleBook
                                key={nanoid()}
                                asin={el.asin}
                                img={el.img}
                                title={el.title}
                                price={el.price}
                                category={el.category}
                                theme={theme}
                            />
                        })}
                    </Row>
                </Col>
                <Col className='px-4' sm={4} >
                    <div className='stickyComments' >
                        <h4 className='fw-light'>Comments of</h4>
                        <div className={`fw-light text-light bg-${isFirstOpen ? "primary" : "success"} p-2 rounded-2 my-2`}>{isFirstOpen ? "All Books" : selectedBookName}</div>
                        {rateBookAverage?<p>({!isFirstOpen?filteredComm.length:myComments.length}) comments <ViewStarsRating rate={rateBookAverage} /> 	• <i>rate average</i> </p>:(isFirstOpen?<Spinner animation="border" variant="warning" />:"non ci sono commenti!")}
                        <hr />
                    </div>
                    <Row>
                        {(isFirstOpen ? myComments : filteredComm).map((el) => {
                            return <Comments
                                key={nanoid()}
                                elementId={el.elementId}
                                _id={el._id}
                                author={el.author}
                                rate={el.rate}
                                comment={el.comment}
                                updatedAt={el.updatedAt}
                            />
                        })}
                    </Row>
                    <SendComment />
                </Col>

            </Row>
        </Container>
    )
}

export default LatestRelease