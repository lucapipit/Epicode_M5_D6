import React from 'react';
import "../style/style.css"

function ViewStarsRating({rate}) {
    return (
        <>
            {
                [...Array(5)].map((el, index)=>{
                    if(rate >= (index+1)){
                        return <i class="bi bi-star-fill"></i>
                    }else{
                        return <i class="bi bi-star"></i>
                    }
                })
            }
            <span className='ms-2'>
                {`${rate}/5`}
            </span>
            
        </>
    )
}

export default ViewStarsRating