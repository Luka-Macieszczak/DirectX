import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from "../Util/UserContext";
import {useNavigate} from 'react-router-dom'

const StreamScroll = (props) => {
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(false);
    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        userContext.requestStreams(props.tag)
        setLoading(false)
        console.log(props.tag)
    }, [])

    useEffect(() => {
        userContext.listenStreams(streams, setStreams)
        userContext.listenNewStreams(streams, setStreams)
        console.log(streams)
    }, [streams])



    return(
        <div className="h-60 ml-[16.67%] w-5/6 flex bg-yellow mt-24">
            <div className='flex flex-row overflow-x-scroll'>
                {!loading ?
                streams.map((element) => {
                    console.log('mapping: ', element)
                        return (
                            <div onClick={() => navigate('/ViewStreamScreen', {state:{streamerUsername: element.username}})} className="object-contain w-full max-h-48">
                                <img alt={"test"} className="w-full max-h-48" src='https://fomantic-ui.com/images/wireframe/white-image.png' />
                                <div className='w-36 break-words'>{element.username}</div>
                            </div>
                        );
                    }) : <div></div>
                }
            </div>

        </div>
    )
}

export default StreamScroll;
