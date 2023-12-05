
import 'package:flp/presentation/widgets/molecules/ChatApp.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) => const MaterialApp(
    home: ChatApp(),
  );
}
