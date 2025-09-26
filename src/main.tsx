import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './js/utils/constants.js'
import './js/utils/helpers.js'
import './js/components/modal.js'
import './js/components/notifications.js'
import './js/components/navigation.js'
import './js/auth/auth.js'
import './js/dashboards/superadmin.js'
import './js/dashboards/admin.js'
import './js/dashboards/green-champion.js'
import './js/dashboards/worker.js'
import './js/dashboards/citizen.js'
import './js/features/complaints.js'
import './js/features/tracking.js'
import './js/features/training.js'
import './js/features/ecommerce.js'
import './js/main.js'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
