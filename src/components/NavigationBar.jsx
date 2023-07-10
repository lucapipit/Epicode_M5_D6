import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../style/style.css";
import { setTheme, filterComments } from "../states/commentState";
import { searchFilter} from "../states/categoryState"
import { useSelector } from 'react-redux';
//data Json
import SciFi from "../data/scifi.json"
import Horror from "../data/horror.json"
import Romance from "../data/romance.json"
import History from "../data/history.json"
import Fantasy from "../data/fantasy.json"


//REDUX
import { useDispatch } from 'react-redux';
import { getCategory } from '../states/categoryState';


function NavigationBar({theme}) {

    const dispatch = useDispatch()
    const themeMode = useSelector((state) => state.bookComments.isLightMode);
    return (

        <Navbar expand="lg" className={`${theme?"lightTheme":"darkTheme"} myNavbar text-warning position-fixed w-100 top-0 border-secondary border-bottom`} style={{zIndex: "9"}}>
            <Container fluid >
                <Navbar.Brand href="#">BestBooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavDropdown className='myNavbarDropdown' title="Category" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3" onClick={()=>{dispatch(getCategory(Fantasy)); dispatch(filterComments());}}>Fantasy</NavDropdown.Item>
                            <NavDropdown.Item href="#action4" onClick={()=>{dispatch(getCategory(Romance)); dispatch(filterComments());}}>Romance</NavDropdown.Item>
                            <NavDropdown.Item href="#action5" onClick={()=>{dispatch(getCategory(History)); dispatch(filterComments());}}>History</NavDropdown.Item>
                            <NavDropdown.Item href="#action6" onClick={()=>{dispatch(getCategory(SciFi)); dispatch(filterComments());}}>SciFi</NavDropdown.Item>
                            <NavDropdown.Item href="#action7" onClick={()=>{dispatch(getCategory(Horror)); dispatch(filterComments());}}>Horror</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <a className=' me-3 rounded-5 themeIcon' fill onClick={()=>{dispatch(setTheme())}}>{themeMode?<i class="bi bi-moon-fill"></i>:<i class="bi bi-brightness-high-fill"></i>}</a>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e)=>dispatch(searchFilter(e.target.value))}
                        />
                    
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavigationBar