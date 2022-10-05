import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import { sha256 } from "js-sha256";
import UserContext from "../Util/UserContext";
import { catchEm } from "../Util/catchEm";
import { useNavigate } from 'react-router-dom'
import handleSignin from '../Util/HandleSignin'

const SignIn = () => {

    const userContext = useContext(UserContext);

    let navigate = useNavigate();

    userContext.session.on('REGISTER_SUCCESS', (userObj) => {
        userContext.setUser(userObj)
    })

    userContext.session.on('REGISTER_FAILURE', (failure) => {
        setBottomText('failed')
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [bottomText, setBottomText] = useState('') 
    let isInputCollected = username !== '' && password !== '';

    const addNewUser = async () => {
        // create object representing new user with a randomly generated salt
        if(isInputCollected){
            const userObj = {username: username, password: password}
            const [err, user] = await catchEm(handleSignin(userContext.session, userObj));
            if(err){
                setBottomText(err)
            } else {
                userContext.setUser(user)
                navigate('/')
            }
            console.log(userContext.user)
        } else{
            setBottomText('Please enter correct fields')
        }
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePasssword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">
            <div className="h-[90%] pl-[3%] rounded-3xl w-1/2 mx-auto bg-zinc-900">
                <input placeholder="Username" className="signin-form" onChange={handleChangeUsername} type="text" name="name" />
                <input placeholder="Password" className="signin-form" onChange={handleChangePasssword} type="password" name="name" />
                <button onClick={() => addNewUser()} className='p-5 bg-zinc-700 w-[90%] active:bg-indigo-600 text-white rounded-xl mt-36' type="submit" value="Submit" >
                    Submit
                </button>
                <div className='text-red-600 mx-auto'>
                    {bottomText}
                </div>
                <button onClick={() => navigate('/Register')} className='p-5 bg-zinc-700 w-[90%] active:bg-indigo-600 text-white rounded-xl mt-6' type="submit" value="Submit" >
                    Register
                </button>
            </div>
        </div>
    );
}

export default SignIn