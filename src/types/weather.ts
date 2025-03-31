export interface City {
  id: number;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    visibility: number;
    uvi: number;
    sunrise: number;
    sunset: number;
    aqi: number;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    pop: number;
  }>;
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    pop: number;
    moon_phase: number;
  }>;
  alerts?: Array<{
    event: string;
    description: string;
    start: number;
    end: number;
  }>;
}