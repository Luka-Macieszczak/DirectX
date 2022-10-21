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

    /* Expect data to come in the form of:
        {
            username: x,
            message: y
        }
    */
    useEffect(() => {
        userContext.handleReceiveChat(messages, setMessages)
    }, [messages])

    const sendMessage = () => {
        userContext.sendChat(text, props.streamerUsername)
    }

    const handleChangeText = (event) => {
        setText(event.target.value)
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            sendMessage()
            setMessages([...messages, {username: userContext.user.username, message:text, isSender:true}])
        }

    }


    return (
        <div className='chat-container'>
            <div className='bg-zinc-700 w-5/6 mx-auto my-5 h-[4px] rounded-sm'>.</div>
            {messages.map((item) => {
                return (<TextBubble text={item.message} uri={'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}/>)
            })}
            <input onKeyDown={handleKeyDown} onChange={handleChangeText} placeholder='    Send Message' className='bg-zinc-700 w-2/6 mx-auto h-[6%] rounded-md top-[90%] fixed'></input>
        </div>
    );
}



export default ChatBox;
