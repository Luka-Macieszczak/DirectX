import React, {useState, useEffect, useContext} from 'react'
import SubscriptionItem from './SubscriptionItem';
import UserContext from '../Util/UserContext';
import { FaUser, FaPoo } from 'react-icons/fa';
import {Link} from 'react-router-dom'

 
const SideBar = (props) => {

    const [subscriptions, setSubscriptions] = useState([]);
    const userContext = useContext(UserContext);


    useEffect(() => {
        populateSubscriptions()
    }, [])

    const populateSubscriptions = async () => {
        console.log(userContext.user)
        if(userContext.user != null){
            let tmp = []
            for(let val of userContext.user.following) {
                tmp.push(val)
            }
            setSubscriptions([...subscriptions, ...tmp])
        } else {
            let tmp = []
            for(let i =0; i < 10; i++) {
                tmp.push('blah')
            }
            setSubscriptions([...subscriptions, ...tmp])
        }
        
        
    }

    const topHeader = () => {
        if(userContext.user != null) {
            return (
                <Link to='/ProfileScreen'>
                    {userContext.user.profilePic != '' ? 
                    <img src={userContext.user.profilePic} /> :
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
            <div className='bg-zinc-800 w-5/6 mx-auto my-5 h-[4px] rounded-sm'>.</div>
            {subscriptions.map((item) => {
                return (<SubscriptionItem uri={'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}/>)
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
 