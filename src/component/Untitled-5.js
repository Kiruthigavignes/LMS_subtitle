// import React, { useState, useEffect, useRef } from 'react';
// import Hls from 'hls.js';
// import videosData from '../data';

// const VideoPlayer = ({ src, subtitles, showSubtitles }) => {
//   const [hlsInstance, setHlsInstance] = useState(null);

//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (!src) {
//       console.error("No 'src' provided for VideoPlayer component.");
//       return;
//     }

//     const video = videoRef.current;

//     if (Hls.isSupported()) {
//       let hls = new Hls();
//       hls.loadSource(src);
//       hls.attachMedia(video);
//       hls.subtitleDisplay= true;    // Add subtitle track
//       hls.subtitleTrack ='https://d8vtuwhyjdgx2.cloudfront.net/FFL/Pinbox_Module_A_English.vtt' // subtitleTrack.id;

//   // hls.on(Hls.Events.MANIFEST_PARSED, function() {
//   //   const subtitleTracks = hls.subtitleTracks;
//   //   if (subtitleTracks && subtitleTracks.length > 0) {
//   //     // Assuming you want the first subtitle track available
//   //     const subtitleTrack = subtitleTracks[0];
//   //     hls.subtitleTrack ='https://d8vtuwhyjdgx2.cloudfront.net/FFL/Pinbox_Module_A_English.vtt' // subtitleTrack.id;
//   //   }
//   // });
//       setHlsInstance(hls);
//       return () => {
//         if (hls) {
//           hls.destroy();
//         }
//       };
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       video.src = src;
//     } else {
//       console.error('HLS.js is not supported in this browser.');
//     }
//   }, [src]);

//   return (
//     <div>
//       <video controls ref={videoRef} style={{ width: '100%' }}>
//         {showSubtitles && (
//           <track kind="subtitles" srcLang="en" label="English" src={subtitles} default />
//         )}
//         Your browser does not support the video tag.
//       </video>
//       {showSubtitles && subtitles && (
//         <div
//           style={{
//             position: 'relative',
//             width: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.7)',
//             color: 'white',
//             padding: '5px',
//             textAlign: 'center',
//           }}
//         >
//           Subtitles: {subtitles.text}
//         </div>
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [showSubtitles, setShowSubtitles] = useState(true);

//   const changeVideo = (index) => {
//     setCurrentVideoIndex(index);
//   };

//   const toggleSubtitles = () => {
//     setShowSubtitles(!showSubtitles);
//   };

//   return (
//     <div>
//       <h1>Video Player Example</h1>
//       <div>
//         {videosData.map((video, index) => (
//           <button key={video.id} onClick={() => changeVideo(index)}>
//             {video.name}
//           </button>
//         ))}
//       </div>
//       <button onClick={toggleSubtitles}>
//         {showSubtitles ? 'Hide Subtitles' : 'Show Subtitles'}
//       </button>
//       <VideoPlayer
//         src={videosData[currentVideoIndex].hls_url}
//         subtitles={videosData[currentVideoIndex].sub_title}
//         showSubtitles={showSubtitles}
//       />
//     </div>
//   );
// };

// export default App;


// import React, { useState, useEffect, useRef } from 'react';
// import Hls from 'hls.js';
// import videosData from '../data';

// const VideoPlayer = ({ src, subtitles, showSubtitles }) => {
//   const [hlsInstance, setHlsInstance] = useState(null);
//   const videoRef = useRef(null);
//   const trackRef = useRef(null);

//   useEffect(() => {
//     if (!src) {
//       console.error("No 'src' provided for VideoPlayer component.");
//       return;
//     }

//     const video = videoRef.current;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(src);
//       hls.attachMedia(video);

//       if (subtitles && subtitles.src) {
//         const track = document.createElement('track');
//         track.src = subtitles.src;
//         track.kind = 'subtitles';
//         track.srclang = 'en';
//         track.label = 'English';
//         track.default = true;
//         trackRef.current = track;
//         video.appendChild(track);
//       }

//       setHlsInstance(hls);

//       return () => {
//         if (hls) {
//           hls.destroy();
//         }
//       };
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       video.src = src;
//     } else {
//       console.error('HLS.js is not supported in this browser.');
//     }
//   }, [src, subtitles]);

//   return (
//     <div>
//       <video controls ref={videoRef} style={{ width: '100%' }}>
//         Your browser does not support the video tag.
//       </video>
//       {showSubtitles && subtitles && subtitles.src && (
//         <div>
//           <h3>Subtitles</h3>
//           <p>{subtitles.src}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [showSubtitles, setShowSubtitles] = useState(false); // State to control visibility of subtitles

//   const changeVideo = (index) => {
//     setCurrentVideoIndex(index);
//   };

//   const toggleSubtitles = () => {
//     setShowSubtitles((prevShowSubtitles) => !prevShowSubtitles);
//   };

//   return (
//     <div>
//       <h1>Video Player Example</h1>
//       <div>
//         {videosData.map((video, index) => (
//           <button key={video.id} onClick={() => changeVideo(index)}>
//             {video.name}
//           </button>
//         ))}
//         <button onClick={toggleSubtitles}>Toggle Subtitles</button>
//       </div>
//       <VideoPlayer
//         src={videosData[currentVideoIndex].hls_url}
//         subtitles={videosData[currentVideoIndex].sub_title}
//         showSubtitles={showSubtitles}
//       />
//     </div>
//   );
// };

// export default App;










