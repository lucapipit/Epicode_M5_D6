import React from 'react';
import { Container } from 'react-bootstrap';
import img from '../assets/notFound.jpg';
import Col from 'react-bootstrap';


function ErrorPage() {
  return (
    <Container>
      <div className='d-flex justify-content-center'>
          <img src={img} alt="img" className='w-50' />
      </div>
    </Container>
  )
}

export default ErrorPage