import React from 'react';
import Card from 'react-bootstrap/Card';
import ViewStarsRating from './ViewStarsRating';
import { useDispatch } from 'react-redux';
import { isEditing, getCommentsFunc, displayMyComment, setCurrentId } from '../states/commentState';

function Comments({ _id, author, rate, comment, elementId, updatedAt }) {
  const dispatch = useDispatch();
  return (
    <Card className='my-1 shadow bg-transparent'>
      <Card.Body>
        <Card.Text>
          <ViewStarsRating rate={rate} />
          <span className='ms-4' onClick={() => {
            dispatch(isEditing(true));
            dispatch(getCommentsFunc(elementId));
            setTimeout(() => { dispatch(displayMyComment(_id)) }, 2000);
            dispatch(setCurrentId(_id))
          }} style={{ cursor: "pointer" }}><i class="bi bi-pencil-fill text-info"></i></span>
          <span className='ms-3'> <i>{updatedAt.slice(0, 10)}</i> </span>
        </Card.Text>
        <Card.Text><span className='text-primary'>{author}</span> - <i>{comment}</i></Card.Text>
      </Card.Body>
    </Card >
  )
}

export default Comments