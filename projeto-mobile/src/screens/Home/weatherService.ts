import axios from 'axios';

const API_KEY = '9daae7c84165de0fa938ae221265c927';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  weather: { description: string; icon: string }[];
  main: { temp: number };
  name: string;
}

export const getWeather = async (city: string = 'Petrópolis'): Promise<WeatherData | null> => {
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clima:', error);
    return null;
  }
};
