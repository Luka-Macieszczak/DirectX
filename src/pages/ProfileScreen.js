import React, {useContext, useState, useEffect} from "react";
import SubscriptionItem from "../components/SubscriptionItem";
import {UserContext} from "../Util/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
    const userContext = useContext(UserContext)
    let navigate = useNavigate();



    return (
        <div className="w-screen bg-zinc-700 pt-[5%]">
            <div className="h-1/2">
                <button onClick={() => navigate('/')} className="signin-button mx-auto bg-zinc-900">ugly go back</button>
                <button onClick={() => navigate('/StreamScreen')} className="signin-button mx-auto bg-zinc-900">Stream</button>
            </div>
            <div className="mt-10 rounded-md border-zinc-900 border-2 mx-auto w-11/12">
                {userContext.user.subscriptions.map((element) => {
                    return <SubscriptionItem username={element} disabled={true}/>
                })}
            </div>
        </div>
    )
}

export default ProfileScreen
