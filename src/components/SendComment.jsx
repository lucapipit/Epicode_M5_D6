
import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddStarsRating from './AddStarsRating';
import { useDispatch, useSelector } from 'react-redux';
import { setComment, setElementId } from "../states/commentState";
import { postCommentsFunc, filterComments, getCommentsFunc } from "../states/commentState"


function SendComment() {
    const dispatch = useDispatch();
    const myOwnComment = useSelector((state) => state.bookComments.postComment);
    const myOwnRate = useSelector((state) => state.bookComments.postRating);
    const myOwnElementId = useSelector((state) => state.bookComments.postElementId);
    const myCurrentAsin = useSelector((state) => state.bookComments.currentAsin)

    const myCommentPayload = {
        "comment": myOwnComment,
        "rate": myOwnRate,
        "elementId": myOwnElementId
    }

    return (
        <>
            <hr />
            <AddStarsRating />
            <FloatingLabel className='mt-2 w-100' controlId="floatingTextarea2" label="">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    onChange={(e) => { dispatch(setComment(e.target.value)); }}
                />
            </FloatingLabel>
            <Button className='text-light mt-1' variant="primary"
                onClick={() => {
                    dispatch(postCommentsFunc(myCommentPayload));
                    dispatch(getCommentsFunc());
                    setTimeout(() => { dispatch(filterComments(myCurrentAsin)) }, 2000)
                }}>Send <i class="bi bi-send-fill text-light"></i></Button>
        </>
    )
}

export default SendComment