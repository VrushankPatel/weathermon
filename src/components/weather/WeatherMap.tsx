import type { City } from '@/types/weather';

interface WeatherMapProps {
  city: City;
}

export default function WeatherMap({ city }: WeatherMapProps) {

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