import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Contato from './src/screens/Contato';
import Login from './src/screens/Login';
import Sobre from './src/screens/Sobre';
import { Feather } from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "green",
        tabBarLabelPosition:"below-icon",
      }}
      >
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Feather name="home" color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen name="Contato" component={Contato}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Feather name="phone-call" color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen name="Login" component={Login}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Feather name="log-in" color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen name="Sobre" component={Sobre}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Feather name="file-text" color={color} size={size} />;
            },
          }}
        />
      </Tab.Navigator>

    </NavigationContainer>
  );
}