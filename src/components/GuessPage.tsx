import "regenerator-runtime/runtime.js";
import React, { useEffect, useState } from "react";
import { Button, Card, Stack, TextField } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import MicButton from "./MicButton.tsx";

interface GuessPageProps {
  isGameInProgress: boolean;
}

const GuessPage = ({ isGameInProgress }: GuessPageProps) => {
  const [answer, setAnswer] = useState<string>("");

  // sets the speech recognition to only recognize english
  SpeechRecognition.getRecognition().lang = "en-US";

  const navigate = useNavigate();

  useEffect(() => {
    !isGameInProgress && navigate("/");
  }, [isGameInProgress]);

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening();
    socket.on("buzzer-revoked", () => {
      navigate("/buzzer");
    });

    return () => {
      socket.off("buzzer-revoked", () => {
        navigate("/buzzer");
      });
    };
  }, []);

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  const submitGuess = () => {
    socket.emit("answer", { answer: answer || " " });
    navigate("/buzzer");
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn't support speech recognition.</div>;
  }

  return (
    <Stack
      alignItems={"center"}
      spacing={4}
      sx={{ position: "relative", top: "6rem" }}
    >
      <Card color={"white"} sx={{ width: "20em" }}>
        <Stack alignItems={"center"} spacing={4} padding={4}>
          <TextField
            placeholder={"Your answer"}
            value={answer}
            multiline
            maxRows={3}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAnswer(event.target.value);
            }}
          />
          <Button onClick={submitGuess}>Submit</Button>
        </Stack>
      </Card>
      <MicButton
        top={""}
        size={"160px"}
        iconSize={60}
        onClick={() =>
          !listening
            ? SpeechRecognition.startListening()
            : SpeechRecognition.stopListening()
        }
        isRecording={listening}
      />
    </Stack>
  );
};

export default GuessPage;
