import React, { useState,useEffect } from "react";
import { Grid,Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ReactPlayer from "react-player";
import videosData from "../data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Moovie from 'mooviejs';
import Hls from 'hls.js';

import Button from "@mui/material/Button";

const VideoGrid = ({ videos, details }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [captionEnabled, setCaptionEnabled] = useState(Array(videosData.length).fill(false));


  const toggleCaption = (index) => {
    const newCaptionEnabled = [...captionEnabled];
    newCaptionEnabled[index] = !newCaptionEnabled[index];
    setCaptionEnabled(newCaptionEnabled);
  };
  const handleDetailClick = (index) => {
    setSelectedVideoIndex(index);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    borderRadius: 10,
    width:970,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#a6abc7' : '#308fe8',
    },
  }));
  

  return (
   
      <Container>
        <Container>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                background: "rgb(3, 14, 82)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "20px",
                padding: "6px",
              }}
            >
              <Typography sx={{ fontSize: 17, color: "white" }} gutterBottom>
                Module A - Financial Planning and Concepts
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: 15, marginBottom: "15px" }}
              gutterBottom
            >
              Foundational Financial Literacy (English): Course Progress
            </Typography>
            <Box sx={{display:'flex',justifyContent:'space-between'}} >
           
            <BorderLinearProgress variant="determinate" value={10} />
            <Typography
              sx={{ fontSize: 15 }}>
             10%
            </Typography>
            </Box>

            <Grid container spacing={3} sx={{marginTop:'20px'}}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {videosData.map((video, index) => (
                    <Grid key={index} item>
                      {selectedVideoIndex === index && (
                        <>
                          <ReactPlayer
                            url={video.hls_url}
                            controls
                            width="100%"
                            height="auto"
                           
                            config={{
                              file: {
                                attributes: {
                                  crossOrigin: "anonymous",
                                },
                                tracks: [
                                  {
                                    kind: "subtitles",
                                    src: video.sub_title,
                                    
                                  
                                   
                                   
                                  },
                                ],
                              },
                            }}
                          />
                          <Button
                            variant="outlined"
                            sx={{ marginTop: "30px", width: "100%" }}
                          >
                            <PictureAsPdfIcon sx={{marginRight:'10px'}}/>
                            Click here for Content Summary
                          </Button>
                        </>
                      )}
                      {console.log(
                        "Subtitles should be called:",
                        video.sub_title
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Modules 1/6
                </Typography>

                {details.map((detail, index) => (
                  <List key={index} onClick={() => handleDetailClick(index)}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <Typography>{detail}</Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                ))}
              </Grid>

              {videosData.map((video, index) => (
                <Container>
                  <Box>
                    <Grid key={index} item sx={{ marginTop: "5px" }}>
                      {selectedVideoIndex === index && (
                        <Typography>{video.description}</Typography>
                      )}
                    </Grid>
                  </Box>
                </Container>
              ))}
            </Grid>
          </Box>
        </Container>
      </Container>
    
  );
};

export default VideoGrid;


