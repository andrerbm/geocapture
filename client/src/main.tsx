import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;">
      <div style="text-align: center; padding: 2rem;">
        <h1 style="color: #ef4444; margin-bottom: 1rem;">Erro ao carregar a aplicação</h1>
        <p style="color: #6b7280;">Por favor, recarregue a página ou entre em contato com o suporte.</p>
        <pre style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem; text-align: left; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    </div>
  `;
}
