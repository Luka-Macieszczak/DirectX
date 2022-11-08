const Constants = {
    // AWS EC2
    // SERVER_URL: 'http://54.175.139.43:4005',

    //Local host
    SERVER_URL:'http://localhost:4005',
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
    REQUEST_STREAMS:'request streams',
    REQUEST_STREAMS_ACK:'ackknowledge requested streams',
    NEW_STREAM:'new stream',
    STREAM_ENDED: 'stream ended',

    NEW_SUBSCRIPTION:'new subscription',

    TAGS:['All', 'Gaming', 'Educational', 'Music', 'Creative', 'Real Life'],

    WEBRTC_CONNECTION_REQUEST:'Send request for webrtc connection',
    CANDIDATE:'candidate',
    OFFER:'offer',
    ANSWER:'answer',
    MESSAGE:'message',
    ICE_SERVERS: {
        iceServers: [
            {
                urls: "stun:openrelay.metered.ca:80",
            },
            {
                urls: "turn:openrelay.metered.ca:80",
                username: "openrelayproject",
                credential: "openrelayproject",
            },
            {
                urls: "turn:openrelay.metered.ca:443",
                username: "openrelayproject",
                credential: "openrelayproject",
            },
            {
                urls: "turn:openrelay.metered.ca:443?transport=tcp",
                username: "openrelayproject",
                credential: "openrelayproject",
            },
        ]
    },

    CLOUDFLARE_URL: 'https://api.cloudflare.com/client/v4/accounts/3519f19ef060a572ceb4b78750ff7e49/images/v1'


}

export default Constants
