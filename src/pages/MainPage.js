import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
 
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
            <button onClick={() => navigate('/ViewStreamScreen', {state:{streamerUsername: 'Jeff'}})} className='h-20 w-1/2 bg-purple-600'>Join Jeffs Stream</button>
            <div className={'h-2/3 w-screen'}>
                <img className={imageClass} src={getMainImage()}/>
            </div>
            <div>
                
            </div>
        </div>
    );
}
 
export default MainPage;
 