import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Switch, } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style";
import { Feather } from '@expo/vector-icons';

export default function Ajustes() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderNavButton = (iconName, label, screenName) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleNavigate(screenName)}
    >
      <View style={styles.leftContent}>
        <Feather name={iconName} size={20} color="white" style={styles.icon} />
        <Text style={styles.labelText}>| {label}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#a0a0a0" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      <View style={styles.titulo}>
        <Text style={styles.textTitulo}>Ajustes</Text>
      </View>

      {renderNavButton('user', 'Minha conta', 'MinhaConta')}

      {renderNavButton('bookmark', 'Salvos', 'Salvos')}

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={toggleDarkMode}
        activeOpacity={1}
      >
        <View style={styles.leftContent}>
          <Feather name="moon" size={20} color="white" style={styles.icon} />
          <Text style={styles.labelText}>| Modo escuro</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#50B060" }}
          thumbColor={isDarkMode ? "white" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </TouchableOpacity>

      {renderNavButton('info', 'Sobre', 'Sobre')}

      {renderNavButton('file', 'Politica de privacidade', 'Politica')}

    </SafeAreaView>
  );
}

