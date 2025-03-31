import { ThemeProvider } from '@/components/ThemeProvider';
import WeatherDashboard from '@/components/WeatherDashboard';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-background text-foreground">
        <WeatherDashboard />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;