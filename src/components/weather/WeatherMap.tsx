import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { City } from '@/types/weather';

interface WeatherMapProps {
  city: City;
}

export default function WeatherMap({ city }: WeatherMapProps) {
  const mapTypes = [
    { id: 'precipitation', name: 'Precipitation' },
    { id: 'temp', name: 'Temperature' },
    { id: 'wind', name: 'Wind' },
    { id: 'pressure', name: 'Pressure' },
  ];

  return (
    <div className="h-full rounded-lg overflow-hidden border">
      <iframe
        title="Weather Map"
        src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${city.latitude}&lon=${city.longitude}&zoom=10`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
}