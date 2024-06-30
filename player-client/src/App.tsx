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

  useEffect(() => {
    function onBuzzer() {
      setIsGuessAllowed(true);
    }

    socket.on("buzzerGranted", onBuzzer);

    return () => {
      socket.off("buzzerGranted", onBuzzer);
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
              element={<Buzzer isBuzzerGranted={isGuessAllowed} />}
            ></Route>
            <Route
              path="/main"
              element={<MainPage username={username} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
