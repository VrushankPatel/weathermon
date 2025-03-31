import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon } from 'lucide-react';

interface DailyForecastProps {
  data: Array<{
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
}

export default function DailyForecast({ data }: DailyForecastProps) {
  const formatDay = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getMoonPhase = (phase: number) => {
    if (phase === 0 || phase === 1) return '🌑 New Moon';
    if (phase < 0.25) return '🌒 Waxing Crescent';
    if (phase === 0.25) return '🌓 First Quarter';
    if (phase < 0.5) return '🌔 Waxing Gibbous';
    if (phase === 0.5) return '🌕 Full Moon';
    if (phase < 0.75) return '🌖 Waning Gibbous';
    if (phase === 0.75) return '🌗 Last Quarter';
    return '🌘 Waning Crescent';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>10-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((day) => (
            <div
              key={day.dt}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <span className="w-32">{formatDay(day.dt)}</span>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  className="w-10 h-10"
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  <span className="text-sm text-muted-foreground">
                    {getMoonPhase(day.moon_phase)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">
                    {Math.round(day.temp.min)}°
                  </span>
                  <span>{Math.round(day.temp.max)}°C</span>
                </div>
                <span className="w-20 text-right text-muted-foreground">
                  {(day.pop * 100).toFixed(0)}% precip
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}