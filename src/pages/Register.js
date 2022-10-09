import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router-dom";
import UserContext from "../Util/UserContext";
import Constsants from "../Constants";

const Register = () => {

    const navigate = useNavigate();

    const userContext = useContext(UserContext);

    userContext.session.on('REGISTER_SUCCESS', (userObj) => {
        userContext.setUser(userObj)
    })

    userContext.session.on('REGISTER_FAILURE', (failure) => {
        setBottomText('failed')
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [bottomText, setBottomText] = useState('') 
    let passwordsMatch = password === confirmPassword;
    let isInputCollected = username !== '' && email !== '' && password !== '' && confirmPassword !== '';

    const addNewUser = () => {
        // create object representing new user with a randomly generated salt
        console.log(String(Math.random()*10000));
        let salt = sha256(String(Math.random()*10000));
        const userObj = {
            username:username,
            email:email,
            password:sha256(password + salt),
            salt: salt
        }
        console.log(userContext.user)
        userContext.session.emit('register attempt', userObj);

        userContext.session.on(Constsants.REGISTER_COMPLETE, (res) => {
            if(res.result != Constsants.DEFAULT_REGISTER_FAILURE){
                userContext.setUser(res.user);
                navigate('/')
            }
            
        })
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePasssword = (event) => {
        setPassword(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangePasswordConfirmation = (event) => {
        setConfirmPassword(event.target.value)
    }

    return (
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">
            <div className="h-[90%] pl-[3%] rounded-3xl w-1/2 mx-auto bg-zinc-900">
                <input placeholder="Username" className="signin-form" onChange={handleChangeUsername} type="text" name="name" />
                <input  placeholder="Email" className="signin-form" onChange={handleChangeEmail} type="text" name="name" />
                <input placeholder="Password" className="signin-form" onChange={handleChangePasssword} type="password" name="name" />
                <input placeholder="Confirm Password" className="signin-form" onChange={handleChangePasswordConfirmation} type="password" name="name" />
                <button onClick={() => addNewUser()} className='p-5 bg-zinc-700 w-[90%] active:bg-indigo-600 text-white rounded-xl mt-36' type="submit" value="Submit" >
                    Submit
                </button>
                
                <div>
                    {bottomText}
                </div>

                <button onClick={() => navigate('/SignIn')} className='p-5 bg-zinc-700 w-[90%] active:bg-indigo-600 text-white rounded-xl mt-6' type="submit" value="Submit" >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Register
