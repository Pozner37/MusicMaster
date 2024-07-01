import React, { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

interface BuzzerProps {
  isBuzzerGranted: boolean;
  setIsTurnOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buzzer = ({ isBuzzerGranted, setIsTurnOver }: BuzzerProps) => {
  const guess = () => {
    socket.emit("buzzer");
  };

  const navigate = useNavigate();

  useEffect(() => {
    setIsTurnOver(false);
  }, []);

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
