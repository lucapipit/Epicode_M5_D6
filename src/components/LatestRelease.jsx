import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import SingleBook from './SingleBook';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../states/categoryState';
import {getCommentsFunc} from "../states/commentState"
import {getComments} from "../states/commentState"
//Data Json
import SciFi from "../data/scifi.json"
import Horror from "../data/horror.json"
import Romance from "../data/romance.json"
import History from "../data/history.json"
import Fantasy from "../data/fantasy.json"


function LatestRelease({ theme }) {

    const dispatch = useDispatch();
    const myBooks = useSelector((state) => state.category.category);
    const myComments = useSelector((state) => state.bookComments.comments)
    console.log(myComments);

    useEffect(() => {
        dispatch(getCommentsFunc());
        dispatch(getComments());
        switch (myBooks) {
            case SciFi:
                dispatch(getCategory(SciFi));
                break;
            case Romance:
                console.log("FUNZIONOOOOOOO");
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
    }, [getCategory(), dispatch, myBooks, myComments])

    return (
        <Container fluid className='mt-5 pt-2'>
            <Row className='mt-4 '>
                <Col sm={8} md={8} lg={8}>
                    <Row>
                        {myBooks && myBooks.map((el) => {
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
                <Col sm={4} md={4} lg={4}>
                    {`ciao ${JSON.stringify(myComments)}`}
                </Col>
                
            </Row>
        </Container>
    )
}

export default LatestRelease