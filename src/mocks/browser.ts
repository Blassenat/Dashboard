import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/index';

export const worker = setupWorker(...handlers);

if (import.meta.env.DEV) {
  worker.start({ 
    onUnhandledRequest: 'warn',
  }).then(() => {
    console.log('[MSW] Mock service worker started');
  });
}