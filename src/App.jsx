import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'sonner';
import { useThemeStore } from './store/themeStore';
import { Preloader } from './components/ui/Preloader';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

export function App() {
  const { theme } = useThemeStore();
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {showPreloader && (
          <Preloader
            duration={2000}
            onComplete={() => setShowPreloader(false)}
          />
        )}
        <Toaster theme={theme} position="top-right" richColors closeButton />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
