import React, {useState, useEffect} from 'react';
import {UserContext} from "../Util/UserContext";
import {useNavigate} from 'react-router-dom'

const StreamScroll = (props) => {
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        // GET DATA FROM SERVER
        await setStreams({
            streams: [{
                username: 'test',
                image: "https://fomantic-ui.com/images/wireframe/white-image.png"
            },
            {
                username: 'bob',
                image: "https://fomantic-ui.com/images/wireframe/white-image.png"
            },
            {
                username: 'joe',
                image: "https://fomantic-ui.com/images/wireframe/white-image.png"
            },
            {
                username: 'bob',
                image: "https://fomantic-ui.com/images/wireframe/white-image.png"
            },
            {
                username: 'joe',
                image: "https://fomantic-ui.com/images/wireframe/white-image.png"
            },
                {
                    username: 'bob',
                    image: "https://fomantic-ui.com/images/wireframe/white-image.png"
                },
                {
                    username: 'joe',
                    image: "https://fomantic-ui.com/images/wireframe/white-image.png"
                },
                {
                    username: 'bob',
                    image: "https://fomantic-ui.com/images/wireframe/white-image.png"
                },
                {
                    username: 'joe',
                    image: "https://fomantic-ui.com/images/wireframe/white-image.png"
                },
                {
                    username: 'bob',
                    image: "https://fomantic-ui.com/images/wireframe/white-image.png"
                },
                {
                    username: 'joe',
                    image: "https://fomantic-ui.com/images/wireframe/white-image.png"
                },


            ]
        })
        setLoading(false)
    }

    return(
        <div className="h-60 flex bg-yellow mt-24">
            <div className='flex flex-row overflow-x-scroll'>
                {!loading ?
                streams.streams.map((element) => {
                        return (
                            <div className="object-contain w-full max-h-48">
                                <img alt={"test"} className="w-full max-h-48" src={element.image} />
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
