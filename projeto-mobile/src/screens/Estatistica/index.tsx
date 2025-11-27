import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { styles } from './style';

const statisticsData = {
  totalFiles: 452,
  totalLines: 78912,
  languages: [
    { name: 'TypeScript', value: 45.3 },
    { name: 'JavaScript', value: 30.1 },
    { name: 'CSS', value: 15.6 },
    { name: 'Python', value: 5.0 },
    { name: 'Outras', value: 4.0 },
  ],
  commitCount: 1240,
  lastCommit: '2 minutos atrás',
};

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const LanguageBar: React.FC<{ name: string; percentage: number }> = ({ name, percentage }) => {

  return (
    <View style={styles.languageContainer}>
      <Text style={styles.languageName}>{name}</Text>
      <View style={styles.languageBarWrapper}>
        <View style={[styles.languageBar, { width: `${percentage}%` }]} />
        <Text style={styles.languagePercentage}>{`${percentage}%`}</Text>
      </View>
    </View>
  );
};

export const Estatistica: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Estatísticas do Projeto</Text>

        <View style={styles.statsRow}>
          <StatItem label="Arquivos Totais" value={statisticsData.totalFiles} />
          <StatItem label="Linhas de Código" value={statisticsData.totalLines.toLocaleString('pt-BR')} />
        </View>

        <Text style={styles.sectionHeader}>Distribuição de Linguagens</Text>
        <View style={styles.languagesSection}>
          {statisticsData.languages.map((lang, index) => (
            <LanguageBar key={index} name={lang.name} percentage={lang.value} />
          ))}
        </View>

        <Text style={styles.sectionHeader}>Controle de Versão (Git)</Text>
        <View style={styles.statsRow}>
          <StatItem label="Total de Commits" value={statisticsData.commitCount} />
          <StatItem label="Último Commit" value={statisticsData.lastCommit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Estatistica; 