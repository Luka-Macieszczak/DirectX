const Constants = {
    SERVER_URL: 'http://localhost:4005',

    DEFAULT_REGISTER_FAILURE:'This user already exists',
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


    MESSAGE:'message'
}

export default Constants