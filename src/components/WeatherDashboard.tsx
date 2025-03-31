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
import HourlyForecast from './weather/HourlyForecast';
import DailyForecast from './weather/DailyForecast';

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
        // Fetch current weather
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&appid=${API_KEY}&units=metric`
        );

        // Fetch forecast data using the OneCall API
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&appid=${API_KEY}&units=metric`
        );

        if (!currentResponse.ok) {
          const errorData = await currentResponse.json();
          console.error('Current weather API error:', currentResponse.status, currentResponse.statusText, errorData);
          throw new Error(`Failed to fetch current weather: ${errorData.message || currentResponse.statusText}`);
        }

        if (!forecastResponse.ok) {
          const errorData = await forecastResponse.json();
          console.error('Forecast API error:', forecastResponse.status, forecastResponse.statusText, errorData);
          throw new Error(`Failed to fetch forecast: ${errorData.message || forecastResponse.statusText}`);
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        console.log('Forecast API Response:', forecastData);
        console.log('Forecast Data List:', forecastData.list);

        console.log('Raw forecast data:', forecastData);
        
        if (!forecastData.list || !Array.isArray(forecastData.list)) {
          console.error('Invalid forecast data structure:', forecastData);
          throw new Error('Invalid forecast data received');
        }

        // Group forecast data by day for daily forecast
        const dailyForecasts = forecastData.list.reduce((acc: any[], item: any) => {
          const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
          if (!acc.find((day: any) => new Date(day.dt * 1000).setHours(0, 0, 0, 0) === date)) {
            acc.push(item);
          }
          return acc;
        }, []);

        console.log('Processed daily forecasts:', dailyForecasts);

        const transformedData = {
          current: {
            temp: currentData.main.temp,
            feels_like: currentData.main.feels_like,
            temp_min: currentData.main.temp_min,
            temp_max: currentData.main.temp_max,
            humidity: currentData.main.humidity,
            pressure: currentData.main.pressure,
            wind_speed: currentData.wind.speed,
            wind_deg: currentData.wind.deg,
            weather: currentData.weather,
            visibility: currentData.visibility,
            sunrise: currentData.sys.sunrise,
            sunset: currentData.sys.sunset,
            uvi: forecastData.current?.uvi || 0,
            aqi: 0,
          },
          hourly: forecastData.list.slice(0, 48).map((hour: any) => ({
            dt: hour.dt,
            temp: hour.main.temp,
            feels_like: hour.main.feels_like,
            humidity: hour.main.humidity,
            pressure: hour.main.pressure,
            wind_speed: hour.wind.speed,
            wind_deg: hour.wind.deg,
            weather: hour.weather,
            visibility: hour.visibility,
            pop: hour.pop || 0,
          })),
          daily: dailyForecasts.slice(0, 10).map((day: any) => ({
            dt: day.dt,
            temp: {
              min: day.main.temp_min,
              max: day.main.temp_max,
            },
            feels_like: day.main.feels_like,
            humidity: day.main.humidity,
            pressure: day.main.pressure,
            wind_speed: day.wind.speed,
            wind_deg: day.wind.deg,
            weather: day.weather,
            visibility: day.visibility,
            pop: day.pop || 0,
          })),
          alerts: forecastData.alerts,
        };

        console.log('Transformed hourly data:', transformedData.hourly);
        console.log('Transformed daily data:', transformedData.daily);

        setWeatherData(transformedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load weather data');
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
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Weather Monitor</h1>
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
          <Tabs defaultValue="current" className="space-y-6" onValueChange={(value) => {
            console.log('Tab changed to:', value);
            console.log('Weather data available:', {
              current: !!weatherData.current,
              hourly: !!weatherData.hourly,
              daily: !!weatherData.daily,
              hourlyLength: weatherData.hourly?.length,
              dailyLength: weatherData.daily?.length,
            });
          }}>
            <TabsList className="w-full">
              <TabsTrigger value="current" className="flex-1">Current Conditions</TabsTrigger>
              <TabsTrigger value="hourly" className="flex-1">48-Hour Forecast</TabsTrigger>
              <TabsTrigger value="daily" className="flex-1">10-Day Forecast</TabsTrigger>
              <TabsTrigger value="maps" className="flex-1">Weather Maps</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              {weatherData.current && <CurrentConditions data={weatherData.current} />}
            </TabsContent>

            <TabsContent value="hourly">
              {weatherData.hourly ? (
                weatherData.hourly.length > 0 ? (
                  <HourlyForecast data={weatherData.hourly} />
                ) : (
                  <div>No hourly forecast data available</div>
                )
              ) : (
                <div>Loading hourly forecast...</div>
              )}
            </TabsContent>

            <TabsContent value="daily">
              {weatherData.daily ? (
                weatherData.daily.length > 0 ? (
                  <DailyForecast data={weatherData.daily} />
                ) : (
                  <div>No daily forecast data available</div>
                )
              ) : (
                <div>Loading daily forecast...</div>
              )}
            </TabsContent>

            <TabsContent value="maps">
              <div className="h-[600px]">
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