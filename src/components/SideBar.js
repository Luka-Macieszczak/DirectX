import React, {useState, useEffect, useContext} from 'react'
import SubscriptionItem from './SubscriptionItem';
import {UserContext} from '../Util/UserContext';
import { FaUser } from 'react-icons/fa';
import {Link} from 'react-router-dom'


const SideBar = (props) => {


    const [streams, setStreams] = useState([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext.requestStreams('All')
    }, [])


    useEffect(() => {
        userContext.listenStreams(streams, setStreams, 'All')
        userContext.listenNewStreams(streams, setStreams, 'All')
        userContext.listenStreamEnd(streams, setStreams, 'All')
        console.log('Sidebar: ', userContext.user)
    }, [streams])



    const topHeader = () => {
        if(userContext.user !== 'anon') {
            return (
                <Link to='/ProfileScreen'>
                    {userContext.user.profilePic !== '' ?
                    <img className='mr-20 ml-5 mt-5 border h-16 rounded-full border-white' src={userContext.user.profilePic} /> :
                    <SideBarIcon icon={<FaUser color='white' className='mr-20 ml-5 mt-5 border rounded-full border-white' size="28" />} />
                    }
            </Link>
            );
        } else {
            return  (
            <Link to='/SignIn'>
                <SideBarIcon icon={<FaUser color='white' className='mr-20 ml-5 mt-5 border rounded-full border-white' size="28" />} />
            </Link>
            )

        }
    }

    return (
        <div className='sidebar-container'>
            {topHeader()}
            <div className='bg-orange w-5/6 mx-auto my-5 h-[4px] rounded-sm'>.</div>
            {streams.map((stream) => {
                console.log(stream)
                return userContext.user !== 'anon' && userContext.user.subscriptions.includes(stream.username) ?
                    <SubscriptionItem description={stream.description} username={stream.username} uri={'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}/>
                    : <></>
            })}
        </div>
    );
}

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
    <div className="flex flex-row">
      {icon}
      <span className="mt-5 flex-1">
        {text}
      </span>
    </div>
  );

export default SideBar;
