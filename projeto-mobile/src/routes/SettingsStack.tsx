import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ajustes from '../screens/Ajustes/index'
import MinhaConta from '../screens/MinhaConta/index';
import Salvos from '../screens/Salvos';
import Sobre from '../screens/Sobre';
import Politica from '../screens/PoliticaDePrivacidade';

const Stack = createStackNavigator();

export function SettingsStack() {
    return (
        <Stack.Navigator
            initialRouteName="AjustesHome"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#232228",
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTintColor: '#fff',
                headerTitle: '',
            }}
        >
            <Stack.Screen
                name="AjustesHome"
                component={Ajustes}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="MinhaConta"
                component={MinhaConta}
            />

            <Stack.Screen
                name="Salvos"
                component={Salvos}
            />

            <Stack.Screen
                name="Sobre"
                component={Sobre}
            />

            <Stack.Screen
                name="Politica"
                component={Politica}
            />

        </Stack.Navigator>
    );
}