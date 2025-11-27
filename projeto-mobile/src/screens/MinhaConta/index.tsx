// src/screens/MinhaConta/index.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from "./style";


const userData = {
  name: 'Pedro Vivarini',
  email: 'pedro@gmail.com',
  memberSince: 'Julho de 2023',
  profilePic: require('../../../assets/perfil.png'),
  insigniasCount: 5,
};

export default function MinhaConta() {

  const handleLogout = () => {
    console.log('Usuário deslogado!');
  };

  const handleDeleteAccount = () => {
    console.log('Excluir conta solicitada.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={userData.profilePic}
          style={styles.PerfilImage}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>Olá, {userData.name}</Text>
          <Text style={styles.memberText}>Membro desde {userData.memberSince}</Text>
          <Text style={styles.emailText}>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Insígnias • {userData.insigniasCount}</Text>
        <Text style={styles.statsSubtitle}>
          {userData.insigniasCount > 0 ? `Você ganhou ${userData.insigniasCount} insígnias.` : 'Sem insígnias por enquanto.'}
        </Text>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
        <Feather name="log-out" size={18} color="black" />
        <Text style={styles.actionText}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDeleteAccount}>
        <Feather name="trash-2" size={18} color="red" />
        <Text style={[styles.actionText, styles.deleteText]}>Excluir minha conta</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Versão do app: 1.1.13</Text>

    </ScrollView>
  );
}

