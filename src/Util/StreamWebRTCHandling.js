import Constants from "../Constants"

const onConnectRequest = (context) => {
    let rtcPeerConnection;
    listenIceCandidate();

    context.session.on(Constants.WEBRTC_CONNECTION_REQUEST, (senderObj) => {
        console.log('Connect Request received');
        rtcPeerConnection = new RTCPeerConnection(this.iceServers);

        // Send ice candidates to peer that requested stream to their socket ID
        rtcPeerConnection.onicecandidate = (event) => {
            if(event.candidate) {
                console.log('sending candidate: ', event.candidate);

                context.session.emit(Constants.CANDIDATE, {
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
            this.rtcPeerConnection.setLocalDescription(sessionDescription);
            context.session.emit(Constants.OFFER, {
                type:Constants.OFFER,
                sdp: sessionDescription,
                toSocketID: senderObj.socketID,
                ownSocketID: context.session.io.engine.id
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })

    context.session.on(Constants.ANSWER,(sessionDescription) => {
        console.log('Answer received');
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(sessionDescription));
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

export default onConnectRequest