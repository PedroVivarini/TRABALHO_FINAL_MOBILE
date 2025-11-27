import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './style';

export default function Sobre() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                style={styles.safeArea}
            >
                <Text style={styles.sectionTitle}>Sobre o aplicativo:</Text>

                <Text style={styles.bodyText}>
                    Nossa missão é simples e profunda: queremos estar ao seu lado enquanto você busca uma conexão mais
                    profunda com Deus e uma compreensão mais completa da Sua Palavra. Criamos este aplicativo para ser seu companheiro diário,
                    oferecendo ferramentas práticas para o estudo bíblico e para o fortalecimento da sua fé, onde quer que você esteja.
                </Text>

                <Text style={styles.bodyText}>
                    Acreditamos que o relacionamento com Deus é a base de uma vida plena e significativa. Sabemos que a jornada de fé pode ter seus desafios e que,
                    em um mundo tão acelerado, manter momentos diários de reflexão, oração e estudo pode ser difícil. Por isso, nossa equipe de cristãos dedicados
                    e apaixonados se reuniu para desenvolver uma plataforma acessível, prática e inspiradora, onde você pode encontrar o suporte que precisa para crescer espiritualmente a cada dia.
                </Text>

                <Text style={styles.sectionTitle}>O Que Você Vai Encontrar Aqui</Text>

                <Text style={styles.bodyText}>
                    Nosso aplicativo oferece um espaço acolhedor, pensado para atender às suas necessidades espirituais e fortalecer sua caminhada cristã. Nele, você encontrará:
                </Text>

                <Text style={styles.listItem}>
                    • Plano de Leitura Bíblica Anual: Siga um plano de leitura que guia você por toda a Bíblia em um ano, facilitando o compromisso diário com a Palavra.
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
}