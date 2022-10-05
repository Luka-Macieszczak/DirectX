import React, {useContext, useState, useEffect} from "react";
import SubscriptionItem from "../components/SubscriptionItem";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {

    let navigate = useNavigate();

    const [subscriptions, setSubscriptions] = useState([]);

    const populateSubscriptions = async () => {
        let tmp = []
            for(let i = 0;i<10;i++) {
                tmp.push(<SubscriptionItem />)
            }
        setSubscriptions([...subscriptions, ...tmp])
    }

    useEffect(() => {
        populateSubscriptions();
    }, [])

    return (
        <div className="w-screen bg-zinc-700 pt-[5%]">
            <div className="h-1/2">
                <button onClick={() => navigate('/')} className="signin-button mx-auto bg-zinc-900">ugly go back</button>
                <button onClick={() => navigate('/StreamScreen')} className="signin-button mx-auto bg-zinc-900">Stream</button>
            </div>
            <div className="mt-10 rounded-md border-zinc-900 border-2 mx-auto w-11/12">
                {subscriptions.map((element) => {
                    return element
                })}
            </div>
        </div>
    )
}

export default ProfileScreen