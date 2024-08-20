import React from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface WaitingScreenProps {
  gameStarted: boolean;
}

const WaitingScreen = ({ gameStarted }: WaitingScreenProps) => {
  const navigate = useNavigate();

  gameStarted && navigate("/buzzer");

  return (
    <Stack paddingTop={"4em"} spacing={26} width={"24em"}>
      <Typography variant={"h3"}>You're in!</Typography>
      <Typography variant={"h5"}>Waiting for the game to start...</Typography>
    </Stack>
  );
};

export default WaitingScreen;
