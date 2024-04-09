
import React, { useState, useEffect, useRef } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import videosData from '../data';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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

const VideoGrid = ({ videos, details }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleDetailClick = (index) => {
    setSelectedVideoIndex(index);
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Container>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ background: 'rgb(3, 14, 82)', width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center', marginBottom: '20px', padding: '6px' }}>
              <Typography sx={{ fontSize: 17, color: 'white' }} gutterBottom>
                Module A - Financial Planning and Concepts
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 15, marginBottom: '15px' }} gutterBottom>
              Foundational Financial Literacy (English): Course Progress
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {videosData.map((video, index) => (
                    <Grid key={index} item>
                      <Paper elevation={3}>
                        {selectedVideoIndex === index && (
                          <>
                            <VideoPlayer src={video.hls_url} />
                            <Typography variant="subtitle1">{video.sub_titles[selectedVideoIndex]}</Typography>
                          </>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} md={6} sx={{marginTop:'14px'}}>
                <Paper elevation={3} style={{ padding: '20px' }}>
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
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default VideoGrid;
