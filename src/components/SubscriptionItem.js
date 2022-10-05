import React from 'react';
import { FaFire } from 'react-icons/fa';
const SubscriptionItem = (props) => {
    return(
        <div className='subscription-item'>
            <img src={props.uri} className='w-8 h-8 rounded-full'/>
            <div className='text-white h-10 mx-5 my-auto al'>
                Test
            </div>
        </div>
    );
}

export default SubscriptionItem;