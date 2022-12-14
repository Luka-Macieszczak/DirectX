import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import {UserContext} from '../Util/UserContext';
import StreamScroll from "../components/StreamScroll";
import Constants from "../Constants";

let height = window.innerHeight
const MainPage = (props) => {

    let navigate = useNavigate();

    let userContext = useContext(UserContext)

    let imageClass = `ml-[31%] h-[${height/5}px] w-[${height/4}px]`
    const getMainImage = () => {
        let uri = "https://fomantic-ui.com/images/wireframe/white-image.png"
        // Stuff to get the main image (add later)
        return uri
    }


    return (
        <div className='h-full bg-zinc-800'>
            <SideBar />
            <div className={'h-1/3 w-screen'}>

            </div>
            {Constants.TAGS.map((tag) => {
                return(
                    <div>
                        <div className='ml-[20%] text-white text-xl font-extrabold '>{tag}</div>
                        <StreamScroll tag={tag}/>
                        <div className='bg-red w-[77%] mb-5 ml-[20%] h-[4px] rounded-sm'>.</div>
                    </div>
                )
            })}
            {userContext.user !== 'anon' && userContext.user.authorization === 'admin' ? <button onClick={() => navigate('/AdminPage')} className='signin-button ml-[17%]'></button> : <></>}

        </div>
    );
}

export default MainPage;
