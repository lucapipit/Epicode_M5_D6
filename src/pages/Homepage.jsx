import React, { useEffect, useState } from 'react';
import NavigationBar from "../components/NavigationBar"
import LatestRelease from '../components/LatestRelease';
import { useDispatch } from 'react-redux';

function Homepage() {
    const [theme, setTheme] = useState(true)
    const darkBtn = () => { setTheme(!theme); /* document.body.className = theme?"lightTheme":"darkTheme" */ };

    //REDUX - Dispatch
    const dispatch = useDispatch();

    useEffect(() => {

    }, [])
    
    return (
        <>
            <body className={theme ? "lightTheme" : "darkThemeBody"}>
                <NavigationBar theme={theme} darkBtn={darkBtn} />
                <LatestRelease theme={theme} />
            </body>
        </>
    )
}

export default Homepage