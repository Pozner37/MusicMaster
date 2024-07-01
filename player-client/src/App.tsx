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
      setIsGuessAllowed(false)
    }

    socket.on("buzzerGranted", onBuzzer);
    socket.on("correctAnswer", onAnswer);
    socket.on("wrongAnswer", onAnswer);

    return () => {
      socket.off("buzzerGranted", onBuzzer);
      socket.off("correctAnswer", onAnswer);
      socket.off("wrongAnswer", onAnswer);
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
              element={<Buzzer isBuzzerGranted={isGuessAllowed} setIsTurnOver={setIsTurnOver} />}
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
