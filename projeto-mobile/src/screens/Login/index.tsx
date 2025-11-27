import { View, Text, Alert, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //funcao
  const handleLogin = async () => {
    try {
      const resp = await api.post("/login", { email, senha: password });
      const { token } = resp.data;

      if (!token) {
        Alert.alert("Erro!", "Token inválido recebido do servidor.");
        return;
      }

      await AsyncStorage.setItem("token", token);
      setToken(token);
      
      navigation.navigate("Home");

    } catch (error) {
      Alert.alert("Erro!", "Usuário ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/perfil.png")} />

      <View style={styles.areaInput}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.areaInput}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.submitText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
