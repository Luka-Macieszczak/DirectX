const Constants = {
    SERVER_URL: 'http://localhost:4005',
    SUCCESSFUL_CONNECTION:'connection success',

    REGISTER_COMPLETE:'REGISTER_COMPLETE',
    DEFAULT_REGISTER_FAILURE:'This user already exists',

    GET_SALT:'get salt',
    SALT_COMPLETE:'salt complete',
    LOGIN_ATTEMPT:'login attempt',
    REGISTER_ATTEMPT:'register attempt',
    LOGIN_COMPLETE:'login complete',

    USER_NOT_FOUND_ERR:'user not found',
    INCORRECT_PASSWORD_ERR:'incorrect password',

    START_STREAM:'start stream',
    END_STREAM:'end stream',
    JOIN_STREAM_REQUEST:'join stream request',
    JOIN_STREAM_RESULT:'join stream result',

    WEBRTC_CONNECTION_REQUEST:'Send request for webrtc connection',
    CANDIDATE:'candidate',
    OFFER:'offer',
    ANSWER:'answer',
    MESSAGE:'message',
    ICE_SERVERS: {
        'iceServer': [
            {'urls': 'stun:stun.services.mozilla.com'},
            {'urls': 'stun:stun.l.google.com:19302'}
        ]
    },


}

export default Constants
