import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRating } from "../states/commentState"

function AddStarsRating({myRate}) {
    const dispatch = useDispatch();
    const [rate, setRate] = useState(myRate===0?0:myRate);
    const [isSelected, setIsSelected] = useState(false)

    useEffect(()=>{
        dispatch(setRating(rate))
    }, [rate, myRate])

    return (
        <>
            {
                [...Array(5)].map((el, index) => {
                    return <i
                        class={`bi bi-star${rate > index ? "-fill" : ""} postRatingStars`}
                        onMouseEnter={() => {if (!isSelected) {setRate(index + 1)}}}
                        onMouseLeave={() => {if(!isSelected){!isSelected ? setRate(0) : setRate(index + 1)}}}
                        onClick={() => { setRate(index + 1); setIsSelected(true)}}></i>
                })
            }
        </>
    )
}

export default AddStarsRating