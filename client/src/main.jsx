import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Lenis from 'lenis';
import App from './App';
import './index.css';
import { UserProvider } from './context/UserContext';

function SmoothScrollProvider({ children }) {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: 'vertical',
    });

    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'));
    });

    let frameId = 0;

    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

