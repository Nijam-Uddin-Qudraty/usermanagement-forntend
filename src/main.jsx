import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";

import "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";

import $ from "jquery";
window.$ = $;
window.jQuery = $;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
