import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface WeatherAlertsProps {
  alerts: Array<{
    event: string;
    description: string;
    start: number;
    end: number;
  }>;
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Weather Alerts</h2>
      {alerts.map((alert, index) => (
        <Alert key={index} variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{alert.event}</AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <p>{alert.description}</p>
            <p className="text-sm">
              From: {formatTime(alert.start)}
              <br />
              Until: {formatTime(alert.end)}
            </p>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}