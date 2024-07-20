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

  return (
    <Stack width="95%" alignItems={"center"}>
      <Button disabled={isBuzzerGranted} onClick={guess}>
        GUESS
      </Button>
    </Stack>
  );
};

export default Buzzer;
