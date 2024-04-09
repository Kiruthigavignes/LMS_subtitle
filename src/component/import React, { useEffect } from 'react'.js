import React, { useEffect } from 'react';
import Moovie from 'mooviejs';
import Hls from 'hls.js';
import Box from "@mui/material/Box";


const VideoPlayer = () => {
  useEffect(() => {
    var demo = new Moovie({
      selector: "#example",
      icons: {
        path: "https://raw.githubusercontent.com/BMSVieira/moovie.js/main/icons/"
      },
      config: {
        controls: {
          playtime: true,
          mute: true,
          volume: true,
          subtitles: false,
          config: true,
          fullscreen: true,
          submenuCaptions: true,
          submenuOffset: false,
          submenuSpeed: true,
          allowLocalSubtitles: false,
        },
      },
    });
    var video = demo.video;
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource('https://d8vtuwhyjdgx2.cloudfront.net/FFL/PIB_Module_A_English.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() { console.log("Ready to play!"); });
    }

    return () => {
      demo.destroy();
    };
  }, []); 

  return (
    <>
       <Box sx={{ maxWidth: '900px', position: 'relative', margin: '0 auto', marginTop: '43px', textAlign: 'center' }}>
         <p>hls.js integration example</p>
     </Box>      

     <Box sx={{ maxWidth: '800px', position: 'relative', margin: '0 auto', marginTop: '64px' }}>
        <video id="example" controls>
          <track kind="captions" label="Portuguese" srclang="pt" src="https://raw.githubusercontent.com/BMSVieira/moovie.js/main/demo-template/subtitles/pt.vtt"/>
          <track kind="captions" label="English" srclang="en" src="https://raw.githubusercontent.com/BMSVieira/moovie.js/main/demo-template/subtitles/en.vtt"/>
          <track kind="captions" label="French" srclang="en" src="https://raw.githubusercontent.com/BMSVieira/moovie.js/main/demo-template/subtitles/french.srt"/>
          Your browser does not support the video tag.
        </video>
     </Box>
    </>
  );
}

export default VideoPlayer;
