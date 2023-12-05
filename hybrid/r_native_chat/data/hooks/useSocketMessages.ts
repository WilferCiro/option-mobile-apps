// Created by Wilfer Ciro - Dec, 2023: wilcirom@gmail.com

// React
import { useEffect, useState } from "react";

// Node
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

// Data
import { appConfig } from "../constants/appConfig";

// Domain
import { MessageSchema } from "../../domain/interfaces/MessageSchema";

interface Props {
  onReceiveMessage: (data: MessageSchema) => void;
}

const useSocketMessages = ({ onReceiveMessage }: Props) => {
  const [hasConnection, setConnection] = useState<boolean>(false);
  let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  useEffect(() => {
    socket = io(appConfig.SERVER_URL, {
      transports: ["websocket"],
    });

    socket.io.on("open", () => {
      setConnection(true);
    });
    socket.io.on("close", () => setConnection(false));
    socket.on("responseMessage", (data: MessageSchema) => {
      onReceiveMessage(data);
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.timeout(5000).emit("sendMessage", {
      user: appConfig.SOCKET_NAME,
      message: message,
    });
  };

  return {
    hasConnection,
    sendMessage,
  };
};

export default useSocketMessages;
