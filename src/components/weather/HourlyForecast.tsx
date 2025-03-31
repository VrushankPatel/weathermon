import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HourlyForecastProps {
  data: Array<{
    dt: number;
    temp: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    pop: number;
  }>;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  const formatHour = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>48-Hour Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {data.map((hour) => (
              <div
                key={hour.dt}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <span className="w-16">{formatHour(hour.dt)}</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                    alt={hour.weather[0].description}
                    className="w-10 h-10"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <span>{Math.round(hour.temp)}°C</span>
                  <span className="text-muted-foreground">
                    {(hour.pop * 100).toFixed(0)}% precip
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}