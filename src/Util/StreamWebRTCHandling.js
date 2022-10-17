import Constants from "../Constants"

const onConnectRequest = (session, stream, sessionID) => {
    console.log('on Connect hit')
    let rtcPeerConnection;

    const audioTracks = stream.getAudioTracks();
    const videoTracks = stream.getVideoTracks();

    /*
    senderObj:{
        socketID: senders socket ID
    }
    */
    session.on(Constants.WEBRTC_CONNECTION_REQUEST, (senderObj) => {
        console.log('Connect Request received');
        rtcPeerConnection = new RTCPeerConnection(Constants.ICE_SERVERS);
        listenIceCandidate(session, rtcPeerConnection);

        stream.getTracks().forEach(track => rtcPeerConnection.addTrack(track, stream));

        // Send ice candidates to peer that requested stream to their socket ID
        rtcPeerConnection.onicecandidate = (event) => {
            if(event.candidate) {
                console.log('sending candidate: ', event.candidate);

                session.emit(Constants.CANDIDATE, {
                    candidateObj:{
                        type:Constants.CANDIDATE,
                        label:event.candidate.sdpMLineIndex,
                        id: event.candidate.sdpMid,
                        candidate: event.candidate.candidate,

                    },
                    toSocketID: senderObj.socketID

                });
            }
        }

        // Create offer to connection request
        rtcPeerConnection.createOffer()
        .then((sessionDescription) => {
            rtcPeerConnection.setLocalDescription(sessionDescription);
            session.emit(Constants.OFFER, {
                type:Constants.OFFER,
                sdp: sessionDescription,
                toSocketID: senderObj.socketID,
                ownSocketID: sessionID
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })

    session.on(Constants.ANSWER,(sessionDescription) => {
        console.log('Answer received');
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(sessionDescription));
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

export default onConnectRequest
