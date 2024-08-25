import "regenerator-runtime/runtime.js";
import React, { useEffect, useState } from "react";
import { Button, Card, Stack, TextField } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import MicButton from "./MicButton.tsx";

interface MainPageProps {
  username: string;
  isTurnOver: boolean;
}

const GuessPage = ({ isTurnOver }: MainPageProps) => {
  const [answer, setAnswer] = useState<string>("");

  // sets the speech recognition to only recognize english
  SpeechRecognition.getRecognition().lang = "en-US";

  const navigate = useNavigate();

  if (isTurnOver) {
    navigate("/buzzer");
  }

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening();
  }, []);

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  const submitGuess = () => {
    socket.emit("answer", { answer: answer });
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn't support speech recognition.</div>;
  }

  return (
    <Stack width="95%" alignItems={"center"}>
      <MicButton
        top={"20em"}
        size={"160px"}
        iconSize={60}
        onClick={() =>
          !listening
            ? SpeechRecognition.startListening()
            : SpeechRecognition.stopListening()
        }
        isRecording={listening}
      />
      <Card color={"white"} sx={{ width: "20em" }}>
        <Stack alignItems={"center"} spacing={4} padding={4}>
          <TextField
            placeholder={"Your answer"}
            value={answer}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAnswer(event.target.value);
            }}
          />
          <Button onClick={submitGuess}>Submit</Button>
        </Stack>
      </Card>
    </Stack>
  );
};

export default GuessPage;
