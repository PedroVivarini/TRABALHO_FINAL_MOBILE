import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './style';

export default function Salvos() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.messageText}>
                    Sem itens salvos no momento.
                </Text>
            </View>
        </SafeAreaView>
    );
}