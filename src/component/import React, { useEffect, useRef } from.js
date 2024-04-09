import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src) {
      console.error("No 'src' provided for VideoPlayer component.");
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.detachMedia();
        hls.stopLoad();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
    } else {
      console.error('HLS.js is not supported in this browser.');
    }
  }, [src]);

  return (
    <video controls ref={videoRef} style={{ width: '100%' }}>
      <track kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
};

const App = () => {
  const hlsStreamUrl = "https://d8vtuwhyjdgx2.cloudfront.net/FFL/PIB_Module_A_English.m3u8"; 
  return (
    <div>
      <h1>Video Player Example</h1>
      <VideoPlayer src={hlsStreamUrl} />
    </div>
  );
};

export default App;