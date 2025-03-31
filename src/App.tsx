import { ThemeProvider } from '@/components/ThemeProvider';
import WeatherDashboard from '@/components/WeatherDashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-background text-foreground">
        <WeatherDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;