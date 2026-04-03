import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/i18n';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  const workerUrl = `${import.meta.env.BASE_URL}mockServiceWorker.js`;

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: workerUrl,
      options: {
        scope: import.meta.env.BASE_URL,
      },
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
