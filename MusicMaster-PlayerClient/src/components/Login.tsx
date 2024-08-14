import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
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
      <Box sx={{ position: "relative", top: "3em" }}>
        <img src="/music-master-logo-small.svg" alt={"logo"} />
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          bottom: "15%",
          backgroundColor: "white",
        }}
      >
        <Stack alignItems={"center"} spacing={2} padding={3}>
          <TextField
            value={gameId}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setGameId(event.target.value);
            }}
            placeholder={"Enter PIN"}
            variant="standard"
          />
          <TextField
            value={localUsername}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLocalUsername(event.target.value);
            }}
            placeholder={"Enter name"}
            variant="standard"
            color={"success"}
          />
          <Button onClick={joinGame}>Submit</Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
