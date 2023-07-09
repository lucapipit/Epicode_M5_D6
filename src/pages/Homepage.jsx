import React, { useEffect, useState } from 'react';
import NavigationBar from "../components/NavigationBar"
import LatestRelease from '../components/LatestRelease';
import Jumbotron from '../components/Jumbotron';
import EditCommentModal from '../components/EditCommentModal';
import { useDispatch, useSelector } from 'react-redux';
import "../style/style.css"


function Homepage() {
    
    const dispatch = useDispatch();
    const isOnChanging = useSelector((state) =>  state.bookComments.isOnChanging);
    const theme = useSelector((state) => state.bookComments.isLightMode)

    
    return (
        <>
            <body className={theme ? "lightTheme" : "darkTheme"}>
                <NavigationBar theme={theme}/>
                {isOnChanging?<EditCommentModal />:null}
                <Jumbotron />
                <LatestRelease/>
            </body> 
        </>
    )
}

export default Homepage