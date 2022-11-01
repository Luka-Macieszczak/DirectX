import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import StreamScroll from "../components/StreamScroll";

let height = window.innerHeight
const MainPage = (props) => {

    let navigate = useNavigate();

    let imageClass = `ml-[31%] h-[${height/5}px] w-[${height/4}px]`
    const getMainImage = () => {
        let uri = "https://fomantic-ui.com/images/wireframe/white-image.png"
        // Stuff to get the main image (add later)
        return uri
    }


    return (
        <div className='h-screen bg-zinc-800'>
            <SideBar />
            <div className={'h-1/3 w-screen'}>

            </div>
            <StreamScroll tag='test'/>
        </div>
    );
}

export default MainPage;
