import React, { useEffect } from "react";
import { Button, SxProps } from "@mui/material";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

const circleButton: SxProps = {
  borderRadius: "50%",
  height: "250px",
  width: "250px",
  position: "relative",
  top: "10em",
  outline: "none",
  "&.Mui-focusVisible": {
    border: "none",
    outline: "none",
  },
};

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
    // <Stack width="95%" alignItems={"center"}>
    <Button disabled={isBuzzerGranted} onClick={guess} sx={circleButton}>
      GUESS
    </Button>
    // </Stack>
  );
};

export default Buzzer;
