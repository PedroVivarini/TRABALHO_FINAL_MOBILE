import React, { useState, useEffect } from 'react';
import {View,Text,ScrollView,StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

interface Habit {
  id: number;
  title: string;
  emoji: string;
  time: string;
}

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  return (
    <View style={styles.habitCard}>
      <View style={styles.habitContent}>
        <View style={styles.habitInfo}>
          <Text style={styles.habitEmoji}>{habit.emoji}</Text>
          <View style={styles.habitTextContainer}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitTime}>{habit.time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem('@habits');
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      } else {
        setHabits([
          { id: 1, title: 'Meditação matinal', emoji: '🧘', time: '07:00' },
          { id: 2, title: 'Ler por 30 minutos', emoji: '📚', time: '09:00' },
          { id: 3, title: 'Exercício físico', emoji: '💪', time: '18:00' },
          { id: 4, title: 'Estudar programação', emoji: '💻', time: '20:00' },
          { id: 5, title: 'Gratidão diária', emoji: '🙏', time: '22:00' },
        ]);
      }
    } catch (error) {
      console.error('Erro ao carregar hábitos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#232228" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hábitos do dia</Text>

        <View style={styles.habitsSection}>
          {habits.map(habit => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </View>
      </ScrollView>


    </View>
  );
}
