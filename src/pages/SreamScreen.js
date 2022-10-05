import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Util/UserContext";

const StreamScreen = () => {
    const userContext = useContext(UserContext);
    return (
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">

        </div>
    )
}

export default StreamScreen