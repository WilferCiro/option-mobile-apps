// Created by Wilfer Ciro - Dec, 2023: wilcirom@gmail.com

// React
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Presentation
import ChatPage from "./presentation/pages/ChatPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
