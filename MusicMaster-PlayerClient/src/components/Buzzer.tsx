import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import MicButton from "./MicButton.tsx";

interface BuzzerProps {
  isBuzzerGranted: boolean;
  setIsTurnOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buzzer = ({ isBuzzerGranted, setIsTurnOver }: BuzzerProps) => {
  const guess = () => {
    socket.emitWithAck("buzzer").then((buzzerApproved) => {
      if (buzzerApproved) {
        navigate("/main");
      }
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    setIsTurnOver(false);
  }, []);

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
