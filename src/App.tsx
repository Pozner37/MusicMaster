import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import Login from "./components/Login";
import Buzzer from "./components/Buzzer";
import GuessPage from "./components/GuessPage.tsx";
import WaitingScreen from "./components/WaitingScreen.tsx";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSomeoneElseGuessing, setIsSomeoneElseGuessing] =
    useState<boolean>(false);
  const [roundStarted, setRoundStarted] = useState<boolean>(false);
  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(false);

  useEffect(() => {
    function onBuzzer() {
      setIsSomeoneElseGuessing(true);
    }

    function onAnswer() {
      setIsSomeoneElseGuessing(false);
    }

    function onRoundStarted() {
      setRoundStarted(true);
      !isGameInProgress && setIsGameInProgress(true);
    }

    function onRoundEnd() {
      onAnswer();
      setRoundStarted(false);
    }

    function onGameEnd() {
      setIsGameInProgress(false);
      setRoundStarted(false);
    }

    function emitToast(e: any) {
      console.log(e);
      const toastId = e.message;
      toast.error(toastId, {
        toastId,
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    socket.on("buzzer-granted", onBuzzer);
    socket.on("exception", emitToast);
    socket.on("buzzer-revoked", onAnswer);
    socket.on("round-started", onRoundStarted);
    socket.on("round-ended", onRoundEnd);
    socket.on("game-ended", onGameEnd);

    return () => {
      socket.off("buzzer-granted", onBuzzer);
      socket.off("buzzer-revoked", onAnswer);
      socket.off("round-started", onRoundStarted);
      socket.off("round-ended", onRoundEnd);
      socket.off("game-ended", onGameEnd);
      socket.off("exception", emitToast);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route
              path="/lobby"
              element={<WaitingScreen gameStarted={roundStarted} />}
            ></Route>
            <Route
              path="/buzzer"
              element={
                <Buzzer
                  isSomeoneElseGuessing={isSomeoneElseGuessing}
                  roundStarted={roundStarted}
                  isGameInProgress={isGameInProgress}
                />
              }
            ></Route>
            <Route
              path="/guess"
              element={<GuessPage isGameInProgress={isGameInProgress} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
