import React from 'react';
import { FaFire } from 'react-icons/fa';
const TextBubble = (props) => {
    const textClass = props.isSender ? 'text-item' : 'text-item'
    return(
        <div className={textClass}>
            <div className='h-[100%] float-left'>
                <img src={props.uri} className='aspect-square float-left h-[100%] rounded-full '/>
            </div>
            <div className='text-white w-[95%] break-words ml-[2%] h-10 my-auto al'>
                {`${props.username}: ${props.text}`}
            </div>
        </div>
    );
}

export default TextBubble;
