import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@mui/icons-material/Mic";

const MainPage = () => {
  const [answer, setAnswer] = useState<string>("");

  // sets the speech recognition to only recognize english
  SpeechRecognition.getRecognition().lang = "en-US";

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  const submitGuess = () => {
    // TODO: send guess to server
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Stack width="95%" alignItems={"center"}>
      <Typography>Guess The Song</Typography>
      <IconButton
        size="large"
        color={listening ? "error" : "primary"}
        onClick={() =>
          !listening
            ? SpeechRecognition.startListening()
            : SpeechRecognition.stopListening()
        }
      >
        <MicIcon />
      </IconButton>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <TextField
        value={answer}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAnswer(event.target.value);
        }}
      />
      <Button onClick={submitGuess}>Submit</Button>
    </Stack>
  );
};

export default MainPage;
