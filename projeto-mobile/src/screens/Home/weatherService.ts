import axios from 'axios';

const API_KEY = '9daae7c84165de0fa938ae221265c927';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  weather: { description: string; icon: string }[];
  main: { temp: number };
  name: string;
  time: string;
}

export const getWeather = async (city: string = 'Petrópolis'): Promise<WeatherData | null> => {
  try {

    const trimmedCity = city.trim();
    if (!trimmedCity) {
      console.warn('Cidade não informada, busca ignorada.');
      return null;
    }


    const encodedCity = encodeURIComponent(trimmedCity);

    const response = await axios.get<Omit<WeatherData, 'time'>>(
      `${BASE_URL}?q=${encodedCity}&appid=${API_KEY}&units=metric&lang=pt_br`
    );


    const now = new Date();
    const formattedTime = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      ...response.data,
      time: formattedTime,
    };
  } catch (error: any) {

    const message = error?.response?.data?.message || error.message;
    console.error(`Erro ao buscar clima para "${city}":`, message);
    return null;
  }
};
