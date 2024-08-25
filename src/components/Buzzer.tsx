import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import MicButton from "./MicButton.tsx";

interface BuzzerProps {
  isBuzzerGranted: boolean;
  setIsTurnOver: React.Dispatch<React.SetStateAction<boolean>>;
  roundStarted: boolean;
}

const Buzzer = ({
  isBuzzerGranted,
  setIsTurnOver,
  roundStarted,
}: BuzzerProps) => {
  const guess = () => {
    socket.emitWithAck("buzzer").then((buzzerApproved) => {
      if (buzzerApproved) {
        navigate("/guess");
      }
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    setIsTurnOver(false);
  }, []);

  if (!roundStarted) {
    return (
      <Stack paddingTop={"4em"} spacing={26} width={"24em"}>
        <Typography variant={"h4"}>Waiting for next round</Typography>
      </Stack>
    );
  }

  return isBuzzerGranted ? (
    <Stack paddingTop={"4em"} spacing={26} width={"24em"}>
      <Typography variant={"h3"}>Too slow...</Typography>
      <Typography variant={"h5"}>Someone else is currently guessing</Typography>
    </Stack>
  ) : (
    <Stack paddingTop={"4em"}>
      <Typography variant={"h3"}>GUESS THE SONG</Typography>
      <MicButton onClick={guess} />
    </Stack>
  );
};

export default Buzzer;
