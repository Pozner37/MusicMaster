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
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

interface MainPageProps {
  username: string;
  isTurnOver: boolean;
}

const MainPage = ({ isTurnOver }: MainPageProps) => {
  const [answer, setAnswer] = useState<string>("");

  // sets the speech recognition to only recognize english
  SpeechRecognition.getRecognition().lang = "en-US";

  const navigate = useNavigate();

  if (isTurnOver) {
    navigate("/buzzer");
  }

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
    socket.emit("answer", answer);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Stack width="95%" alignItems={"center"}>
      <Typography variant={"h4"}>Guess The Song</Typography>
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
      <Typography variant={"h5"}>
        Microphone: {listening ? "on" : "off"}
      </Typography>
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
