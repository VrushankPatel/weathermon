import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Sun, 
  Thermometer, 
  Wind, 
  Droplets, 
  Eye, 
  ArrowUp, 
  ArrowDown,
  Gauge,
  Sunrise,
  Sunset
} from 'lucide-react';

interface CurrentConditionsProps {
  data: {
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
}

export default function CurrentConditions({ data }: CurrentConditionsProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Function to determine UV index severity class
  const getUVIndexClass = (uvi: number) => {
    if (uvi <= 2) return "text-green-500";
    if (uvi <= 5) return "text-yellow-500";
    if (uvi <= 7) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-card/50 backdrop-blur-sm">
        <CardHeader className="py-6">
          <CardTitle className="flex items-center gap-4">
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].description}
              className="w-24 h-24"
            />
            <div>
              <div className="text-6xl font-bold">{Math.round(data.temp)}°C</div>
              <div className="text-xl text-muted-foreground capitalize">{data.weather[0].description}</div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-blue-500" />
            Temperature Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-red-500" />
              High
            </span>
            <span className="text-xl">{Math.round(data.temp_max)}°C</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <ArrowDown className="w-5 h-5 text-blue-500" />
              Low
            </span>
            <span className="text-xl">{Math.round(data.temp_min)}°C</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Feels Like</span>
            <span className="text-xl">{Math.round(data.feels_like)}°C</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Sun className="w-6 h-6 text-yellow-500" />
            Sun & Moon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <Sunrise className="w-5 h-5 text-orange-400" />
              Sunrise
            </span>
            <span>{formatTime(data.sunrise)}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <Sunset className="w-5 h-5 text-orange-600" />
              Sunset
            </span>
            <span>{formatTime(data.sunset)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>UV Index</span>
            <span className={`text-xl ${getUVIndexClass(data.uvi)}`}>{Math.round(data.uvi)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Wind className="w-6 h-6 text-cyan-500" />
            Wind & Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="flex justify-between">
            <span>Wind Speed</span>
            <span>{data.wind_speed} m/s</span>
          </div>
          <div className="flex justify-between">
            <span>Direction</span>
            <div className="flex items-center gap-2">
              <span style={{ transform: `rotate(${data.wind_deg}deg)` }} className="inline-block text-xl">
                ↑
              </span>
              <span>{data.wind_deg}°</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              Humidity
            </span>
            <span>{data.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              Visibility
            </span>
            <span>{(data.visibility / 1000).toFixed(1)} km</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-purple-500" />
              Pressure
            </span>
            <span>{data.pressure} hPa</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}