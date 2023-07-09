import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function DetailBook() {

  const dispatch = useDispatch();
  const myBook = useSelector((state)=>state.category.singleBook);

  const { id, title, price, category} = useParams();
  useEffect(()=>{
    console.log(myBook);
  }, [myBook])
  return (
    
    <div className='d-flex justify-content-center'>
      
      <img src={myBook && myBook.img} alt="" />
      <h4>{title}</h4>
      <p>{price} <span>{category}</span> </p>
    </div>
  )
}

export default DetailBook