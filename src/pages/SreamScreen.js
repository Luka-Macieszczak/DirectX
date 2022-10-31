import React, {useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../Constants";
import onConnectRequest from "../Util/StreamWebRTCHandling";
import {UserContext} from "../Util/UserContext";


const StreamScreen = () => {
    let navigate = useNavigate()
    const userContext = useContext(UserContext);
    const [streamStarted, setStreamStarted] = useState(false);
    const [gotMedia, setGotMedia] = useState(false);
    const [tags, setTags] = useState(new Set());

    const myVideo = useRef();

    useEffect(() => {
        setTags(new Set([...tags, 'test']))

        navigator.mediaDevices.getDisplayMedia({video: { width: { ideal: 1920, max: 1920 },
        height: { ideal: 1080, max: 1080 } }, audio: true })
        .then((currentStream) => {
            // setStream(currentStream);
            myVideo.current.srcObject = currentStream;
            setGotMedia(true);
        })
        .catch((err) => {console.log(err)});


        return () => {
            // navigator.mediaDevices.getDisplayMedia({video:false})
            console.log('test')
            userContext.endStream();
        }
    }, []);

    useEffect(() => {
        if(gotMedia){
            userContext.onConnect(myVideo.current.srcObject);
            userContext.onJoinRequest();
        }
    }, [userContext.viewers])

    const startStream = () => {
        if(!streamStarted){
            userContext.startStream(tags);
            userContext.onJoinRequest();
            setStreamStarted(true);
            userContext.onConnect(myVideo.current.srcObject);
        }
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
