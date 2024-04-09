import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";
import videosData from "../data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Moovie from "mooviejs";
import Hls from "hls.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const VideoGrid = ({ videos, details }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [currentVideoNumber, setCurrentVideoNumber] = useState(0);
  const [captionEnabled, setCaptionEnabled] = useState(Array(videosData.length).fill(false));
  const [subtitlesUrl, setSubtitlesUrl] = useState("");

  useEffect(() => {
    if (videosData?.length) {
      setSelectedVideoIndex(videosData[0]);
      setCurrentVideoNumber(1);
      // Set subtitles URL for the first video
      setSubtitlesUrl(videosData[0]?.subtitles_url);
    }
  }, [videosData]);

  useEffect(() => {
    if (selectedVideoIndex?.id) {
      var demo = new Moovie({
        selector: "#example",
        icons: {
          path: "https://raw.githubusercontent.com/BMSVieira/moovie.js/main/icons/",
        },


        main : {
          loop: true
      },
      storage: {
         captionOffset: false,
         playrateSpeed: false,
         captionSize: false
      },
      controls : {
          playtime : true,
          mute : true,
          volume : true,
          subtitles : captionEnabled[currentVideoNumber - 1], // Enable subtitles based on state
          config : true,
          fullscreen : true,
          submenuCaptions : true,
          submenuOffset : true,
          submenuSpeed : true,
          allowLocalSubtitles : true  
      },
      i18n : {
          play : "(Play:Pause)",
          mute : "(Mute:Unmute)",
          subtitles : "Enable",
          config : "Settings",
          fullscreen : "(Enter:Exit) Fullscreen",
          main_topic: "settings:",
          main_caption: "Captions",
          main_offset: "Caption Offset",
          main_speed: "Speed",
          main_disabled: "Disabled",
          main_default: "Default",
          caption_topic: "Captions:",
          caption_back: "Back",
          caption_load: "Load Locally",
          offset_topic: "Adjust Caption Offset",
          speed_topic: "Speed Adjust"
       }
  
        // config: {
        //   controls: {
        //     playtime: true,
        //     mute: true,
        //     volume: true,
        //     subtitles: captionEnabled[currentVideoNumber - 1], // Enable subtitles based on state
        //     config: true,
        //     fullscreen: true,
        //     submenuCaptions: true,
        //     submenuOffset: false,
        //     submenuSpeed: true,
        //     allowLocalSubtitles: false,
        //   },
        //   subtitles: {
        //     default: "https://raw.githubusercontent.com/BMSVieira/moovie.js/main/demo-template/subtitles/en.vtt"
        //   }
        // },
      });

      var video = demo.video;
      if (Hls.isSupported() && selectedVideoIndex?.hls_url) {
        var hls = new Hls();
        hls.loadSource(selectedVideoIndex?.hls_url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          console.log("Ready to play!");
        });
      }

      // Add event listener to toggle captions when video starts playing
      video.addEventListener('play', () => {
        setCaptionEnabled(true);
      });

      return () => {
        demo.destroy();
      };
    }
  }, [selectedVideoIndex, subtitlesUrl, captionEnabled, currentVideoNumber]);

  const handleDetailClick = (value, index) => {
    setSelectedVideoIndex(value);
    setCurrentVideoNumber(index + 1);
    // Set subtitles URL when a new video is selected
    setSubtitlesUrl("https://raw.githubusercontent.com/BMSVieira/moovie.js/main/demo-template/subtitles/en.vtt");
    // Enable subtitles for the selected video index
    const newCaptionEnabled = Array(videosData.length).fill(false); // Reset all captions to false
    newCaptionEnabled[index] = true; // Enable captions for the selected video
    setCaptionEnabled(newCaptionEnabled);
  };
  

  return (
    <Container>
      <Container>
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: "800px", position: "relative", margin: "0 auto", marginTop: "0px", marginTop: "64px" }}>
            {selectedVideoIndex && (
              <video id="example" controls>
                <track kind="captions" label="English" src="https://raw.githubusercontent.com/BMSVieira/moovie.js/main/demo-template/subtitles/en.vtt" srclang="en" /> {/* Use subtitlesUrl dynamically */}
                <source src="https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8" type="application/x-mpegURL" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <Button variant="outlined" sx={{ marginTop: "30px", width: "100%" }}>
            <PictureAsPdfIcon sx={{ marginRight: "10px" }} />
            Click here for Content Summary
          </Button>

          <Typography sx={{ fontSize: 15, marginBottom: "15px" }} gutterBottom>
            Foundational Financial Literacy (English): Course Progress
          </Typography>

          <Grid container spacing={3} sx={{ marginTop: "20px" }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Modules {currentVideoNumber}/{videosData.length}
              </Typography>

              {videosData.map((detail, index) => (
                <List key={index} onClick={() => handleDetailClick(detail, index)}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Typography>{detail?.name}</Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              {videosData.map((video, index) => (
                <Container key={index}>
                  <Box sx={{ marginTop: "5px" }}>
                    {selectedVideoIndex === index && (
                      <Typography>{video.description}</Typography>
                    )}
                  </Box>
                </Container>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

export default VideoGrid;
