import React from 'react';
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Habitos from './src/screens/Habitos';
import Estatistica from './src/screens/Estatistica';
import { SettingsStack } from './src/routes/SettingsStack';
import { Feather } from "@expo/vector-icons"

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: "#ad75fbff",
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
              <Feather name="bar-chart" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Ajustes"
          component={SettingsStack}
          options={({ route }) => {

            const routeName = getFocusedRouteNameFromRoute(route);
            const screensToHideTab = ['MinhaConta', 'Salvos', 'Sobre', 'Politica'];
            const isTabBarVisible = !screensToHideTab.includes(routeName);


            return ({
              tabBarIcon: ({ color, size }) => (
                <Feather name="settings" color={color} size={size} />
              ),

              tabBarStyle: {
                display: isTabBarVisible ? 'flex' : 'none',
                backgroundColor: "#171719",
                borderTopWidth: 0,
                height: 70,
                borderRadius: 50,
                position: "absolute",
                bottom: 25,
              }
            });
          }}
        />

      </Tab.Navigator>

    </NavigationContainer>
  );
}