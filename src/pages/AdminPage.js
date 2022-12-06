import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../Constants";
import {UserContext} from "../Util/UserContext";

const AdminPage = () => {
    let navigate = useNavigate()

    const [users, setUsers] = useState([])

    let userContext = useContext(UserContext)

    const removeUserHandler = (user) => {
        userContext.removeUser(user, setUsers)
    }

    useEffect(() => {
        userContext.getAllUsers(setUsers)
    }, [])

    return(
        <div className="h-screen w-screen bg-zinc-700 pt-[5%]">
            <div className="w-[90%] pl-[3%] rounded-3xl w-1/2 mx-auto bg-zinc-900 h-[90%] overflow-y-scroll">
                {users.map((user) => {
                    console.log(user.username)
                    return  (<button onClick={() => removeUserHandler(user)} className=' top-[70%] ml-[16%] mb-3 p-5 bg-zinc-700 w-[50%] active:bg-red text-white rounded-xl mt-6' type="submit" value="Submit" >
                        {user.username}
                    </button>)
                })}

                <button onClick={() => navigate('/')} className='fixed top-[9%] ml-[-58%] p-5 bg-purple-500 w-[5%] active:bg-red text-white rounded-xl mt-6' type="submit" value="Submit" >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default AdminPage;
