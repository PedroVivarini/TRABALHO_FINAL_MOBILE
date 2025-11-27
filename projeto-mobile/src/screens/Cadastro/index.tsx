import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../service/api";
import { styles } from "./style";

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro() {
    if (!nome || !email || !senha) {
      Alert.alert("Erro!", "Preencha todos os campos.");
      return;
    }

    try {
      await api.post("/cadastro", { nome, email, senha });
      Alert.alert("Sucesso!", "Conta criada com sucesso!");

      navigation.navigate("Login");

    } catch (erro) {
      Alert.alert("Erro!", "Tente novamente mais tarde.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.areaInput}>
        <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome}/>
      </View>

      <View style={styles.areaInput}>
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail}/>
      </View>

      <View style={styles.areaInput}>
        <TextInput placeholder="Senha" style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry/>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
        <Text style={styles.submitText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
