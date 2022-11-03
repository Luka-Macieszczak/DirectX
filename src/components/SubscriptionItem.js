import React from 'react';
import { FaFire } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

const SubscriptionItem = (props) => {
    const navigate = useNavigate()
    return(
        <button disabled={props.disabled != null && props.disabled} onClick={() => navigate('/ViewStreamScreen', {state:{streamerUsername: props.username, description: props.description}})} className='subscription-item'>
            <img src={props.uri} className='w-8 h-8 rounded-full'/>
            <div className='text-white h-10 mx-5 my-auto al'>
                {props.username}
            </div>
        </button>
    );
}

export default SubscriptionItem;
