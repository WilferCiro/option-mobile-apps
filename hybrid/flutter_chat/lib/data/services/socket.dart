import 'package:flp/data/constants.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketIOApp {
  static final SocketIOApp _instance = SocketIOApp._internal();
  late IO.Socket _socket;
  late Function(String, String) addMessage;
  late Function(bool) setConnected;
  bool _connected = false;

  factory SocketIOApp(Function(String, String) addMessage, Function(bool) setConnected) {
    _instance.addMessage = addMessage;
    _instance.setConnected = setConnected;
    return _instance;
  }
  SocketIOApp._internal() {
    _socket = IO.io('https://socket-io-4ed0.onrender.com', <String, dynamic>{
      'transports': ['websocket'],
      'forceTrue': true
    });
    _socket.onConnect((_) {
      print("CONECTADO");
      _connected = true;
      setConnected(true);
    });
    _socket.on('responseMessage', onReadServer);
  }

  bool isConnected () {
    return _connected;
  }
  void sendMessage(String message) {
    _socket.emit('sendMessage', {"message": message, "user": appUserID});
  }
  void onReadServer(data) {
    if (data["user"] != appUserID) {
      addMessage(data["message"], data["user"]);
    }
  }
}