import React, { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { websocketInitConnection, websocketSend } from './ducks';
import { getUsersSelector, getUserIDSelector } from './selectors';
import { Video } from './Video';
import { useUserMedia } from './useUserMedia';

let myPeerConnection: any = null; // RTCPeerConnection
let transceiver = null; // RTCRtpTransceiver

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};

export const Game = (): JSX.Element => {
  const [otherMediaStream, setOtherMediaStream] = useState(false);
  const dispatch = useDispatch();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  const users = useSelector(getUsersSelector);
  const userID = useSelector(getUserIDSelector);
  console.log('userID', userID);

  async function createPeerConnection() {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ],
    });

    console.log('myPeerConnection', myPeerConnection);

    myPeerConnection.onicecandidate = handleICECandidateEvent;
    myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = () => null;
    myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
    myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
    myPeerConnection.ontrack = handleTrackEvent;
  }

  function handleICECandidateEvent(event) {
    console.log('handleICECandidateEvent');
    console.log('event', event);
    if (event.candidate) {
      dispatch(
        websocketSend({
          type: 'new-ice-candidate',
          userID,
          candidate: event.candidate,
        })
      );
    }
  }

  function handleICEConnectionStateChangeEvent(event) {
    console.log('handleICEConnectionStateChangeEvent');
    switch (myPeerConnection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        // closeVideoCall();
        break;
    }
  }

  function handleSignalingStateChangeEvent(event) {
    console.log('handleSignalingStateChangeEvent');
    switch (myPeerConnection.signalingState) {
      case 'closed':
        // closeVideoCall();
        break;
    }
  }

  async function handleNegotiationNeededEvent() {
    console.log('handleNegotiationNeededEvent');
    try {
      const offer = await myPeerConnection.createOffer();

      if (myPeerConnection.signalingState != 'stable') {
        return;
      }
      await myPeerConnection.setLocalDescription(offer);

      console.log('localDescription', myPeerConnection.localDescription);

      dispatch(
        websocketSend({
          type: 'video-offer',
          userID,
          sdp: myPeerConnection.localDescription,
        })
      );
    } catch (err) {
      console.log('err', err);
    }
  }

  function handleTrackEvent(event) {
    console.log('handleTrackEvent');
    console.log('------------event-----------------', event);
    console.log('event', event);
    console.log('event.streams[0]', event.streams[0]);
    setOtherMediaStream(event.streams[0]);
  }

  useEffectOnce(() => {
    dispatch(websocketInitConnection());
    createPeerConnection();
  });

  useEffect(() => {
    createPeerConnection();
  }, [userID]);

  if (mediaStream) {
    mediaStream
      .getTracks()
      .forEach(
        (transceiver = (track) =>
          myPeerConnection.addTransceiver(track, { streams: [mediaStream] }))
      );
  }
  console.log('users', users);
  return (
    <div>
      <div>hello world</div>
      <div>
        <button
          onClick={() =>
            dispatch(
              websocketSend({
                type: 'text',
                userID,
                info: 'Sended Message',
              })
            )
          }
        >
          Send
        </button>

        <button
          onClick={() =>
            dispatch(
              websocketSend({
                type: 'get-users',
              })
            )
          }
        >
          Get users
        </button>

        <button
          onClick={() => {
            /*mediaStream.getTracks().forEach(
              (transceiver = (track) =>
                myPeerConnection.addTransceiver(track, {
                  streams: [mediaStream],
                }))
            );*/

            const localDescription = myPeerConnection.localDescription;
            console.log(localDescription);
            users.forEach((user) => {
              console.log(user.sdp);
              if (localDescription.sdp !== user.sdp.sdp) {
                const desc = new RTCSessionDescription(user.sdp);
                myPeerConnection.setRemoteDescription(desc);
              }
            });
          }}
        >
          Call
        </button>
      </div>
      <div>
        {users.map(({ userID }) => (
          <div key={userID}>{userID}</div>
        ))}
      </div>
      <div>
        {otherMediaStream && <Video mediaStream={otherMediaStream} />}
        {mediaStream && <Video mediaStream={mediaStream} />}
      </div>
    </div>
  );
};
