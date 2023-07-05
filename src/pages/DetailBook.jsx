import React from 'react';
import { useParams } from 'react-router-dom';

function DetailBook() {

  const { id } = useParams();
  return (
    <div>DetailBook - {id}</div>
  )
}

export default DetailBook