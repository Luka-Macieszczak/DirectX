import { sha256 } from 'js-sha256';
import Constants from '../Constants';

const handleSignIn = (socket, userObj) => {

    return new Promise((resolve, reject) => {

        // Get randomly generated salt from server
        getSalt(socket, userObj)
            .then((res) => {
                // Send user object to server
                userObj.password = sha256(userObj.password + res)
                console.log(userObj.password)
                socket.emit(Constants.LOGIN_ATTEMPT, userObj)

                socket.on(Constants.LOGIN_COMPLETE, (result) => {
                    if(result != null) resolve(result)
                    else reject(Constants.INCORRECT_PASSWORD_ERR)
                })

            })
            .catch((err) => {
                reject(err)
            })
    })



}

// Request randomly generated salt from server
// Salt is appended to password to avoid the same password to show up as the same text in the database
const getSalt = (socket, userObj) => {
    return new Promise((resolve, reject) => {
        socket.emit(Constants.GET_SALT, {
            username: userObj.username,
        })
        socket.on(Constants.SALT_COMPLETE, (res) => {
            console.log(res)
            if(res != null) resolve(res)
            reject(Constants.USER_NOT_FOUND_ERR)
        })
    })
}

export default handleSignIn
