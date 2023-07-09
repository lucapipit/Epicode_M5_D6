import React, { useEffect, useState } from 'react';
import NavigationBar from "../components/NavigationBar"
import LatestRelease from '../components/LatestRelease';
import Jumbotron from '../components/Jumbotron';
import EditCommentModal from '../components/EditCommentModal';
import { useDispatch, useSelector } from 'react-redux';
import "../style/style.css"


function Homepage() {
    const [theme, setTheme] = useState(true)
    const darkBtn = () => { setTheme(!theme); /* document.body.className = theme?"lightTheme":"darkTheme" */ };

    //REDUX - Dispatch
    const dispatch = useDispatch();
    const isOnChanging = useSelector((state) =>  state.bookComments.isOnChanging);


    useEffect(() => {

    }, [])
    
    return (
        <>
            <body className={theme ? "lightTheme" : "darkThemeBody"}>
                <NavigationBar theme={theme} darkBtn={darkBtn} />
                {isOnChanging?<EditCommentModal />:null}
                <Jumbotron />
                <LatestRelease theme={theme} />
            </body> 
        </>
    )
}

export default Homepage