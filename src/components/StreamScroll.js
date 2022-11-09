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
        userContext.listenStreams(streams, setStreams, props.tag)

        setLoading(false)
        console.log(props.tag)
    }, [])

    useEffect(() => {
        userContext.listenNewStreams(streams, setStreams, props.tag)
        userContext.listenStreamEnd(streams, setStreams, props.tag)
        console.log(streams)
    }, [streams])



    return(
        <div className="scroll-container">
            <div className='flex flex-row overflow-x-scroll'>
                {!loading ?
                streams.map((element) => {
                    console.log('mapping: ', element)
                        return (
                            <div onClick={() => navigate('/ViewStreamScreen', {state:{streamerUsername: element.username, description: element.description}})} className="scroll-item">
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
