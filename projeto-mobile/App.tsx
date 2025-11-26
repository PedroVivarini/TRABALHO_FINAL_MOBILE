import React from 'react';
import { View, Text } from 'react-native';
import AppRouter from './src/routes/AppRouter';
import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Login from './src/screens/Login'; 
import Ajustes from './src/screens/Ajustes';
import { Feather } from "@expo/vector-icons"
import Habitos from './src/screens/Habitos';
import Estatistica from './src/screens/Estatistica';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <AppRouter />
          <View>
      <Text>Trabalho mobile</Text>
    </View>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: "#a42dffff",
          tabBarLabelPosition: "below-icon",

          tabBarIconStyle: {
            marginTop: 5,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },

          tabBarStyle: {
            backgroundColor: "#171719",
            borderTopWidth: 0,
            height: 70,
            borderRadius: 50,
            position: "absolute",
            bottom: 25,
          }
        }}
      >

        <Tab.Screen
          name="Home" component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Hábitos" component={Habitos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="loader" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Login" component={Login}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="log-in" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Estáticas" component={Estatistica}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="check-circle" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Ajustes" component={Ajustes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>

    </NavigationContainer>
  );
}
