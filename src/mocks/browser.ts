/** ───────────────────────────────────────────
 *  MSW Browser Setup
 *  Initializes Mock Service Worker in browser
 *  ─────────────────────────────────────────── */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
