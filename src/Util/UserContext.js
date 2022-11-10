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
    const [user, setUser] = useState('anon');
    const [sessionID, setSessionID] = useState('');
    const [joinedStream, setJoinedStream] = useState(false);
    const [viewers, setViewers] = useState([])

    useEffect(() => {
        // Listen to socket connection, and save the socket id when it arrives
        session.on(Constants.SUCCESSFUL_CONNECTION, (ID) => {
            setSessionID(ID);
            console.log('sokcet id: ', ID);
        })

        // Attempt to log in if user has logged in before
        const tmp = JSON.parse(localStorage.getItem('user'))
        console.log(tmp)
        if(tmp !== null)
            setUser(tmp)
    }, [])

    // Send user object to server, add new user if user doesn't exist
    const registerAttempt = (userObj, navigate) => {
        session.emit(Constants.REGISTER_ATTEMPT, userObj);

        session.on(Constants.REGISTER_COMPLETE, (res) => {
            if(res.result !== Constants.DEFAULT_REGISTER_FAILURE){
                setUser(res.user);
                localStorage.setItem('user', JSON.stringify(res.user))
                navigate('/')
            }

        })
    }

    const loginAttempt = async (userObj) => {
        const [err, user] = await catchEm(handleSignIn(session, userObj));
        if(!err) {
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        }
        return err
    }

    // Tell server that this user is starting to stream
    const startStream = (tags, description) => {
        console.log('tags: ', tags)
        session.emit(Constants.START_STREAM, {socketID: sessionID,
            username: user.username, tags: tags, description: description});
    }

    const onJoinRequest = () => {
        session.on(Constants.JOIN_STREAM_REQUEST, () => {

        })
    }

    // Tell server that this user is done streaming
    const endStream = (tags) => {
        session.emit(Constants.END_STREAM, {
            socketID: sessionID,
            username: user.username,
            tags: tags
        });
    }

    // Wait for viewers to connect
    // src is the source of the streamers screen recording
    const onConnect = (src) => {
        onConnectRequest(session, src, sessionID, setViewers, viewers);
    }

    // Connect to streamer by webRTC, set video ref to ref of track
    const connect = (videoRef, streamerUsername) => {
        requestConnection(session, streamerUsername, videoRef, sessionID)
    }

    // Join stream of param streamerUsername and set videoRef to the ref of the rtcPeerConnection track
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

    /*
    messageObj:{
        username: username of sender,
        message: message being sent,
        profilePic: profile pic of sender
    }
     */
    const handleReceiveChat = (messages, setMessages) => {
        session.on(Constants.MESSAGE, (messageObj) => {
            setMessages([...messages, {username: messageObj.username, profilePic: messageObj.profilePic, message: messageObj.message, isSender: false}])
            console.log('Message received: ', messageObj)
        })
    }

    const sendChat = (message, streamerUsername) => {
        session.emit(Constants.MESSAGE, {
            streamerUsername: streamerUsername,
            username: user.username,
            message: message,
            profilePic: user.profilePic
        })
    }

    const requestStreams = (tag) => {
        session.emit(Constants.REQUEST_STREAMS, ({tag: tag}))
    }

    /*
    dataObj: {
        streams: list of streams
    }
     */
    const listenStreams = (streams, setStreams, tag) => {
        session.on(Constants.REQUEST_STREAMS_ACK, (dataObj) => {
            console.log('streams received: ' , ...dataObj.streams)
            if(dataObj.streams.length > 0 && dataObj.streams[0].tag === tag)
                setStreams([...streams, ...dataObj.streams])
        })
    }

    /*
    dataObj: {
        stream: new stream that came in,
        tags: tags of new stream
    }
     */
    const listenNewStreams = (streams, setStreams, tag) => {
        session.on(Constants.NEW_STREAM, (dataObj) => {
            console.log('new stream received: ' , dataObj.stream)
            if(tag in dataObj.tags && !streams.includes(dataObj.stream))
                setStreams([...streams, dataObj.stream])
        })
    }
    /*
    dataObj:{
        username: username of streamer
    }
     */
    const listenStreamEnd = (streams, setStreams, tag) => {
        session.on(Constants.STREAM_ENDED, (dataObj) => {
            console.log('revmoving stream: ', streams)
            setStreams((current) => {
                let copy = []
                for(let i=0;i<current.length;i++) {
                    if(current[i].username !== dataObj.username)
                        copy.push(current[i])
                }
                return copy
            })
        })
    }

    const subscribeTo = (streamerUsername) => {
        session.emit(Constants.NEW_SUBSCRIPTION, ({streamerUsername: streamerUsername, username: user}))
    }

    const logout = () => {
        localStorage.clear()
        setUser('anon')
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
            requestStreams,
            listenStreams,
            listenNewStreams,
            listenStreamEnd,
            subscribeTo,
            logout,
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
