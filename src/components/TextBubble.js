import React from 'react';
import { FaFire } from 'react-icons/fa';
const TextBubble = (props) => {
    const textClass = props.isSender ? 'subscription-item' : 'subscription-item'
    return(
        <div className={textClass}>
            <img src={props.uri} className='w-8 h-8 rounded-full'/>
            <div className='text-white h-10 mx-5 my-auto al'>
                {props.text}
            </div>
        </div>
    );
}

export default TextBubble;