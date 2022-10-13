import React, {useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../Constants";
import UserContext from "../Util/UserContext";


const StreamScreen = () => {
    let navigate = useNavigate()
    const userContext = useContext(UserContext);
    const [streamStarted, setStreamStarted] = useState(false);

    const myVideo = useRef();

    useEffect(() => {
        navigator.mediaDevices.getDisplayMedia({video: { width: { ideal: 1920, max: 1920 },
        height: { ideal: 1080, max: 1080 } } })
            .then((currentStream) => {
            // setStream(currentStream);
    
            myVideo.current.srcObject = currentStream;
            });
        userContext.session.on(Constants.JOIN_STREAM_REQUEST, () => {
            
        })
        return () => {
            // navigator.mediaDevices.getDisplayMedia({video:false})
            console.log('test')
            const streamObj = {
                socketID: userContext.session.io.engine.id, 
                username:userContext.user.username,
                tags:[]
            }
            userContext.session.emit(Constants.END_STREAM, streamObj);
        }
    }, []);

    const startStream = () => {
        userContext.session.emit(Constants.START_STREAM, {socketID: userContext.session.io.engine.id, 
        username:userContext.user.username});
        setStreamStarted(true);
    }

    return (
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">
            <video playsInline muted ref={myVideo} autoPlay={true} className='h-1/2 w-1/2' />
            <button onClick={() => startStream()} className="signin-button mx-auto bg-zinc-900">Start Stream</button>
            <button onClick={() => navigate('/ProfileScreen')} className="signin-button mx-auto bg-zinc-900">ugly go back</button>

        </div>
    )
}

export default StreamScreen