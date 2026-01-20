import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force HTTPS on production (not on localhost)
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && window.location.protocol === 'http:') {
  window.location.protocol = 'https:';
}

createRoot(document.getElementById("root")!).render(<App />);
