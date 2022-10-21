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
            // data
            // :
            // "42[\"candidate\",null]"
            // WebSocketClient.js 50
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
                    rtcPeerConnection.setLocalDescription(sessionDescription)
                        .then(() => {
                            session.emit(Constants.OFFER, {
                                type:Constants.OFFER,
                                sdp: sessionDescription,
                                toSocketID: senderObj.socketID,
                                ownSocketID: sessionID
                            });
                        })
                        .catch((err) => {
                            console.log('Offer Error: ', err)
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        /*
        dataObj:{
            sdp: viewers session description,
            toSocketID: viewers socketID
        }
         */
        session.on(Constants.ANSWER,(dataObj) => {
            console.log('Answer received');
            rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(dataObj.sdp));
            // setViewers([...viewers, dataObj.toSocketID]);
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

export default onConnectRequest
