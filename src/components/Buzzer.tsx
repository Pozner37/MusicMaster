import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import MicButton from "./MicButton.tsx";

interface BuzzerProps {
  isBuzzerGranted: boolean;
  roundStarted: boolean;
  isGameInProgress: boolean;
}

const Buzzer = ({
  isBuzzerGranted,
  roundStarted,
  isGameInProgress,
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
    !isGameInProgress && navigate("/");
  }, [isGameInProgress]);

  if (!roundStarted) {
    return (
      <Stack paddingTop={"30%"} spacing={26} width={"24em"}>
        <Typography variant={"h4"}>Waiting for next round</Typography>
      </Stack>
    );
  }

  return isBuzzerGranted ? (
    <Stack paddingTop={"30%"} spacing={26} width={"24em"}>
      <Typography variant={"h3"}>Too slow...</Typography>
      <Typography variant={"h5"}>Someone else is currently guessing</Typography>
    </Stack>
  ) : (
    <Stack paddingTop={"30%"}>
      <Typography variant={"h3"}>GUESS THE SONG</Typography>
      <MicButton onClick={guess} />
    </Stack>
  );
};

export default Buzzer;
