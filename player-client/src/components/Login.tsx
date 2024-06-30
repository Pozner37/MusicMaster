import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [gameId, setGameId] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const enterGame = () => {
    axios
      .get(
        `http://localhost:4000/join-game?gameId=${gameId}&userName=${username}`,
      )
      .then(() => {
        navigate("/main", { state: { username } });
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
        value={username}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value);
        }}
        placeholder={"Enter name"}
      />
      <Button onClick={enterGame}>Submit</Button>
    </Stack>
  );
};

export default Login;
