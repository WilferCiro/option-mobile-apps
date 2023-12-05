import 'package:flp/data/services/socket.dart';
import 'package:flp/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_chat_types/flutter_chat_types.dart' as types;
import 'package:flutter_chat_ui/flutter_chat_ui.dart';
import 'package:flp/data/constants.dart';

class ChatApp extends StatefulWidget {
  const ChatApp({super.key});

  @override
  State<ChatApp> createState() => _ChatAppState();
}

class _ChatAppState extends State<ChatApp> {
  final List<types.Message> _messages = [];
  final _user = const types.User(id: appUserID);
  bool _connected = false;

  late final SocketIOApp socketApp;

  void setConnected(bool connected) {
    setState(() {
      _connected = connected;
    });
  }

  @override
  void initState() {
    super.initState();
    socketApp = SocketIOApp(onAddMessage, setConnected);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Option Chat -- ${_connected ? "Conectado" : "Desconectado"}'),
        ),
        body: Chat(
          messages: _messages,
          onSendPressed: _handleSendPressed,
          user: _user,
          showUserAvatars: true,
        ),
      );

  void _addMessage(types.Message message) {
    setState(() {
      _messages.insert(0, message);
    });
  }

  void _handleSendPressed(types.PartialText message) {
    final textMessage = types.TextMessage(
      author: _user,
      createdAt: DateTime.now().millisecondsSinceEpoch,
      id: randomString(),
      text: message.text,
    );

    _addMessage(textMessage);
    socketApp.sendMessage(textMessage.text);
  }

  void onAddMessage(String message, String user) {
    final textMessage = types.TextMessage(
      author: types.User(id: user),
      createdAt: DateTime.now().millisecondsSinceEpoch,
      id: randomString(),
      text: message,
    );
    _addMessage(textMessage);
  }
}
