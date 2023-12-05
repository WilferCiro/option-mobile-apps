// Created by Wilfer Ciro - Dec, 2023: wilcirom@gmail.com

// React
import { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

// Data
import useSocketMessages from "../../../data/hooks/useSocketMessages";

// Domain
import { ChatMessageSchema } from "../../../domain/interfaces/ChatMessageSchema";
import { MessageSchema } from "../../../domain/interfaces/MessageSchema";
import { appConfig } from "../../../data/constants/appConfig";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ChatPage({ navigation }: Props) {
  const [messages, setMessages] = useState<ChatMessageSchema[]>([]);

  const onReceiveMessage = (message: MessageSchema) => {
    console.log(message);
    if (message.user !== appConfig.SOCKET_NAME) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random(),
            text: message.message,
            createdAt: new Date(),
            user: {
              name: message.user,
              _id: 2,
            },
          },
        ])
      );
    }
  };
  const { hasConnection, sendMessage } = useSocketMessages({
    onReceiveMessage,
  });

  useEffect(() => {
    navigation.setOptions({
      title: hasConnection
        ? "Option Chat -- conectado"
        : "Option Chat -- desconectado",
    });
  }, [navigation, hasConnection]);

  const onSend = useCallback((newMessages: ChatMessageSchema[]) => {
    console.log(newMessages);
    if (newMessages.length > 0 && newMessages.at(-1)?.text) {
      sendMessage(newMessages[0].text);
      setMessages((previousMessages: ChatMessageSchema[]) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    }
  }, []);
  return (
    <>
      <StatusBar style="auto" />
      <GiftedChat
        alignTop={true}
        disableComposer={!hasConnection}
        messages={messages}
        onSend={(newMessages) => onSend(newMessages as ChatMessageSchema[])}
        user={{
          _id: 1,
        }}
      />
    </>
  );
}
