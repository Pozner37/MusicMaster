import React from "react";
import { Button, SxProps } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

const circleButton: SxProps = (top = "10rem", size = "250px") => ({
  borderRadius: "50%",
  height: size,
  width: size,
  position: "relative",
  alignSelf: "center",
  top: top,
  "&:focus": {
    outline: "none",
  },
  "&:active": {
    outline: "none",
  },
});

interface MicButtonProps {
  onClick: () => void;
  size?: string;
  top?: string;
  iconSize?: number;
  isRecording?: boolean;
}

const MicButton = ({
  onClick,
  top,
  iconSize,
  isRecording = false,
}: MicButtonProps) => (
  <Button
    onClick={onClick}
    sx={circleButton(top)}
    color={isRecording ? "info" : "primary"}
  >
    {isRecording ? (
      <StopIcon sx={{ fontSize: iconSize || 120 }} />
    ) : (
      <MicIcon sx={{ fontSize: iconSize || 120 }} />
    )}
  </Button>
);

export default MicButton;
