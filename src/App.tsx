import WeatherDashboard from '@/components/WeatherDashboard';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="weather-theme">
      <WeatherDashboard />
    </ThemeProvider>
  );
}

export default App;