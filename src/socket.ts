import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "https://server.music-master.fun/game-client";

export const socket = io(URL);
