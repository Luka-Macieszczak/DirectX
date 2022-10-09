import React,{useContext, useEffect, useState} from "react";
import UserContext from "../Util/UserContext";
import {navigate} from 'react-router-dom'
UserContext

const ViewStreamScreen = () => {

    const userContext = useContext(UserContext);
    const [connect, setConnect] = useState(false)

    const connectButtonHandler = () => {

    }

    return(
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">
            <video playsInline muted ref={myVideo} autoPlay={true} className='h-1/2 w-1/2' />
            <button onClick={() => connectButtonHandler()} className="signin-button mx-auto bg-zinc-900">Start Stream</button>
            <button onClick={() => navigate('/ProfileScreen')} className="signin-button mx-auto bg-zinc-900">ugly go back</button>
        </div>
    )

}

export default ViewStreamScreen;