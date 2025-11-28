import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Cadastro from "./src/screens/Cadastro";
import Habitos from "./src/screens/Habitos";
import Estatistica from "./src/screens/Estatistica";
import { SettingsStack } from "./src/routes/SettingsStack";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: "#ad75fb",
          tabBarLabelPosition: "below-icon",

          tabBarIconStyle: { marginTop: 5 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },

          tabBarStyle: {
            backgroundColor: "#171719",
            borderTopWidth: 0,
            height: 70,
            borderRadius: 50,
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
          },
        }}
      >

        {/* CADASTRO - voltou pra tab */}
        <Tab.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user-plus" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="log-in" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Hábitos"
          component={Habitos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="loader" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Estatísticas"
          component={Estatistica}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="bar-chart-2" color={color} size={size} />
            ),
          }}
        />

        {/* AJUSTES COM STACK + HIDE TAB */}
        <Tab.Screen
          name="Ajustes"
          component={SettingsStack}
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "AjustesHome";

            const screensToHideTab = ["MinhaConta", "Salvos", "Sobre", "Politica"];

            const hideTab = screensToHideTab.includes(routeName);

            return {
              tabBarIcon: ({ color, size }) => (
                <Feather name="settings" color={color} size={size} />
              ),
              tabBarStyle: hideTab
                ? { display: "none" }
                : {
                    backgroundColor: "#171719",
                    borderTopWidth: 0,
                    height: 70,
                    borderRadius: 50,
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                  },
            };
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
