import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../Util/UserContext';
import TextBubble from './TextBubble';
import { FaUser, FaPoo } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import Constsants from '../Constants';


const ChatBox = (props) => {

    const userContext = useContext(UserContext);

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [muted, setMuted] = useState({})

    /* Expect data to come in the form of:
        {
            username: x,
            message: y
        }
    */
    useEffect(() => {
        userContext.handleReceiveChat(messages, setMessages, muted)
    }, [messages, muted])

    const sendMessage = () => {
        userContext.sendChat(text, props.streamerUsername)
    }

    const handleChangeText = (event) => {
        setText(event.target.value)
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            if(text[0] !== '/') {
                sendMessage()
            } else if (text.slice(0, 5).toUpperCase() === '/MUTE') {
                setMuted((current) => {
                    console.log('test')
                    let copy = {...current}
                    copy[text.slice(6, text.length)] = text.slice(6, text.length)
                    return copy
                })
            }

            console.log(muted)
            setMessages([...messages, {username: userContext.user.username, profilePic:userContext.user.profilePic, message:text, isSender:true}])
        }
    }




    return (
        <div className='chat-container'>
            <div className='bg-zinc-700 w-5/6 mx-auto my-5 h-[4px] rounded-sm'>.</div>
            {messages.map((item) => {
                return (<TextBubble username={item.username} text={item.message} uri={item.profilePic}/>)
            })}
            <input onKeyDown={handleKeyDown} onChange={handleChangeText} placeholder='    Send Message' className='bg-zinc-700 w-2/6 mx-auto h-[6%] rounded-md top-[90%] fixed'></input>
        </div>
    );
}



export default ChatBox;
