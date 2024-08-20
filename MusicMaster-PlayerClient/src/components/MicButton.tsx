import React from "react";
import { Button, SxProps } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

const circleButton: SxProps = (top = "10em", size = "250px") => ({
  borderRadius: "50%",
  height: size,
  width: size,
  position: "relative",
  alignSelf: "center",
  top: top,
  outline: "none",
  "&.Mui-focusVisible": {
    border: "none",
    outline: "none",
  },
});

interface MicButtonProps {
  onClick: () => void;
  size?: string;
  top?: string;
  iconSize?: number;
  isRecording: boolean;
}

const MicButton = ({
  onClick,
  size,
  top,
  iconSize,
  isRecording = false,
}: MicButtonProps) => (
  <Button
    onClick={onClick}
    sx={circleButton(top, size)}
    color={isRecording ? "info" : "secondary"}
  >
    {isRecording ? (
      <StopIcon sx={{ fontSize: iconSize || 120 }} />
    ) : (
      <MicIcon sx={{ fontSize: iconSize || 120 }} />
    )}
  </Button>
);

export default MicButton;
