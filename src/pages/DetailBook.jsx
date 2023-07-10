import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Comments from '../components/Comments';
import Spinner from 'react-bootstrap/Spinner';
import { nanoid } from 'nanoid';

function DetailBook() {

  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.category.singleBook);
  const myComments = useSelector((state) => state.bookComments.comments);
  const filteredComm = useSelector((state) => state.bookComments.filteredComments);
  const isFirstOpen = useSelector((state) => state.bookComments.isFirstOpen);
  const isLoading = useSelector((state) => state.bookComments.isLoading);


  const { id } = useParams();
  useEffect(() => {
    console.log(myBook);
  }, [myBook])
  return (
    <div className='d-flex justify-content-center container'>
      <Row className='d-flex justify-content-center container mt-3 mb-5'>
        <Card className='mb-5' style={{ maxWidth: '40rem', border: "0px" }}>
          <Card.Img src={myBook[0].img} />
          <Card.Body>
            <Card.Title className='display-6'>{myBook[0].title}</Card.Title>
            <Card.Text>
              <div className='display-2 text-success'>
                {myBook[0].price} $
              </div>
              <div className='mt-3'>
                <span className='display-7 text-light bg-primary p-2 rounded-5'>
                  {myBook[0].category}
                </span>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <hr />
        <h3 className='text-secondary fw-light'>Comments:</h3>
        {filteredComm && filteredComm.map((el) => {
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
    </div>
  )
}

export default DetailBook