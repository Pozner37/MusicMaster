import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

const URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SERVER_URL
    : "ws://localhost:3000/game-client";

export const socket = io(URL);
