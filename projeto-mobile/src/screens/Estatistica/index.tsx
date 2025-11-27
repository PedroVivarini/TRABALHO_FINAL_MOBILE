import React, { useMemo } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { styles } from './style';

const MOCK_STATS = {
  longestStreak: 42,
  totalHabitsCompleted: 150,
  completionRate: 0.85,
  currentStreak: 7,
  habitDetails: [
    { name: 'Ler 20 min', completed: 60, target: 70, progress: 0.85 },
    { name: 'Beber 8 copos de água', completed: 150, target: 160, progress: 0.93 },
    { name: 'Meditar 10 min', completed: 40, target: 50, progress: 0.80 },
    { name: 'Exercitar 30 min', completed: 35, target: 45, progress: 0.77 },
  ],
};

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const animatedWidth = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedWidth]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.progressBar, { width }]} />
    </View>
  );
};

const StatisticsScreen: React.FC = () => {
  const { longestStreak, completionRate, currentStreak, totalHabitsCompleted, habitDetails } = MOCK_STATS;
  const completionRatePercentage = (completionRate * 100).toFixed(0) + '%';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🏆 Seu Progresso de Hábitos</Text>

      <View style={styles.metricCard}>
        <Text style={styles.metricTitle}>MAIOR SEQUÊNCIA CONSECUTIVA</Text>
        <Text style={styles.metricValue}>{longestStreak} dias</Text>
        <Text style={styles.metricTitle}>Não quebre a corrente! Sequência Atual: {currentStreak} dias</Text>
      </View>

      <Text style={styles.sectionTitle}>Visão Geral</Text>
      
      <View style={styles.detailCard}>
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailLabel}>Taxa Média de Conclusão</Text>
          <Text style={styles.detailValue}>{completionRatePercentage}</Text>
        </View>
      </View>

      <View style={[styles.detailCard, { borderLeftColor: '#42A5F5' }]}>
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailLabel}>Total de Check-ins (Concluídos)</Text>
          <Text style={styles.detailValue}>{totalHabitsCompleted} vezes</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Metas de Hábitos</Text>

      {habitDetails.map((habit, index) => (
        <View 
          key={index} 
          style={[
            styles.detailCard, 
            { borderLeftColor: habit.progress > 0.8 ? styles.metricCard.backgroundColor : styles.detailCard.borderLeftColor }
          ]}
        >
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>{habit.name}</Text>
            <Text style={styles.detailValue}>
              {((habit.progress * 100).toFixed(0))}% Concluído 
              <Text style={{ fontWeight: 'normal', fontSize: 14, color: styles.detailLabel.color }}> ({habit.completed}/{habit.target})</Text>
            </Text>
            <ProgressBar progress={habit.progress} />
          </View>
        </View>
      ))}
      
      <View style={{ height: 40 }} /> 
    </ScrollView>
  );
};

export default StatisticsScreen;
