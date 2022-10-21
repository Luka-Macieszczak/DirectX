import React, {useState, useEffect} from "react";
import { io } from 'socket.io-client';
import Constants from "../Constants";
import {catchEm} from "./catchEm";
import onConnectRequest from "./StreamWebRTCHandling";
import requestConnection from "./ViewStreamWebRTCHandling";
import handleSignIn from "../Util/HandleSignin";

const UserContext = React.createContext()

const session  = io.connect(Constants.SERVER_URL, {jsonp: false});

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [sessionID, setSessionID] = useState('');
    const [joinedStream, setJoinedStream] = useState(false);
    const [viewers, setViewers] = useState([])

    useEffect(() => {

        session.on(Constants.SUCCESSFUL_CONNECTION, (ID) => {
            setSessionID(ID);
            console.log('sokcet id: ', ID);
        })
    }, [])

    const registerAttempt = (userObj, navigate) => {
        session.emit(Constants.REGISTER_ATTEMPT, userObj);

        session.on(Constants.REGISTER_COMPLETE, (res) => {
            if(res.result !== Constants.DEFAULT_REGISTER_FAILURE){
                setUser(res.user);
                navigate('/')
            }

        })
    }

    const loginAttempt = async (userObj, navigate) => {
        const [err, user] = await catchEm(handleSignIn(session, userObj));
        if(!err) setUser(user)
        return err
    }

    const startStream = () => {
        session.emit(Constants.START_STREAM, {socketID: sessionID,
            username: user.username});
    }

    const onJoinRequest = () => {
        session.on(Constants.JOIN_STREAM_REQUEST, () => {

        })
    }

    const endStream = (tags) => {
        session.emit(Constants.END_STREAM, {
            socketID: sessionID,
            username: user.username,
            tags: tags
        });
    }
    const onConnect = (src) => {
        onConnectRequest(session, src, sessionID);
    }

    const connect = (videoRef, streamerUsername) => {
        requestConnection(session, streamerUsername, videoRef, sessionID)
    }

    const joinStream = (videoRef, streamerUsername) => {
        if(!joinedStream){
            setJoinedStream(true);
            session.emit(Constants.JOIN_STREAM_REQUEST, {
                streamerUsername: streamerUsername,
                username: user.username,
                socketId: sessionID
            })

            /*
            dataObj:{
                didSucceed: boolean,
            }
            */
            session.on(Constants.JOIN_STREAM_RESULT, (dataObj) => {
                console.log('Join stream result: ', dataObj)
                if(dataObj.didSucceed){
                    requestConnection(session, streamerUsername, videoRef, sessionID)
                }
            })
        }

    }

    const handleReceiveChat = (messages, setMessages) => {
        session.on(Constants.MESSAGE, (messageObj) => {
            setMessages([...messages, {username: messageObj.username, message: messageObj.message, isSender: false}])
            console.log('Message received: ', messageObj)
        })
    }

    const sendChat = (message, streamerUsername) => {
        session.emit(Constants.MESSAGE, {
            streamerUsername: streamerUsername,
            username: user.username,
            message: message
        })
    }


    return (
        <UserContext.Provider value={{
            user,
            setUser,
            sessionID,
            setSessionID,
            registerAttempt,
            loginAttempt,
            startStream,
            onJoinRequest,
            endStream,
            onConnect,
            joinStream,
            handleReceiveChat,
            sendChat,
            connect,
            joinedStream,
            setJoinedStream,
            viewers,
            setViewers
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {ContextProvider, UserContext}
