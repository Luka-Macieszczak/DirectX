import Constants from "../Constants";


const requestConnection = (context, streamerUsername) => {
    let rtcPeerConnection;
    listenIceCandidate();

    context.session.emit(Constants.WEBRTC_CONNECTION_REQUEST, {streamerUsername:streamerUsername, 
    socketID: context.session.io.engine.id})

    context.session.on(Constants.OFFER, (dataObj) => {

        console.log('offer received');
        rtcPeerConnection = new RTCPeerConnection(iceServers);

        // Sends ice candidates to other peer when available
        rtcPeerConnection.onicecandidate = (event) => {
            if(event.candidate) {
                console.log('sending candidate: ', event.candidate);
                context.session.emit(Constants.CANDIDATE, {
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
            context.session.emit(Config.ANSWER, {
                type:Config.ANSWER,
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
const listenIceCandidate = (context, rtcPeerConnection) => {
    
    context.session.on(Config.CANDIDATE,(event) => {
        const candidate = new RTCIceCandidate({
            sdpMLineIndex: event.label,
            candidate: event.candidate,
            sdpMid: event.id
        });
        rtcPeerConnection.addIceCandidate(candidate);
    });
}

export default requestConnection;