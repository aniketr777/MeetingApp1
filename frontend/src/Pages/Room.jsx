import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import SideBar from "../components/SideBar";
const URL = "http://localhost:5000";
import "remixicon/fonts/remixicon.css";
import ChatUI from "../components/ChatUI"
export const Room = ({ name, localAudioTrack, localVideoTrack }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lobby, setLobby] = useState(true);
  const [socket, setSocket] = useState(null);
  const [sendingPc, setSendingPc] = useState(null);
  const [receivingPc, setReceivingPc] = useState(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);
  const [remoteMediaStream, setRemoteMediaStream] = useState(null);
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  useEffect(() => {
    const socket = io(URL);
    socket.on("send-offer", async ({ roomId }) => {
      console.log("sending offer");
      setLobby(false);
      const pc = new RTCPeerConnection();

      setSendingPc(pc);
      if (localVideoTrack) {
        console.error("added tack");
        console.log(localVideoTrack);
        pc.addTrack(localVideoTrack);
      }
      if (localAudioTrack) {
        console.error("added tack");
        console.log(localAudioTrack);
        pc.addTrack(localAudioTrack);
      }

      pc.onicecandidate = async (e) => {
        console.log("receiving ice candidate locally");
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "sender",
            roomId,
          });
        }
      };

      pc.onnegotiationneeded = async () => {
        console.log("on negotiation neeeded, sending offer");
        const sdp = await pc.createOffer();
        pc.setLocalDescription(sdp);
        socket.emit("offer", {
          sdp,
          roomId,
        });
      };
    });

    socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
      console.log("received offer");
      setLobby(false);
      const pc = new RTCPeerConnection();
      pc.setRemoteDescription(remoteSdp);
      const sdp = await pc.createAnswer();
      pc.setLocalDescription(sdp);
      const stream = new MediaStream();
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }

      setRemoteMediaStream(stream);
      // trickle ice
      setReceivingPc(pc);
      window.pcr = pc;
      pc.ontrack = (e) => {
        alert("ontrack");
        // console.error("inside ontrack");
        // const {track, type} = e;
        // if (type == 'audio') {
        //     // setRemoteAudioTrack(track);
        //     // @ts-ignore
        //     remoteVideoRef.current.srcObject.addTrack(track)
        // } else {
        //     // setRemoteVideoTrack(track);
        //     // @ts-ignore
        //     remoteVideoRef.current.srcObject.addTrack(track)
        // }
        // //@ts-ignore
        // remoteVideoRef.current.play();
      };

      pc.onicecandidate = async (e) => {
        if (!e.candidate) {
          return;
        }
        console.log("omn ice candidate on receiving seide");
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "receiver",
            roomId,
          });
        }
      };

      socket.emit("answer", {
        roomId,
        sdp: sdp,
      });
      setTimeout(() => {
        const track1 = pc.getTransceivers()[0].receiver.track;
        const track2 = pc.getTransceivers()[1].receiver.track;
        console.log(track1);
        if (track1.kind === "video") {
          setRemoteAudioTrack(track2);
          setRemoteVideoTrack(track1);
        } else {
          setRemoteAudioTrack(track1);
          setRemoteVideoTrack(track2);
        }
        //@ts-ignore
        remoteVideoRef.current.srcObject.addTrack(track1);
        //@ts-ignore
        remoteVideoRef.current.srcObject.addTrack(track2);
        //@ts-ignore
        remoteVideoRef.current.play();
        // if (type == 'audio') {
        //     // setRemoteAudioTrack(track);
        //     // @ts-ignore
        //     remoteVideoRef.current.srcObject.addTrack(track)
        // } else {
        //     // setRemoteVideoTrack(track);
        //     // @ts-ignore
        //     remoteVideoRef.current.srcObject.addTrack(track)
        // }
        // //@ts-ignore
      }, 5000);
    });

    socket.on("answer", ({ roomId, sdp: remoteSdp }) => {
      setLobby(false);
      setSendingPc((pc) => {
        pc?.setRemoteDescription(remoteSdp);
        return pc;
      });
      console.log("loop closed");
    });

    socket.on("lobby", () => {
      setLobby(true);
    });

    socket.on("add-ice-candidate", ({ candidate, type }) => {
      console.log("add ice candidate from remote");
      console.log({ candidate, type });
      if (type == "sender") {
        setReceivingPc((pc) => {
          if (!pc) {
            console.error("receicng pc nout found");
          } else {
            console.error(pc.ontrack);
          }
          pc?.addIceCandidate(candidate);
          return pc;
        });
      } else {
        setSendingPc((pc) => {
          if (!pc) {
            console.error("sending pc nout found");
          } else {
            // console.error(pc.ontrack)
          }
          pc?.addIceCandidate(candidate);
          return pc;
        });
      }
    });

    setSocket(socket);
  }, [name]);

  useEffect(() => {
    if (localVideoRef.current) {
      if (localVideoTrack) {
        localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
        localVideoRef.current.play();
      }
    }
  }, [localVideoRef, localVideoTrack]);




  const [clicked,setClicked] = useState(true);
  const [recording,setRecording] = useState(true);
  const[mic,setmic] =useState(true);
  const [video, setVideo] = useState(true);
  const [sharingScreen, setSharingScreen] = useState(false);
  return (
    // <div>
    //   Hi {name}
    //   <video autoPlay width={400} height={400} ref={localVideoRef} />
    //   {lobby ? "Waiting to connect you to someone" : null}
    //   <video autoPlay width={400} height={400} ref={remoteVideoRef} />
    // </div>
    <>
      <div className="flex bg-black min-h-screen overflow-auto text-white">
        <div
          className=""
          style={{
            width: !clicked ? "95%" : "75%",
          }}
        >
          {/* Header  */}
          <div className=" p-5  py-10 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <div className="text-yellow-400 font-thin text-xl">MeetPro</div>
              <div className="text-yellow-400 font-thin text-xl">|</div>
              <div className="text-white font-thin text-lg">
                Username Meeting
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-zinc-800 p-2 text-lg flex items-center gap-1 cursor-pointer">
                <i className="ri-add-line"></i> Live Stream
              </div>
              <div className="border border-white p-2 rounded-full text-lg flex items-center gap-1 cursor-pointer">
                <i className="  ri-group-line"></i>
                <i className="ri-add-line"></i>
                Invite
              </div>
            </div>
          </div>
          {/* middle  */}
          <div className="flex flex-col ">
            <div className="bg-black w-full flex p-9 gap-10 rounded-lg ">
              <div className="bg-zinc-800 rounded-lg w-[45%] h-[75%]">
                <video
                  autoPlay
                  className="w-full h-full rounded-lg  object-cover"
                  ref={localVideoRef}
                />
              </div>
              <div className="bg-zinc-400 rounded-lg w-[45%] h-[75%]">
                {/* {lobby ? "Waiting to connect you to someone" : null}
              //{" "} */}
                <video
                  autoPlay
                  className="w-full h-full rounded-lg object-cover"
                  ref={remoteVideoRef}
                />
              </div>
            </div>
            {/* control Panel  */}
            <div className="bg-black p-3  rounded-full border-gray-600 w-[100%]  flex items-center justify-center gap-10">
              <div className="items-center flex flex-col justify-center ">
                <div className=" rounded-lg flex p-1 bg-red-600 text-sm">
                  <i class="ri-record-circle-line"></i> <div>Record</div>
                </div>
                {recording ? (
                  <div className="text-xs ">Start</div>
                ) : (
                  <div className="text-xs ">End</div>
                )}
              </div>
              <div className="items-center flex flex-col justify-center ">
                <div className=" rounded-lg flex p-1 text-sm">
                  <div></div>
                </div>
                {mic ? (
                  <>
                    <i className="text-2xl ri-mic-line "></i>
                  </>
                ) : (
                  <>
                    <i class="ri-mic-off-line"></i>
                  </>
                )}
                <div className="text-sm ">Mic</div>
              </div>
              <div className="items-center flex  justify-center">
                <div className="items-center flex flex-col  justify-center">
                  <div className="rounded-lg flex p-1 text-sm">
                    <div></div>
                  </div>

                  {video ? (
                    <>
                      <i class="ri-vidicon-line"></i>
                    </>
                  ) : (
                    <>
                      <i class="ri-video-off-line"></i>
                      {/* <div className="text-xs ">Off</div> */}
                    </>
                  )}

                  <div className="text-sm ">Cam</div>
                </div>

                {/* Share Screen */}
                <div className="items-center flex flex-col justify-center">
                  <div className="rounded-lg flex p-1 text-sm">
                    <div></div>
                  </div>
                  <i class="ri-upload-2-line"></i>
                  <div className="text-sm ">Screen Sharing</div>
                </div>

                {/* Leave Meeting */}
                <div className="items-center flex flex-col justify-center">
                  <div className="rounded-lg flex p-1 text-sm">
                    <div></div>
                  </div>
                  <i className="text-2xl ri-logout-box-r-line text-red-500 cursor-pointer"></i>
                  <div className="text-xs text-red-500">Leave</div>
                </div>
              </div>
            </div>
          </div>
          {/* control Panel  */}
        </div>

        {clicked ? (
          <div className="w-[25%]">
            <ChatUI></ChatUI>
          </div>
        ) : null}

        <div>
          <SideBar />
        </div>
      </div>
    </>
  );
};
// import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import SideBar from "../components/SideBar";
// const URL = "http://localhost:5000";
// import "remixicon/fonts/remixicon.css";
// import ChatUI from "../components/ChatUI";

// export const Room = ({ name, localAudioTrack, localVideoTrack }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [lobby, setLobby] = useState(true);
//   const [socket, setSocket] = useState(null);
//   const [sendingPc, setSendingPc] = useState(null);
//   const [receivingPc, setReceivingPc] = useState(null);
//   const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
//   const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);
//   const [remoteMediaStream, setRemoteMediaStream] = useState(null);
//   const remoteVideoRef = useRef(null);
//   const localVideoRef = useRef(null);

//   useEffect(() => {
//     const socket = io(URL);
//     socket.on("send-offer", async ({ roomId }) => {
//       console.log("sending offer");
//       setLobby(false);
//       const pc = new RTCPeerConnection();

//       setSendingPc(pc);
//       if (localVideoTrack) {
//         console.error("added tack");
//         console.log(localVideoTrack);
//         pc.addTrack(localVideoTrack);
//       }
//       if (localAudioTrack) {
//         console.error("added tack");
//         console.log(localAudioTrack);
//         pc.addTrack(localAudioTrack);
//       }

//       pc.onicecandidate = async (e) => {
//         console.log("receiving ice candidate locally");
//         if (e.candidate) {
//           socket.emit("add-ice-candidate", {
//             candidate: e.candidate,
//             type: "sender",
//             roomId,
//           });
//         }
//       };

//       pc.onnegotiationneeded = async () => {
//         console.log("on negotiation neeeded, sending offer");
//         const sdp = await pc.createOffer();
//         pc.setLocalDescription(sdp);
//         socket.emit("offer", {
//           sdp,
//           roomId,
//         });
//       };
//     });

//     socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
//       console.log("received offer");
//       setLobby(false);
//       const pc = new RTCPeerConnection();
//       pc.setRemoteDescription(remoteSdp);
//       const sdp = await pc.createAnswer();
//       pc.setLocalDescription(sdp);
//       const stream = new MediaStream();
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = stream;
//       }

//       setRemoteMediaStream(stream);
//       // trickle ice
//       setReceivingPc(pc);
//       window.pcr = pc;
//       pc.ontrack = (e) => {
//         alert("ontrack");
//         // console.error("inside ontrack");
//         // const {track, type} = e;
//         // if (type == 'audio') {
//         //     // setRemoteAudioTrack(track);
//         //     // @ts-ignore
//         //     remoteVideoRef.current.srcObject.addTrack(track)
//         // } else {
//         //     // setRemoteVideoTrack(track);
//         //     // @ts-ignore
//         //     remoteVideoRef.current.srcObject.addTrack(track)
//         // }
//         // //@ts-ignore
//         // remoteVideoRef.current.play();
//       };

//       pc.onicecandidate = async (e) => {
//         if (!e.candidate) {
//           return;
//         }
//         console.log("omn ice candidate on receiving seide");
//         if (e.candidate) {
//           socket.emit("add-ice-candidate", {
//             candidate: e.candidate,
//             type: "receiver",
//             roomId,
//           });
//         }
//       };

//       socket.emit("answer", {
//         roomId,
//         sdp: sdp,
//       });
//       setTimeout(() => {
//         const track1 = pc.getTransceivers()[0].receiver.track;
//         const track2 = pc.getTransceivers()[1].receiver.track;
//         console.log(track1);
//         if (track1.kind === "video") {
//           setRemoteAudioTrack(track2);
//           setRemoteVideoTrack(track1);
//         } else {
//           setRemoteAudioTrack(track1);
//           setRemoteVideoTrack(track2);
//         }
//         //@ts-ignore
//         remoteVideoRef.current.srcObject.addTrack(track1);
//         //@ts-ignore
//         remoteVideoRef.current.srcObject.addTrack(track2);
//         //@ts-ignore
//         remoteVideoRef.current.play();
//         // if (type == 'audio') {
//         //     // setRemoteAudioTrack(track);
//         //     // @ts-ignore
//         //     remoteVideoRef.current.srcObject.addTrack(track)
//         // } else {
//         //     // setRemoteVideoTrack(track);
//         //     // @ts-ignore
//         //     remoteVideoRef.current.srcObject.addTrack(track)
//         // }
//         // //@ts-ignore
//       }, 5000);
//     });

//     socket.on("answer", ({ roomId, sdp: remoteSdp }) => {
//       setLobby(false);
//       setSendingPc((pc) => {
//         pc?.setRemoteDescription(remoteSdp);
//         return pc;
//       });
//       console.log("loop closed");
//     });

//     socket.on("lobby", () => {
//       setLobby(true);
//     });

//     socket.on("add-ice-candidate", ({ candidate, type }) => {
//       console.log("add ice candidate from remote");
//       console.log({ candidate, type });
//       if (type == "sender") {
//         setReceivingPc((pc) => {
//           if (!pc) {
//             console.error("receicng pc nout found");
//           } else {
//             console.error(pc.ontrack);
//           }
//           pc?.addIceCandidate(candidate);
//           return pc;
//         });
//       } else {
//         setSendingPc((pc) => {
//           if (!pc) {
//             console.error("sending pc nout found");
//           } else {
//             // console.error(pc.ontrack)
//           }
//           pc?.addIceCandidate(candidate);
//           return pc;
//         });
//       }
//     });

//     setSocket(socket);
//   }, [name]);

//   useEffect(() => {
//     if (localVideoRef.current) {
//       if (localVideoTrack) {
//         localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
//         localVideoRef.current.play();
//       }
//     }
//   }, [localVideoRef, localVideoTrack]);

//   const [clicked, setClicked] = useState(true);
//   const [recording, setRecording] = useState(false);
//   const [mic, setMic] = useState(true);
//   const [video, setVideo] = useState(true);
//   const [sharingScreen, setSharingScreen] = useState(false);

//   const toggleChat = () => {
//     setClicked(!clicked);
//   };

//   const toggleRecording = () => {
//     setRecording(!recording);
//   };

//   const toggleMic = () => {
//     setMic(!mic);
//   };

//   const toggleVideo = () => {
//     setVideo(!video);
//   };

//   // Placeholder for screen sharing functionality
//   const handleShareScreen = () => {
//     setSharingScreen(!sharingScreen);
//     alert(
//       "Screen sharing toggled (functionality not implemented in this UI-only change)"
//     );
//   };

//   // Placeholder for leave meeting functionality
//   const handleLeaveMeeting = () => {
//     alert(
//       "Leaving meeting (functionality not implemented in this UI-only change)"
//     );
//     // In a real application, you would handle cleanup, socket disconnection, etc.
//   };

//   return (
//     <div className="flex bg-gray-900 min-h-screen text-white">
//       <div
//         className="flex-grow flex flex-col"
//         style={{
//           width: !clicked ? "100%" : "75%",
//           transition: "width 0.3s ease-in-out",
//         }}
//       >
//         {/* Header */}
//         <div className="h-[10vh] p-4 flex items-center justify-between bg-gray-800 shadow-md">
//           {/* Left side */}
//           <div className="flex items-center gap-3">
//             <div className="text-yellow-500 font-semibold text-xl">MeetPro</div>
//             <div className="text-gray-500">|</div>
//             <div className="text-white font-medium text-lg">
//               Username Meeting
//             </div>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center gap-3">
//             <div className="rounded-full bg-gray-700 p-2 text-lg flex items-center gap-1 cursor-pointer hover:bg-gray-600">
//               <i className="ri-live-line"></i> Live Stream
//             </div>
//             <div className="border border-gray-600 p-2 rounded-full text-lg flex items-center gap-1 cursor-pointer hover:border-gray-500">
//               <i className="ri-group-line"></i>
//               <i className="ri-add-line"></i> Invite
//             </div>
//           </div>
//         </div>

//         {/* Middle */}
//         <div className="flex-grow p-6 flex gap-6">
//           <div className="bg-gray-800 rounded-lg w-1/2 h-[calc(100% - 12vh)] overflow-hidden">
//             <video
//               autoPlay
//               className="w-full h-full object-cover"
//               ref={localVideoRef}
//               muted // Mute local video to avoid feedback
//             />
//           </div>
//           <div className="bg-gray-700 rounded-lg w-1/2 h-[calc(100% - 12vh)] overflow-hidden relative">
//             {lobby && (
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-lg">
//                 Waiting to connect...
//               </div>
//             )}
//             <video
//               autoPlay
//               className="w-full h-full object-cover"
//               ref={remoteVideoRef}
//             />
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-gray-800 p-3 rounded-b-md shadow-inner">
//           <div className="max-w-3xl mx-auto flex items-center justify-around">
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={toggleRecording}
//                 className={`rounded-full p-3 text-lg ${
//                   recording
//                     ? "bg-red-600 hover:bg-red-500"
//                     : "bg-gray-700 hover:bg-gray-600"
//                 }`}
//               >
//                 <i
//                   className={`ri-record-circle-line ${
//                     recording ? "text-white" : "text-gray-300"
//                   }`}
//                 ></i>
//               </button>
//               <div className="text-xs text-gray-400 mt-1">
//                 {recording ? "Recording" : "Record"}
//               </div>
//             </div>
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={toggleMic}
//                 className={`rounded-full p-3 text-2xl ${
//                   mic
//                     ? "bg-gray-700 hover:bg-gray-600"
//                     : "bg-gray-700 hover:bg-gray-600"
//                 }`}
//               >
//                 <i
//                   className={`ri-mic-${mic ? "line" : "off-line"} ${
//                     mic ? "text-white" : "text-gray-300"
//                   }`}
//                 ></i>
//               </button>
//               <div className="text-xs text-gray-400 mt-1">Mic</div>
//             </div>
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={toggleVideo}
//                 className={`rounded-full p-3 text-2xl ${
//                   video
//                     ? "bg-gray-700 hover:bg-gray-600"
//                     : "bg-gray-700 hover:bg-gray-600"
//                 }`}
//               >
//                 <i
//                   className={`ri-vidicon-${video ? "line" : "off-line"} ${
//                     video ? "text-white" : "text-gray-300"
//                   }`}
//                 ></i>
//               </button>
//               <div className="text-xs text-gray-400 mt-1">Cam</div>
//             </div>
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={handleShareScreen}
//                 className="rounded-full p-3 text-lg bg-gray-700 hover:bg-gray-600"
//               >
//                 <i className="ri-upload-2-line text-white"></i>
//               </button>
//               <div className="text-xs text-gray-400 mt-1">Share Screen</div>
//             </div>
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={handleLeaveMeeting}
//                 className="rounded-full p-3 text-2xl bg-red-500 hover:bg-red-400"
//               >
//                 <i className="ri-logout-box-r-line text-white"></i>
//               </button>
//               <div className="text-xs text-red-500 mt-1">Leave</div>
//             </div>
//             <div className="flex items-center justify-center">
//               <button
//                 onClick={toggleChat}
//                 className="rounded-full p-3 text-lg bg-gray-700 hover:bg-gray-600"
//               >
//                 <i
//                   className={`ri-chat-${
//                     clicked ? "3-line" : "off-line"
//                   } text-white`}
//                 ></i>
//               </button>
//               <div className="text-xs text-gray-400 mt-1">Chat</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {clicked && (
//         <div className="w-1/4 bg-gray-800 border-l border-gray-700 transition-all duration-300 ease-in-out">
//           <ChatUI />
//         </div>
//       )}

//       {/* Sidebar is currently outside the main content area */}
//       {/* <div>
//         <SideBar />
//       </div> */}
//     </div>
//   );
// };