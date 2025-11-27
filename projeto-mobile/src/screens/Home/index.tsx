import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, ImageBackground, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { styles } from './style';
import { getWeather, WeatherData } from './weatherService';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Alert, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import sunnyBackground from '../../../assets/sunny.png';
import cloudyBackground from '../../../assets/cloudy.png';
import rainyBackground from '../../../assets/rainy.png';


const motivationalPhrases = [
  'Pequenos passos constroem grandes mudanças.',
  'Cuide de você hoje, o futuro agradece.',
  'Constância supera intensidade.',
  'Você não precisa ser perfeito, só presente.',
  'Seu melhor hoje já é suficiente.',
  'Transformação começa com uma decisão.',
  'Celebre cada vitória, por menor que pareça.',
  'Disciplina é um ato de amor próprio.',
];

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [showSplash, setShowSplash] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [city, setCity] = useState('Petrópolis');

  useEffect(() => {
    async function loadPhrase() {
      const savedIndex = await AsyncStorage.getItem('phraseIndex');
      if (savedIndex !== null) {
        setPhraseIndex(Number(savedIndex));
      } else {
        setPhraseIndex(Math.floor(Math.random() * motivationalPhrases.length));
      }
    }
    loadPhrase();

    async function fetchWeather() {
      const data = await getWeather(city);
      setWeather(data);
    }
    fetchWeather();

    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);

    return () => clearTimeout(splashTimer);
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % motivationalPhrases.length;
        AsyncStorage.setItem('phraseIndex', String(newIndex));
        return newIndex;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? true;
      setIsConnected(connected);

      if (connected) {
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 60000);
      } else {
        setShowBanner(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePhraseChange = () => {
    setPhraseIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % motivationalPhrases.length;
      AsyncStorage.setItem('phraseIndex', String(newIndex));
      return newIndex;
    });
  };

  const getBackgroundImage = (description: string) => {
    const lower = description.toLowerCase();
    if (lower.includes('nublado')) return cloudyBackground;
    if (lower.includes('chuva')) return rainyBackground;
    return sunnyBackground;
  };

  const formatWeatherDescription = (description: string) => {
    const lower = description.toLowerCase();
    if (lower.includes('nublado')) return description + ' ';
    if (lower.includes('chuva')) return description + ' ';
    if (lower.includes('ensolarado')) return description + ' ';
    return description;
  };

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    const rawDate = new Date().toLocaleDateString('pt-BR', options);
    return rawDate.charAt(0).toUpperCase() + rawDate.slice(1).toLowerCase();
  };

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.splashContainer}>
          <Animatable.Image
            source={require('../../../assets/logo.png')}
            animation="fadeInDown"
            duration={60}
            style={styles.splashLogo}
          />
          <Animatable.Text animation="fadeInDown" duration={60} style={styles.splashTitle}>
            Transforme sua rotina com este aplicativo!
          </Animatable.Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const handleSearch = () => {
    const trimmed = city.trim();

    if (trimmed.length === 0) {
      return;
    }

    getWeather(trimmed).then((data) => {
      if (data) {
        setWeather(data);
      } else {
        Alert.alert('Cidade não encontrada', 'Verifique o nome e tente novamente.');
      }
    });
  };


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

        {showBanner && (
          <Animatable.View
            animation={isConnected ? 'fadeOutUp' : 'slideInDown'}
            duration={1000}
            delay={isConnected ? 6000 : undefined}
            easing="ease-out"
            style={[
              styles.offlineBanner,
              { backgroundColor: isConnected ? 'green' : 'red' },
            ]}
          >
            <Animatable.Text style={styles.offlineText}>
              {isConnected ? 'Conectado à internet' : 'Sem conexão com a internet'}
            </Animatable.Text>
          </Animatable.View>
        )}

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >

          <View style={styles.introHeader}>
            <Text style={styles.introTitle}>Bem-vindo(a) ao seu</Text>
            <Text style={styles.introTitleHighlight}>Aplicativo Hábitos Saudáveis</Text>
            <Text style={styles.introSubtitle}>
              Um pequeno passo de cada vez!
            </Text>
          </View>


          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Frase motivacional</Text>
            <Animatable.View animation="fadeInUp" duration={800} style={styles.motivationalBox}>
              <Animatable.Text
                animation="pulse"
                duration={1500}
                style={styles.motivationalText}
                onPress={handlePhraseChange}
              >
                {motivationalPhrases[phraseIndex]}
              </Animatable.Text>
            </Animatable.View>
          </View>


          <View style={styles.searchBox}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Digite a cidade..."
                placeholderTextColor="#aaa"
                value={city}
                onChangeText={setCity}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity onPress={handleSearch}>
                <Feather name="search" size={22} color="#555" />
              </TouchableOpacity>
            </View>
          </View>



          {weather && (
            <Animatable.View animation="fadeInUp" duration={1000} style={styles.weatherCard}>
              <ImageBackground
                source={getBackgroundImage(weather.weather[0].description)}
                style={styles.weatherBackground}
                imageStyle={styles.weatherImage}
              >
                <View style={styles.weatherOverlay}>
                  <Text style={styles.sectionTitle}>Previsão do Tempo</Text>
                  <Text style={styles.weatherDate}>
                    {getFormattedDate()} - {getFormattedTime()}
                  </Text>
                  <Text style={styles.weatherTemp}>
                    {Math.round(weather.main.temp)}°C  {weather.name}
                  </Text>
                  <Text style={styles.weatherDesc}>
                    {formatWeatherDescription(weather.weather[0].description)}
                  </Text>
                </View>
              </ImageBackground>
            </Animatable.View>
          )}


          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Benefícios do app</Text>
            {[
              {
                emoji: '❤️',
                titulo: 'Saúde em Primeiro Lugar',
                descricao: 'Cuide do seu corpo e mente com hábitos que fazem a diferença',
              },
              {
                emoji: '🎯',
                titulo: 'Metas Alcançáveis',
                descricao: 'Pequenos passos diários levam a grandes transformações',
              },
              {
                emoji: '📈',
                titulo: 'Progresso Visível',
                descricao: 'Acompanhe sua evolução e celebre cada conquista',
              },
            ].map((item, index) => (
              <View key={index} style={styles.beneficioCard}>
                <View style={styles.beneficioLinha}>
                  <Text style={styles.beneficioEmoji}>{item.emoji}</Text>
                  <View style={styles.beneficioTexto}>
                    <Text style={styles.beneficioTitulo}>{item.titulo}</Text>
                    <Text style={styles.beneficioDescricao}>{item.descricao}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>


          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Como o app pode te ajudar?</Text>
            {[
              {
                titulo: 'Crie sua rotina ideal',
                descricao:
                  'Defina os hábitos que você quer desenvolver e os horários que melhor se encaixam no seu dia.',
              },
              {
                titulo: 'Acompanhe seu progresso',
                descricao:
                  'Marque cada hábito completado e veja sua evolução ao longo do tempo. A consistência é a chave!',
              },
              {
                titulo: 'Celebre suas conquistas',
                descricao:
                  'Cada dia completo é uma vitória. Mantenha a motivação e construa uma vida mais saudável.',
              },
            ].map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.titulo}</Text>
                  <Text style={styles.stepDescription}>{step.descricao}</Text>
                </View>
              </View>
            ))}
          </View>


          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Hábitos importantes para o dia a dia</Text>
            {[
              ['🧘', 'Pratique meditação'],
              ['💪', 'Movimente seu corpo regularmente'],
              ['📚', 'Dedique tempo ao aprendizado'],
              ['💧', 'Mantenha-se hidratado'],
              ['😴', 'Durma pelo menos 8 horas'],
              ['🥗', 'Alimente-se de forma equilibrada'],
            ].map(([emoji, texto], index) => (
              <View key={index} style={styles.habitoEssencialItem}>
                <Text style={styles.habitoEssencialEmoji}>{emoji}</Text>
                <Text style={styles.habitoEssencialTexto}>{texto}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}