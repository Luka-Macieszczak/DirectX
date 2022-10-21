import Constants from "../Constants";


const requestConnection = (session, streamerUsername, videoRef, sessionID) => {
    console.log('request hit')

    let rtcPeerConnection;

    session.emit(Constants.WEBRTC_CONNECTION_REQUEST, {streamerUsername:streamerUsername,
    socketID: sessionID})
    /*
    dataObj: {
        sdp: streamers session description
        toSocketID: streamers socket ID
     */
    session.on(Constants.OFFER, (dataObj) => {

        console.log('offer received: ', dataObj);
        rtcPeerConnection = new RTCPeerConnection(Constants.ICE_SERVERS);
        listenIceCandidate(session, rtcPeerConnection);

        rtcPeerConnection.addEventListener('track', (e) => {
            if (videoRef.current.srcObject !== e.streams[0]) {
                videoRef.current.srcObject = e.streams[0];
                console.log('received remote stream');
            }
        })

        // Sends ice candidates to other peer when available
        rtcPeerConnection.onicecandidate = (event) => {
            if(event.candidate) {
                console.log('sending candidate: ', event.candidate);
                session.emit(Constants.CANDIDATE, {
                    candidateObj: {
                    type:Constants.CANDIDATE,
                    label:event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    },
                    toSocketID: dataObj.toSocketID
                });
            }
        };

        // Send answer to offer along with session description
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(dataObj.sdp));
        rtcPeerConnection.createAnswer()
        .then((sessionDescription) => {
            rtcPeerConnection.setLocalDescription(sessionDescription);
            session.emit(Constants.ANSWER, {
                type:Constants.ANSWER,
                sdp: sessionDescription,
                toSocketID: dataObj.toSocketID
            })
        })
        .catch((error) => {
            console.log(error);
        });
    })



}

// Add candidate received from other peer
const listenIceCandidate = (session, rtcPeerConnection) => {

    /*
        candidateObj:{
            type: "candidate"
            label: sdpMLineIndex,
            id: sdpMid,
            candidate: candidate,
        }
    */
    session.on(Constants.CANDIDATE,(candidateObj) => {
        const candidate = new RTCIceCandidate({
            sdpMLineIndex: candidateObj.label,
            candidate: candidateObj.candidate,
            sdpMid: candidateObj.id
        });
        rtcPeerConnection.addIceCandidate(candidate);
    });
}

export default requestConnection;
