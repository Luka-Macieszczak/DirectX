import React,{useContext, useEffect, useState, useRef} from "react";
import {UserContext} from "../Util/UserContext";
import ChatBox from "../components/ChatBox";
import {useNavigate, useLocation} from 'react-router-dom'
import Constants from "../Constants";
import requestConnection from "../Util/ViewStreamWebRTCHandling";
// import requestConnection from "../Util/ViewStreamWebRTCHandling";

const ViewStreamScreen = (props) => {

    const navigate = useNavigate();
    const location = useLocation();


    const videoRef = useRef();

    const userContext = useContext(UserContext);
    const [connect, setConnect] = useState(false);

    useEffect(() => {
        userContext.joinStream(videoRef, location.state.streamerUsername);
        return () => {
            console.log('view stream timed out')
        }
    }, [])

    const connectButtonHandler = () => {
        // userContext.connect()
        //requestConnection(userContext)
    }

    const subscriptionButtonHandler = () => {
        userContext.subscribeTo(location.state.streamerUsername)
    }

    return(
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">
            <ChatBox streamerUsername={location.state.streamerUsername} />
            <video controls playsInline muted ref={videoRef} autoPlay={true} className='h-2/3 mx-auto w-1/2' />
            <div className='ml-[25%] border-2 border-zinc-900 rounded-md h-[15%]'>{location.state.description}</div>
            <button onClick={() => subscriptionButtonHandler()} disabled={userContext.user === 'anon'} className='mx-auto w-[10%] font-extrabold text-redDark h-[6%] bg-red border-redDark rounded-sm border-4'>Subscribe</button>
            <button onClick={() => connectButtonHandler()} className="signin-button mx-auto bg-zinc-900">DEBUG CONNECT</button>
            <button onClick={() => navigate('/ProfileScreen')} className="signin-button mx-auto bg-zinc-900">ugly go back</button>
        </div>
    )

}

export default ViewStreamScreen;
