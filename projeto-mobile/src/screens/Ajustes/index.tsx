import { View, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style";

function handlePressButton() {

}

export default function Ajustes() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style ={styles.container}>
      <StatusBar barStyle={"dark-content"} />

      <View style ={styles.titulo}>
        <Text style ={styles.textTitulo}>Ajustes</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
          <Text style ={styles.textButton}>
            Minha conta
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
          <Text style ={styles.textButton}>
            Sobre
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
          <Text style ={styles.textButton}>
            Modo escuro
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
          <Text style ={styles.textButton}>
            Fale Conosco
          </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
          <Text style ={styles.textButton}>
            Sobre
          </Text>
      </TouchableOpacity>





    </SafeAreaView>
  )
}