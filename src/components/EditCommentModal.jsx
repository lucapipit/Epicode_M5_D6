import React, { useEffect, useState } from 'react';
import AddStarsRating from "./AddStarsRating";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../style/style.css";
import { setComment, isEditing, putCommentsFunc, deleteCommentsFunc, getCommentsFunc, filterComments } from '../states/commentState';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

function EditCommentModal() {
    const dispatch = useDispatch();
    const [value, setValue] = useState("[]");
    const [myRate, setMyRate] = useState(0);
    const comment = useSelector((state) => state.bookComments.comments);
    const myCurrentAsin = useSelector((state) => state.bookComments.currentAsin)
    //payload creation for the PUT call
    const myPutComment = useSelector((state) => state.bookComments.postComment);
    const myPutRate = useSelector((state) => state.bookComments.postRating);
    const myPutId = useSelector((state) => state.bookComments.putCurrentId);


    const myPutPayload = {
        "_id": myPutId,
        "comment": myPutComment,
        "rate": myPutRate
    }

    useEffect(() => {
        if (comment.length === 0) {
            setValue("Non è presente alcun commento!")
        } else if (comment.length > 1) {
            setValue("loading...")
        } else {
            setValue(comment[0].comment);
            setMyRate(comment[0].rate)
        }
    }, [comment])
    return (
        <div className='d-flex justify-content-center pt-5'>
            <div className='editCommentModal shadow bg-light rounded-5 p-4 border border-secondary'>
                {myRate === 0 ? <Spinner animation="border" variant="warning" /> : <AddStarsRating myRate={myRate} />}
                <FloatingLabel className='mt-2 w-100' controlId="floatingTextarea2" label="">
                    <Form.Control
                        as="textarea"
                        style={{ height: '100px' }}
                        value={value}
                        onChange={(e) => { dispatch(setComment(e.target.value)); setValue(e.target.value) }}
                    />
                </FloatingLabel>
                <div className='mt-2 d-flex justify-content-between'>
                    <div>
                        <Button className='text-light me-2' variant="primary"
                            onClick={() => {
                                console.log(myPutId);
                                dispatch(putCommentsFunc(myPutPayload));
                                dispatch(isEditing(false));
                                dispatch(getCommentsFunc());
                                setTimeout(() => { dispatch(filterComments(myCurrentAsin)) }, 2000)
                            }}>Update <i class="bi bi-journal-arrow-up text-light"></i></Button>

                        <Button className='text-light' variant="danger" onClick={() => {
                            dispatch(deleteCommentsFunc(myPutId));
                            dispatch(isEditing(false));
                            dispatch(getCommentsFunc());
                            setTimeout(() => { dispatch(filterComments(myCurrentAsin)) }, 2000)
                        }}>Delete <i class="bi bi-trash-fill text-light"></i></Button>
                    </div>
                    <div>
                        <Button className='text-dark' variant="light" onClick={() => dispatch(isEditing(false))}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCommentModal