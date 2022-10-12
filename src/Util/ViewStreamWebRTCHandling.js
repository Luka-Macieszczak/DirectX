import Constsants from "../Constants";
import UserContext from "./UserContext";


const requestConnection = (context) => {
    listenIceCandidate()

    context.session.emit(Constsants.SEND_WEBRTC_CONNECTION_REQUEST, {socketID: userContext.session.io.engine.id})



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

const onIceCandidate = (event) => {
    if(event.candidate) {
        console.log('sending candidate: ', event.candidate);
        console.log('this object : ', this, ' this roomname: ', this.roomName);

        this.socket.emit(Config.CANDIDATE, {
            type:Config.CANDIDATE,
            label:event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
            room: this.roomName
        });
    }
};

    

    //When ready, send offer with session description
    //Create datachannel associated with connection
    this.socket.on(Config.READY,() => {
        
        this.roomInfo[this.roomName].rtcPeerConnection.onicecandidate 
        

        this.roomInfo[this.roomName].rtcPeerConnection.createOffer()
            .then((sessionDescription) => {
                this.roomInfo[this.roomName].rtcPeerConnection.setLocalDescription(sessionDescription);
                this.socket.emit(Config.OFFER, {
                    type:Config.OFFER,
                    sdp: sessionDescription,
                    room: this.roomName
                });
            })
            .catch((error) => {
                console.log(error);
            });
    });
    //After receiving offer, send back answer with session description
    //Join datachannel associated with connection
    this.socket.on(Config.OFFER,(event) => {
        console.log('offer received');
        this.roomInfo[this.roomName].rtcPeerConnection = new RTCPeerConnection(this.iceServers);
        //Sends ice candidates to other peer
        this.roomInfo[this.roomName].rtcPeerConnection.onicecandidate = (event) => {
            if(event.candidate) {
                console.log('sending candidate: ', event.candidate);
                this.socket.emit(Config.CANDIDATE, {
                    type:Config.CANDIDATE,
                    label:event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    room: this.roomName
                });
            }
        };

        this.roomInfo[this.roomName].rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));

        this.roomInfo[this.roomName].rtcPeerConnection.createAnswer()
            .then((sessionDescription) => {
                this.roomInfo[this.roomName].rtcPeerConnection.setLocalDescription(sessionDescription);
                this.socket.emit(Config.ANSWER, {
                    type:Config.ANSWER,
                    sdp: sessionDescription,
                    room: this.roomName
                })
            })
            .catch((error) => {
                console.log(error);
            });


    this.socket.on(Config.ANSWER,(event) => {
        console.log('Answer received');
        this.roomInfo[this.roomName].rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
    })
    }

export default requestConnection