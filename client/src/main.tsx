import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/i18n";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Adicionar handler global de erros não capturados
window.addEventListener("error", (event) => {
  console.error("Uncaught error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;">
      <div style="text-align: center; padding: 2rem;">
        <h1 style="color: #ef4444; margin-bottom: 1rem;">Erro ao carregar a aplicação</h1>
        <p style="color: #6b7280;">Por favor, recarregue a página ou entre em contato com o suporte.</p>
        <pre style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem; text-align: left; overflow: auto; font-size: 12px;">${error instanceof Error ? error.message : String(error)}</pre>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Recarregar Página</button>
      </div>
    </div>
  `;
}
