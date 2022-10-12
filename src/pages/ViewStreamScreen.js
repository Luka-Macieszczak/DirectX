import React,{useContext, useEffect, useState, useRef} from "react";
import UserContext from "../Util/UserContext";
import ChatBox from "../components/ChatBox";
import {useNavigate, useLocation} from 'react-router-dom'
import Constants from "../Constants";
// import requestConnection from "../Util/ViewStreamWebRTCHandling";

const ViewStreamScreen = (props) => {

    const navigate = useNavigate();
    const location = useLocation();


    const myVideo = useRef();

    const userContext = useContext(UserContext);
    const [connect, setConnect] = useState(false);

    useEffect(() => {
        userContext.session.emit(Constants.JOIN_STREAM_REQUEST, {
            streamerUsername: location.state.streamerUsername,
            username: userContext.user.username,
            socketId: userContext.session.io.engine.id
        })
    }, [])

    const connectButtonHandler = () => {
        //requestConnection(userContext)
    }

    return(
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">
            <ChatBox streamerUsername={location.state.streamerUsername} />
            <video playsInline muted ref={myVideo} autoPlay={true} className='h-1/2 w-1/2' />
            <button onClick={() => connectButtonHandler()} className="signin-button mx-auto bg-zinc-900">DEBUG CONNECT</button>
            <button onClick={() => navigate('/ProfileScreen')} className="signin-button mx-auto bg-zinc-900">ugly go back</button>
        </div>
    )

}

export default ViewStreamScreen;