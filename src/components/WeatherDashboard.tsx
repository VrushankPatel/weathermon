import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { indianCities } from '@/data/indian-cities';
import { WeatherData, City } from '@/types/weather';
import CurrentConditions from './weather/CurrentConditions';
import WeatherAlerts from './weather/WeatherAlerts';
import WeatherMap from './weather/WeatherMap';
import { ThemeToggle } from './ThemeToggle';

// Replace with your OpenWeatherMap API key
const API_KEY = 'baf815d606ba5cf519c346e7413c0421';

export default function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState<City>(indianCities[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&appid=${API_KEY}&units=metric&exclude=minutely`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch weather data');
        }

        const data = await response.json();
        const transformedData = {
          current: {
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            wind_deg: data.wind.deg,
            weather: data.weather,
            visibility: data.visibility,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            uvi: 0,
            aqi: 0,
          },
          hourly: [],
          daily: [],
        };
        setWeatherData(transformedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load weather data. Please try again later.');
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [selectedCity]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontFamily: "'Arial Black', sans-serif",
            letterSpacing: '0.05em'
          }}>
            Weather Monitor
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Select
              value={selectedCity.id.toString()}
              onValueChange={(value) => {
                const city = indianCities.find((c) => c.id.toString() === value);
                if (city) setSelectedCity(city);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {indianCities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}, {city.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {weatherData && (
          <Tabs defaultValue="current" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current" className="text-lg py-3">Current Conditions</TabsTrigger>
              <TabsTrigger value="maps" className="text-lg py-3">Weather Maps</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="flex-1 overflow-auto">
              <div className="h-full">
                {weatherData.current && <CurrentConditions data={weatherData.current} />}
              </div>
            </TabsContent>

            <TabsContent value="maps" className="flex-1">
              <div className="h-full">
                <WeatherMap city={selectedCity} />
              </div>
            </TabsContent>
          </Tabs>
        )}

        {weatherData?.alerts && weatherData.alerts.length > 0 && (
          <Card className="mt-6">
            <WeatherAlerts alerts={weatherData.alerts} />
          </Card>
        )}
      </div>
    </div>
  );
}