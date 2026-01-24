import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Remove initial loader once React takes over
const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  initialLoader.style.opacity = '0';
  initialLoader.style.transition = 'opacity 0.2s';
  setTimeout(() => initialLoader.remove(), 200);
}

createRoot(document.getElementById("root")!).render(<App />);
