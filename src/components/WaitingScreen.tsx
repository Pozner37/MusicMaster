import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface WaitingScreenProps {
  gameStarted: boolean;
}

const WaitingScreen = ({ gameStarted }: WaitingScreenProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    gameStarted && navigate("/buzzer");
  }, [gameStarted]);

  return (
    <Stack paddingTop={"30%"} spacing={26}>
      <Typography variant={"h3"}>You're in!</Typography>
      <Typography variant={"h5"}>Waiting for the game to start...</Typography>
    </Stack>
  );
};

export default WaitingScreen;
