import React from "react";
import { Button, Stack } from "@mui/material";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

interface BuzzerProps {
  isBuzzerGranted: boolean;
}

const Buzzer = ({ isBuzzerGranted }: BuzzerProps) => {
  const guess = () => {
    socket.emit("buzzer");
  };

  const navigate = useNavigate();

  if (isBuzzerGranted) {
    navigate("/main");
  }

  return (
    <Stack width="95%" alignItems={"center"}>
      <Button onClick={guess}>GUESS</Button>
    </Stack>
  );
};

export default Buzzer;
