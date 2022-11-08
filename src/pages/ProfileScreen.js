import React, {useContext, useState, useEffect, useRef} from "react";
import SubscriptionItem from "../components/SubscriptionItem";
import {UserContext} from "../Util/UserContext";
import Constants from '../Constants'
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
    const userContext = useContext(UserContext)
    const inputFile = useRef()
    let navigate = useNavigate();

    useEffect(() => {
        if(userContext.user === 'anon')
            navigate('/')
    }, [])

    const logoutHandler = () => {
        navigate('/')
        userContext.logout()
    }

    const inputHandler = () => {
        inputFile.current.click();
    }

    const profilePicHandler = async (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj)
            return

        console.log('fileObj is', fileObj.type);

        e.target.value = null;

        const date = new Date().getTime()
        const body = new FormData();
        body.append(`${userContext.user.username}${date}`, fileObj);
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer pyNOVkkr5db_CALxRcm8HFUdDyh5CTF46av_2Q1q",
                "Content-Type": "multipart/form-data",
                multipart: {output: "file"},
                "Access-Control-Allow-Origin":"*",
            },

            body: body,
        }

        try {
            const res = await fetch(Constants.CLOUDFLARE_URL, requestOptions)
            const resObj = await res.json()
            console.log(resObj.result.variants[0])
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="w-screen bg-zinc-700 pt-[5%]">
            <input type='file' onChange={profilePicHandler} accept="image/*" id='file' ref={inputFile} style={{display: 'none'}} />
                <img onClick={() => inputHandler()} className='w-1/3 mx-auto hover:opacity-30' src={userContext.user.profilePic}/>
            <div className="h-1/2">
                <button onClick={() => navigate('/')} className="signin-button mx-auto bg-zinc-900">ugly go back</button>
                <button onClick={() => navigate('/StreamScreen')} className="signin-button mx-auto bg-zinc-900">Stream</button>
                <button onClick={() => logoutHandler()} className="signin-button mx-auto bg-zinc-900">ugly log out</button>
            </div>
            <div className="mt-10 rounded-md border-zinc-900 border-2 mx-auto w-11/12">
                {userContext.user !== 'anon' ? userContext.user.subscriptions.map((element) => {
                    return <SubscriptionItem username={element} disabled={true}/>
                }): <></>}
            </div>
        </div>
    )
}

export default ProfileScreen
