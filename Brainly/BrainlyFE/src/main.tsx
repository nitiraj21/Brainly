import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


const script = document.createElement('script');
script.src = 'https://platform.twitter.com/widgets.js';
script.async = true;
script.charset = 'utf-8';
document.body.appendChild(script);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
