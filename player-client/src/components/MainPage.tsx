import React from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@mui/icons-material/Mic";

const MainPage = () => {
  SpeechRecognition.getRecognition().lang = "en-US";

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <Typography>Guess The Song</Typography>
      <IconButton
        size="large"
        color="primary"
        onClick={() => SpeechRecognition.startListening()}
      >
        <MicIcon />
      </IconButton>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
      <Button onClick={resetTranscript}>Reset</Button>
      <p>{transcript}</p>
      <TextField value={transcript} />
      <Button>Submit</Button>
    </>
  );
};

export default MainPage;
