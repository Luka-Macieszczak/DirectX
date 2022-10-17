import Constants from "../Constants";


const requestConnection = (session, streamerUsername, videoRef, sessionID,) => {
    console.log('request hit')

    let rtcPeerConnection;

    session.emit(Constants.WEBRTC_CONNECTION_REQUEST, {streamerUsername:streamerUsername,
    socketID: sessionID})

    session.on(Constants.OFFER, (dataObj) => {

        console.log('offer received');
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
                    type:Constants.CANDIDATE,
                    label:event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    toSocketID: dataObj.toSocketID
                });
            }
        };

        // Send answer to offer along with session description
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(dataObj.sessionDescription));
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

    session.on(Constants.CANDIDATE,(event) => {
        const candidate = new RTCIceCandidate({
            sdpMLineIndex: event.label,
            candidate: event.candidate,
            sdpMid: event.id
        });
        rtcPeerConnection.addIceCandidate(candidate);
    });
}

export default requestConnection;
