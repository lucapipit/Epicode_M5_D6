import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./style.css";
//data Json
import SciFi from "../data/scifi.json"
import Horror from "../data/horror.json"
import Romance from "../data/romance.json"
import History from "../data/history.json"
import Fantasy from "../data/fantasy.json"


//REDUX
import { useDispatch } from 'react-redux';
import { getCategory } from '../states/categoryState';


function NavigationBar({theme, darkBtn}) {

    const dispatch = useDispatch()

    return (

        <Navbar expand="lg" className={`${theme?"lightTheme":"darkTheme"} text-warning position-fixed w-100 top-0 border-secondary border-bottom`} style={{zIndex: "9"}}>
            <Container fluid >
                <Navbar.Brand href="#">BestBooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <NavDropdown title="Category" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3" onClick={()=>dispatch(getCategory(Fantasy))}>Fantasy</NavDropdown.Item>
                            <NavDropdown.Item href="#action4" onClick={()=>dispatch(getCategory(Romance))}>Romance</NavDropdown.Item>
                            <NavDropdown.Item href="#action5" onClick={()=>dispatch(getCategory(History))}>History</NavDropdown.Item>
                            <NavDropdown.Item href="#action6" onClick={()=>dispatch(getCategory(SciFi))}>SciFi</NavDropdown.Item>
                            <NavDropdown.Item href="#action7" onClick={()=>dispatch(getCategory(Horror))}>Horror</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button fill onClick={darkBtn}>dark</Button>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavigationBar