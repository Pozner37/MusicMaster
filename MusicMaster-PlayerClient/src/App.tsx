import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import Login from "./components/Login";
import Buzzer from "./components/Buzzer";
import GuessPage from "./components/GuessPage.tsx";
import WaitingScreen from "./components/WaitingScreen.tsx";

function App() {
  const [isGuessAllowed, setIsGuessAllowed] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isTurnOver, setIsTurnOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    function onBuzzer() {
      setIsGuessAllowed(true);
    }

    function onAnswer() {
      setIsTurnOver(true);
      setIsGuessAllowed(false);
    }

    socket.on("buzzer-granted", onBuzzer);
    socket.on("buzzer-revoked", onAnswer);
    socket.on("round-ended", onAnswer);

    return () => {
      socket.off("buzzer-granted", onBuzzer);
      socket.off("buzzer-revoked", onAnswer);
      socket.off("round-ended", onAnswer);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/s"
              element={<Login setUsername={setUsername} />}
            ></Route>
            `
            <Route
              path="/buzzer"
              element={
                <Buzzer
                  isBuzzerGranted={isGuessAllowed}
                  setIsTurnOver={setIsTurnOver}
                />
              }
            ></Route>
            <Route
              path="/sw"
              element={<WaitingScreen gameStarted={gameStarted} />}
            ></Route>
            <Route
              path="/"
              element={
                <GuessPage username={username} isTurnOver={isTurnOver} />
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
