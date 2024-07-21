import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import Login from "./components/Login";
import Buzzer from "./components/Buzzer";
import MainPage from "./components/MainPage";

function App() {
  const [isGuessAllowed, setIsGuessAllowed] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isTurnOver, setIsTurnOver] = useState<boolean>(false);

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
              path="/"
              element={<Login setUsername={setUsername} />}
            ></Route>
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
              path="/main"
              element={<MainPage username={username} isTurnOver={isTurnOver} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
