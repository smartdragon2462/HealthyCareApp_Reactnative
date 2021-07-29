// import React, { useEffect, useState, useRef } from 'react';
// import { TouchableOpacity, View } from 'react-native';
// import { RTCView } from 'react-native-webrtc';
// import styles from './styles';
// import FastImage from 'react-native-fast-image';

// const Image = FastImage;

// const assets = {
//   phoneCall: require('../assets/phone-call.png'),
//   endCall: require('../assets/end-call.png'),
//   microphone: require('../assets/microphone.png'),
//   speaker: require('../assets/speaker.png'),
// };

// const VideoChatView = (props) => {
//   const {
//     remoteStreams,
//     localStream,
//     isComInitiated,
//     peerConnectionStarted,
//     isMuted,
//     isSpeaker,
//     toggleSpeaker,
//     toggleMute,
//     endCall,
//     onAcceptCall,
//   } = props;

//   const newRemoteStreams = remoteStreams && Object.keys(remoteStreams);
//   const [currentRemoteStreams, setCurrentRemoteStreams] = useState([]);
//   const [currentLocalStream, setCurrentLocalStream] = useState(localStream);
//   const [largeFillingRtcContainer, setLargeFillingRtcContainer] = useState(
//     styles.largeFillingRtcContainer,
//   );
//   const [
//     singleSmallLocalRtcContainer,
//     setSingleSmallLocalRtcContainer,
//   ] = useState([styles.singleSmallLocalRtcContainer]);
//   const [isLocalLargeContainer, setIsLocalLargeContainer] = useState(false);
//   const isNotGroupStream = newRemoteStreams.length === 1;

//   useEffect(() => {
//     const generatedRemoteStreams =
//       newRemoteStreams &&
//       newRemoteStreams.map((stream) => {
//         return remoteStreams[stream];
//       });
//     setCurrentRemoteStreams(generatedRemoteStreams);
//     setCurrentLocalStream(localStream);
//   }, [remoteStreams]);

//   const switchStreams = (stream, index) => {
//     const oldLocalStream = currentLocalStream;
//     const oldRemoteStreams = [...currentRemoteStreams];
//     const oldLargeFillingRtcContainer = largeFillingRtcContainer;
//     const oldSingleSmallLocalRtcContainer = singleSmallLocalRtcContainer;

//     if (isNotGroupStream) {
//       setLargeFillingRtcContainer(oldSingleSmallLocalRtcContainer);
//       setSingleSmallLocalRtcContainer(oldLargeFillingRtcContainer);
//       setIsLocalLargeContainer(
//         (isLocalLargeContainer) => !isLocalLargeContainer,
//       );
//     } else {
//       oldRemoteStreams[index] = oldLocalStream;
//       setCurrentRemoteStreams(oldRemoteStreams);
//       setCurrentLocalStream(stream);
//     }
//   };

// /////////////////////////////////////////////////////////////////////
//   onModalShow = async () => {
//     if (!this.state.localStream) {
//       const localStream = await this.getLocalStream();
//       this.setState({ localStream, });
//     }
//   };

// /////////////////////////////////////////////////////////////////////
//   getLocalStream = async () => {
//     const isFront = true;

//     if (!this.devices) {
//       const devices = await mediaDevices.enumerateDevices();

//       if (devices) {
//         this.devices = devices;
//       }
//     }

//     const facing = isFront ? 'front' : 'environment';
//     const videoSourceId = this.devices &&  this.devices.find(
//         (device) => device.kind === 'videoinput' && device.facing === facing,
//       );
//     const facingMode = isFront ? 'user' : 'environment';
//     let constraints = {
//       audio: true,
//       video: {
//         mandatory: {
//           minWidth: 500,
//           minHeight: 300,
//           width: WIDTH,
//           height: HEIGHT,
//           minFrameRate: 30,
//         },
//         facingMode,
//         optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
//       },
//     };
//     if (this.props.chatType === 'audio') {
//       constraints = {
//         audio: true,
//         video: false,
//       };
//     }

//     const newLocalStream = await mediaDevices.getUserMedia(constraints);

//     return newLocalStream;
//   };


//   /////////////////////////////////////////////////////////////////////
//   const switchCamera = () => {
//     this.state.localStream
//       .getVideoTracks()
//       .forEach((track) => track._switchCamera());
//   };

//   /////////////////////////////////////////////////////////////////////
//   const toggleSpeaker = () => {
//     this.setState(
//       (prevState) => ({
//         isSpeaker: !prevState.isSpeaker,
//       }),
//       () => {
//         if (this.state.isSpeaker) {
//           InCallManager.setForceSpeakerphoneOn(true);
//         } else {
//           InCallManager.setForceSpeakerphoneOn(null);
//         }
//       },
//     );
//   };

//   /////////////////////////////////////////////////////////////////////
//   const toggleMute = () => {
//     const { remoteStreams, localStream } = this.state;
//     if (!remoteStreams) return;
//     localStream.getAudioTracks().forEach((track) => {
//       track.enabled = !track.enabled;
//     });
//     this.setState((prevState) => ({
//       isMuted: !prevState.isMuted,
//     }));
//   };

// /////////////////////////////////////////////////////////////////////
// const endCall = (shouldSignal = false) => {
//   if (this.modalVisible || shouldSignal) {
//     if (this.props.audioVideoChatReceivers.length === 1) {
//       this.signalReceivers('cancel', this.props.chatType);
//       this.mediaChatTracker.cleanChatRoomParticipants(this.props.channelId);
//     }

//     this.onEndCall();
//   }
// };

// /////////////////////////////////////////////////////////////////////
// const onAcceptCall = async () => {
//   clearTimeout(this.endCallTimeout);
//   this.callAccepted = true;
//   this.subscribeCallConnectionData();
//   const { user, channelId } = this.props;
//   const userId = user.id || user.userID;
//   this.setState(
//     {
//       isComInitiated: true,
//       peerConnectionStarted: true,
//       initialCallState: 'Connecting',
//     },
//     async () => {
//       InCallManager.stopRingtone();
//       if (this.props.chatType === 'video') {
//         InCallManager.start({ media: 'audio/video' });
//       } else {
//         InCallManager.start({ media: 'audio' });
//       }

//       this.mediaChatTracker.addChatRoomParticipants({
//         channelId,
//         userId,
//       });

//       this.subscribeChatRoomParticipants();
//     },
//   );
// };

// /////////////////////////////////////////////////////////////////////

//   const renderRemoteStreams = (remoteStream, index) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={() => {
//           if (!isNotGroupStream) {
//             switchStreams(remoteStream, index);
//           }

//           if (isLocalLargeContainer) {
//             switchStreams(remoteStream, index);
//           }
//         }}
//         key={index + ''}
//         style={
//           isNotGroupStream
//             ? largeFillingRtcContainer
//             : styles.groupSmallLocalRtcContainer
//         }>
//         <RTCView
//           style={styles.rtcStream}
//           objectFit={'cover'}
//           zOrder={isLocalLargeContainer ? 2 : 1}
//           streamURL={remoteStream.toURL()}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <>
//       <View style={styles.control}>
//         <TouchableOpacity
//           onPress={toggleSpeaker}
//           style={[
//             styles.controlIconContainer,
//             isSpeaker && { backgroundColor: '#8c8d8f' },
//           ]}>
//           <Image
//             source={assets.speaker}
//             style={[styles.imageIcon, isSpeaker && { tintColor: '#fff' }]}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={toggleMute}
//           style={[
//             styles.controlIconContainer,
//             isMuted && { backgroundColor: '#8c8d8f' },
//           ]}>
//           <Image
//             source={assets.microphone}
//             style={[styles.imageIcon, isMuted && { tintColor: '#fff' }]}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.controlIconContainer, { backgroundColor: '#fc2e50' }]}
//           onPress={endCall}>
//           <Image source={assets.endCall} style={styles.imageIcon} />
//         </TouchableOpacity>
//         {!isComInitiated && (
//           <TouchableOpacity
//             style={[
//               styles.controlIconContainer,
//               { backgroundColor: '#6abd6e' },
//             ]}
//             onPress={onAcceptCall}>
//             <Image source={assets.phoneCall} style={styles.imageIcon} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {localStream && (
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => {
//             if (!isLocalLargeContainer && isNotGroupStream) {
//               switchStreams();
//             }
//           }}
//           style={
//             isNotGroupStream
//               ? singleSmallLocalRtcContainer
//               : [largeFillingRtcContainer]
//           }>
//           <RTCView
//             style={styles.rtcStream}
//             mirror={true}
//             objectFit={'cover'}
//             zOrder={isLocalLargeContainer ? 1 : 2}
//             streamURL={currentLocalStream.toURL()}
//           />
//         </TouchableOpacity>
//       )}

//       {remoteStreams && (
//         <View
//           style={
//             isNotGroupStream
//               ? {
//                   position: 'relative',
//                   width: '100%',
//                   height: '100%',
//                   zIndex: 0,
//                 }
//               : styles.remoteStreamsContainer
//           }>
//           {currentRemoteStreams.map((remoteStream, index) =>
//             renderRemoteStreams(remoteStream, index),
//           )}
//         </View>
//       )}
//     </>
//   );
// };

// export default VideoChatView;








import * as React from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Icon } from 'native-base';
import InCallManager from 'react-native-incall-manager';
import * as Animatable from 'react-native-animatable';
// import styles from '../../assets/styles';
import { backgroundColor } from '../../../components/Calendars/style';
import { Photo1_img, Photo2_img } from '../../../assets/images'
import { Workup_icon, SwitchCamera_icon, Notes_icon, CameraOff_icon, MicOff_icon } from '../../../assets/icons'

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';
import { Manager } from 'socket.io-client';
// import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const { width, height } = Dimensions.get('window');
const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};
const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  0.5: {
    opacity: 1,
    scale: 0.3,
  },
  1: {
    opacity: 0,
    scale: 0,
  },
};

class VideoChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreSetting: false,
      modalVisible: false,
      localStream: null,
      remoteStreams: null,
      isComInitiated: true,
      peerConnectionStarted: false,
      isMuted: false,
      isSpeaker: false,
      hoursCounter: '00',
      minutesCounter: '00',
      secondsCounter: '00',
      initialCallState: 'Calling',
      // appState: AppState.currentState,
      // isForeground: AppState.currentState === 'active',
    };

    this.noAnswerTimer = null
  }

  //////////////////////////////////////////////////////////////////////////////////////
  onTimerStart = () => {
    this.timerInterval = setInterval(() => {
      const { hoursCounter, minutesCounter, secondsCounter } = this.state;
      let sec = (Number(secondsCounter) + 1).toString(),
        min = minutesCounter,
        hr = hoursCounter;

      if (Number(secondsCounter) === 59) {
        min = (Number(minutesCounter) + 1).toString();
        sec = '00';
      }

      if (Number(minutesCounter) === 59 && Number(secondsCounter) === 59) {
        hr = (Number(hoursCounter) + 1).toString();
        min = '00';
        sec = '00';
      }

      this.setState({
        minutesCounter: min.length === 1 ? '0' + min : min,
        secondsCounter: sec.length === 1 ? '0' + sec : sec,
        hoursCounter: hr.length === 1 ? '0' + hr : hr,
      });
    }, 1000);
  };

  //////////////////////////////////////////////////////////////////////////////////////
  handlCallStop = () => {
    InCallManager.stopRingtone();
    InCallManager.stop();
  }

  //////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // InCallManager.startRingtone('_DEFAULT_');
    // InCallManager.start();
    InCallManager.start({ media: 'audio/video', ringback: '_DTMF_' });

    const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
    const pc = new RTCPeerConnection(configuration);

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 640,
          height: 480,
          frameRate: 30,
          facingMode: (isFront ? "user" : "environment"),
          deviceId: videoSourceId
        }
      })
        .then(stream => {
          // Got stream!
          console.log("'Streaming OK", stream)
          this.setState({ localStream: stream.toURL() });
          pc.addStream(stream);
        })
        .catch(error => {
          // Log error
          console.log("Opps, we are getting error", error.message);
          throw error;
        });
    });

    //----------------------------------------------------------------------------
    pc.createOffer().then(desc => {
      pc.setLocalDescription(desc).then(() => {
        // Send pc.localDescription to peer
        console.log("setLocalDescription", desc)
      });
    });

    //----------------------------------------------------------------------------
    pc.onicecandidate = (evnt) => {
      // send event.candidate to peer
      console.log("onicecandidate", evnt)
      // evnt.candidate ? this.mediaChatTracker.addCallConnectionData({ ...messageData,  message: { ice: JSON.parse(JSON.stringify(evnt.candidate)) },}): console.log('Sent All Ice');
    };

    //----------------------------------------------------------------------------
    pc.onaddstream = (evnt) => {
      if (this.callAccepted) {
        this.setState({ remoteStreams: { ...this.state.remoteStreams, [id]: evnt.stream, }, },
          async () => {
            clearTimeout(this.noAnswerTimer);
            if (this.props.chatType === 'audio') {
              this.onTimerStart();
            }
          },
        );
      }
    };


  }

  render() {
    const { isMoreSetting } = this.state
    return (
      <View>
        <Image source={Photo2_img} style={styles.senderPhoto} resizeMode="stretch" />
        {/* <RTCView streamURL={this.state.localStream} style={styles.container}/> */}
        <View style={styles.overlayer}>

          <View style={{ width: '100%' }}>
            <Icon type="Ionicons" name="camera-reverse" style={styles.controlIcon}></Icon>
          </View>

          <View style={styles.controlPanel}>
            {
              isMoreSetting &&
              <Animatable.View animation={fadeIn}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <View style={[styles.control1, { marginTop: 20 }]}>
                    <Image source={SwitchCamera_icon} style={{ width: 20, height: 20 }} resizeMode="contain" />
                  </View>
                  <View style={[styles.control1, { marginTop: 20 }]}>
                    <Image source={Workup_icon} style={{ width: 20, height: 20 }} resizeMode="contain" />
                  </View>
                  <View style={[styles.control1, { marginTop: 20 }]}>
                    <Image source={Notes_icon} style={{ width: 20, height: 20 }} resizeMode="contain" />
                  </View>
                  <View style={[styles.control, { marginTop: 20 }]}>
                    <Icon type="Feather" name="message-circle" style={styles.controlIcon}></Icon>
                  </View>
                  <TouchableHighlight style={[styles.control, { marginTop: 20 }]} activeOpacity={0.8} underlayColor='transparent' onPress={() => this.setState({ isMoreSetting: false })}>
                    <Icon type="Feather" name="chevron-down" style={styles.controlIcon}></Icon>
                  </TouchableHighlight>
                </View>
              </Animatable.View>
            }
            {
              !isMoreSetting &&
              <TouchableHighlight style={styles.control} activeOpacity={0.8} underlayColor='transparent' onPress={() => this.setState({ isMoreSetting: true })}>
                <Icon type="Ionicons" name="ellipsis-horizontal" style={styles.controlIcon}></Icon>
              </TouchableHighlight>
            }
            {/* <View style={styles.control}>
              <Icon type="MaterialIcons" name="videocam-off" style={styles.controlIcon}></Icon>
            </View> */}
            <View style={[styles.control1, { marginTop: 20 }]}>
              <Image source={CameraOff_icon} style={{ width: 20, height: 20 }} resizeMode="contain" />
            </View>
            <TouchableHighlight style={[styles.control1, { marginTop: 20 }]} activeOpacity={0.9} underlayColor='transparent' onPress={() => this.handlCallStop()}>
              <Image source={MicOff_icon} style={{ width: 20, height: 20 }} resizeMode="contain" />
            </TouchableHighlight>
            {/* <View style={styles.control}>
              <Icon type="MaterialIcons" name="mic-off" style={styles.controlIcon}></Icon>
            </View> */}
            <View style={styles.recordBtnControl}>
              <View style={styles.recordObj}></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    // flex: 1,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
    height: 200,
    width: 500,
  },
  overlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 41, 102, 0.7)',
  },
  senderPhoto: {
    width: width,
    height: height,
  },
  controlPanel: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },
  control: {
    borderRadius: 30,
    backgroundColor: 'rgba(0, 41, 102, 0.3)'
  },
  control1: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 41, 102, 0.3)'
  },
  controlIcon: {
    fontSize: 25,
    padding: 10,
    color: 'white'
  },
  recordObj: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: '#FF1900',
  },
  recordBtnControl: {
    padding: 3,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white'
  }
}

export default VideoChatView;











// import React, {useEffect, useState, useCallback} from 'react';
// import {View, StyleSheet, Alert} from 'react-native';
// import {Text} from 'react-native-paper';
// import {Button} from 'react-native-paper';
// import AsyncStorage from '@react-native-community/async-storage';
// import {TextInput} from 'react-native-paper';

// import {useFocusEffect} from '@react-navigation/native';

// import InCallManager from 'react-native-incall-manager';

// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   registerGlobals,
// } from 'react-native-webrtc';

// export default function VideoChatView({navigation, ...props}) {
//   let name;
//   let connectedUser;
//   const [userId, setUserId] = useState('');
//   const [socketActive, setSocketActive] = useState(false);
//   const [calling, setCalling] = useState(false);
//   // Video Scrs
//   const [localStream, setLocalStream] = useState({toURL: () => null});
//   const [remoteStream, setRemoteStream] = useState({toURL: () => null});
//   const [conn, setConn] = useState(new WebSocket('ws://3.20.188.26:8080'));
//   const [yourConn, setYourConn] = useState(
//     //change the config as you need
//     new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: 'stun:stun.l.google.com:19302',  
//         }, {
//           urls: 'stun:stun1.l.google.com:19302',    
//         }, {
//           urls: 'stun:stun2.l.google.com:19302',    
//         }

//       ],
//     }),
//   );

//   const [offer, setOffer] = useState(null);

//   const [callToUsername, setCallToUsername] = useState(null);

//   useFocusEffect(
//     useCallback(() => {
//       AsyncStorage.getItem('userId').then(id => {
//         console.log(id);
//         if (id) {
//           setUserId(id);
//         } else {
//           setUserId('');
//           navigation.push('Login');
//         }
//       });
//     }, [userId]),
//   );

//   useEffect(() => {
//     navigation.setOptions({
//       title: 'Your ID - ' + userId,
//       headerRight: () => (
//         <Button mode="text" onPress={onLogout} style={{paddingRight: 10}}>
//           Logout
//         </Button>
//       ),
//     });
//   }, [userId]);

//   /**
//    * Calling Stuff
//    */

//   useEffect(() => {
//     if (socketActive && userId.length > 0) {
//       try {
//         InCallManager.start({media: 'audio'});
//         InCallManager.setForceSpeakerphoneOn(true);
//         InCallManager.setSpeakerphoneOn(true);
//       } catch (err) {
//         console.log('InApp Caller ---------------------->', err);
//       }

//       console.log(InCallManager);

//       send({
//         type: 'login',
//         name: userId,
//       });
//     }
//   }, [socketActive, userId]);

//   const onLogin = () => {};

//   useEffect(() => {
//     /**
//      *
//      * Sockets Signalling
//      */
//     conn.onopen = () => {
//       console.log('Connected to the signaling server');
//       setSocketActive(true);
//     };
//     //when we got a message from a signaling server
//     conn.onmessage = msg => {
//       let data;
//       if (msg.data === 'Hello world') {
//         data = {};
//       } else {
//         data = JSON.parse(msg.data);
//         console.log('Data --------------------->', data);
//         switch (data.type) {
//           case 'login':
//             console.log('Login');
//             break;
//           //when somebody wants to call us
//           case 'offer':
//             handleOffer(data.offer, data.name);
//             console.log('Offer');
//             break;
//           case 'answer':
//             handleAnswer(data.answer);
//             console.log('Answer');
//             break;
//           //when a remote peer sends an ice candidate to us
//           case 'candidate':
//             handleCandidate(data.candidate);
//             console.log('Candidate');
//             break;
//           case 'leave':
//             handleLeave();
//             console.log('Leave');
//             break;
//           default:
//             break;
//         }
//       }
//     };
//     conn.onerror = function(err) {
//       console.log('Got error', err);
//     };
//     /**
//      * Socjket Signalling Ends
//      */

//     let isFront = false;
//     mediaDevices.enumerateDevices().then(sourceInfos => {
//       let videoSourceId;
//       for (let i = 0; i < sourceInfos.length; i++) {
//         const sourceInfo = sourceInfos[i];
//         if (
//           sourceInfo.kind == 'videoinput' &&
//           sourceInfo.facing == (isFront ? 'front' : 'environment')
//         ) {
//           videoSourceId = sourceInfo.deviceId;
//         }
//       }
//       mediaDevices
//         .getUserMedia({
//           audio: true,
//           video: {
//             mandatory: {
//               minWidth: 500, // Provide your own width, height and frame rate here
//               minHeight: 300,
//               minFrameRate: 30,
//             },
//             facingMode: isFront ? 'user' : 'environment',
//             optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
//           },
//         })
//         .then(stream => {
//           // Got stream!
//           setLocalStream(stream);

//           // setup stream listening
//           yourConn.addStream(stream);
//         })
//         .catch(error => {
//           // Log error
//         });
//     });

//     yourConn.onaddstream = event => {
//       console.log('On Add Stream', event);
//       setRemoteStream(event.stream);
//     };

//     // Setup ice handling
//     yourConn.onicecandidate = event => {
//       if (event.candidate) {
//         send({
//           type: 'candidate',
//           candidate: event.candidate,
//         });
//       }
//     };
//   }, []);

//   const send = message => {
//     //attach the other peer username to our messages
//     if (connectedUser) {
//       message.name = connectedUser;
//       console.log('Connected iser in end----------', message);
//     }

//     conn.send(JSON.stringify(message));
//   };

//   const onCall = () => {
//     setCalling(true);

//     connectedUser = callToUsername;
//     console.log('Caling to', callToUsername);
//     // create an offer

//     yourConn.createOffer().then(offer => {
//       yourConn.setLocalDescription(offer).then(() => {
//         console.log('Sending Ofer');
//         console.log(offer);
//         send({
//           type: 'offer',
//           offer: offer,
//         });
//         // Send pc.localDescription to peer
//       });
//     });
//   };

//   //when somebody sends us an offer
//   const handleOffer = async (offer, name) => {
//     console.log(name + ' is calling you.');

//     console.log('Accepting Call===========>', offer);
//     connectedUser = name;

//     try {
//       await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

//       const answer = await yourConn.createAnswer();

//       await yourConn.setLocalDescription(answer);
//       send({
//         type: 'answer',
//         answer: answer,
//       });
//     } catch (err) {
//       console.log('Offerr Error', err);
//     }
//   };

//   //when we got an answer from a remote user
//   const handleAnswer = answer => {
//     yourConn.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   //when we got an ice candidate from a remote user
//   const handleCandidate = candidate => {
//     setCalling(false);
//     console.log('Candidate ----------------->', candidate);
//     yourConn.addIceCandidate(new RTCIceCandidate(candidate));
//   };

//   //hang up
//   const hangUp = () => {
//     send({
//       type: 'leave',
//     });

//     handleLeave();
//   };

//   const handleLeave = () => {
//     connectedUser = null;
//     setRemoteStream({toURL: () => null});

//     yourConn.close();
//     // yourConn.onicecandidate = null;
//     // yourConn.onaddstream = null;
//   };

//   const onLogout = () => {
//     // hangUp();

//     AsyncStorage.removeItem('userId').then(res => {
//       navigation.push('Login');
//     });
//   };

//   const acceptCall = async () => {
//     console.log('Accepting Call===========>', offer);
//     connectedUser = offer.name;

//     try {
//       await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

//       const answer = await yourConn.createAnswer();

//       await yourConn.setLocalDescription(answer);

//       send({
//         type: 'answer',
//         answer: answer,
//       });
//     } catch (err) {
//       console.log('Offerr Error', err);
//     }
//   };
//   const rejectCall = async () => {
//     send({
//       type: 'leave',
//     });
//     ``;
//     setOffer(null);

//     handleLeave();
//   };

//   /**
//    * Calling Stuff Ends
//    */

//   return (
//     <View style={styles.root}>
//       <View style={styles.inputField}>
//         <TextInput
//           label="Enter Friends Id"
//           mode="outlined"
//           style={{marginBottom: 7}}
//           onChangeText={text => setCallToUsername(text)}
//         />
//         <Button
//           mode="contained"
//           onPress={onCall}
//           loading={calling}
//           //   style={styles.btn}
//           contentStyle={styles.btnContent}
//           disabled={!(socketActive && userId.length > 0)}>
//           Call
//         </Button>
//       </View>

//       <View style={styles.videoContainer}>
//         <View style={[styles.videos, styles.localVideos]}>
//           <Text>Your Video</Text>
//           <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
//         </View>
//         <View style={[styles.videos, styles.remoteVideos]}>
//           <Text>Friends Video</Text>
//           <RTCView
//             streamURL={remoteStream.toURL()}
//             style={styles.remoteVideo}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: '#fff',
//     flex: 1,
//     padding: 20,
//   },
//   inputField: {
//     marginBottom: 10,
//     flexDirection: 'column',
//   },
//   videoContainer: {
//     flex: 1,
//     minHeight: 450,
//   },
//   videos: {
//     width: '100%',
//     flex: 1,
//     position: 'relative',
//     overflow: 'hidden',

//     borderRadius: 6,
//   },
//   localVideos: {
//     height: 100,
//     marginBottom: 10,
//   },
//   remoteVideos: {
//     height: 400,
//   },
//   localVideo: {
//     backgroundColor: '#f2f2f2',
//     height: '100%',
//     width: '100%',
//   },
//   remoteVideo: {
//     backgroundColor: '#f2f2f2',
//     height: '100%',
//     width: '100%',
//   },
// });




