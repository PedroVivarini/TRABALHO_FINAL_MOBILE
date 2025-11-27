import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './style'; 

export default function Politica() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.container}
                style={styles.safeArea}
            >
                <Text style={styles.header}>Política de Privacidade</Text>

                <Text style={styles.bodyText}>
                    A privacidade e a segurança das informações dos nossos usuários são prioritárias. Este documento explica como coletamos, 
                    usamos, compartilhamos e protegemos suas informações. Ao utilizar nosso aplicativo de hábitos, você concorda com esta Política de Privacidade.
                </Text>

                <Text style={styles.sectionTitle}>1. Coleta de Informações Pessoais</Text>
                <Text style={styles.bodyText}>
                    Para oferecer uma experiência personalizada, podemos coletar:
                </Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>• Nome e endereço de e-mail, para criação e gerenciamento de conta.</Text>
                    <Text style={styles.listItem}>• Dados de uso do aplicativo, incluindo o progresso e o rastreamento dos seus hábitos.</Text>
                    <Text style={styles.listItem}>• Informações do dispositivo e do sistema operacional, para suporte técnico e análise de desempenho.</Text>
                </View>

                <Text style={styles.sectionTitle}>2. Uso das Informações</Text>
                <Text style={styles.bodyText}>
                    As informações coletadas são usadas exclusivamente para:
                </Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>• Personalizar sua experiência e oferecer sugestões de hábitos.</Text>
                    <Text style={styles.listItem}>• Enviar notificações e lembretes para auxiliar na sua rotina de hábitos.</Text>
                    <Text style={styles.listItem}>• Melhorar a qualidade do aplicativo e analisar o desempenho de novas funcionalidades.</Text>
                </View>

                <Text style={styles.updateText}>
                    Última Atualização: Novembro de 2025
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}