import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'sonner';
import { useThemeStore } from './store/themeStore';
import { Preloader } from './components/ui/Preloader';

export function App() {
  const { theme } = useThemeStore();
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <BrowserRouter>
      {showPreloader && (
        <Preloader
          duration={2600}
          onComplete={() => setShowPreloader(false)}
        />
      )}
      <Toaster theme={theme} position="top-right" richColors closeButton />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
