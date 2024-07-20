import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

interface LoginProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ setUsername }: LoginProps) => {
  const [gameId, setGameId] = useState<string>("");
  const [localUsername, setLocalUsername] = useState<string>("");

  const navigate = useNavigate();

  const joinGame = () => {
    socket
      .emitWithAck("join-game", {
        gameId: gameId,
        playerName: localUsername,
      })
      .then(() => {
        setUsername(localUsername);
        navigate("/buzzer");
      });
  };

  return (
    <Stack width="95%" alignItems={"center"}>
      <Typography variant={"h4"}>MusicMaster</Typography>
      <TextField
        value={gameId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setGameId(event.target.value);
        }}
        placeholder={"Enter PIN"}
      />
      <TextField
        value={localUsername}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLocalUsername(event.target.value);
        }}
        placeholder={"Enter name"}
      />
      <Button onClick={joinGame}>Submit</Button>
    </Stack>
  );
};

export default Login;
