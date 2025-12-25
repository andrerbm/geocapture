import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#f9fafb",
          padding: "2rem"
        }}>
          <div style={{
            textAlign: "center",
            maxWidth: "600px",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <h1 style={{
              color: "#ef4444",
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: "600"
            }}>
              Erro ao carregar a aplicação
            </h1>
            <p style={{
              color: "#6b7280",
              marginBottom: "1.5rem"
            }}>
              Ocorreu um erro inesperado. Por favor, recarregue a página.
            </p>
            {this.state.error && (
              <details style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#f3f4f6",
                borderRadius: "0.5rem",
                textAlign: "left"
              }}>
                <summary style={{
                  cursor: "pointer",
                  fontWeight: "500",
                  marginBottom: "0.5rem"
                }}>
                  Detalhes do erro
                </summary>
                <pre style={{
                  marginTop: "0.5rem",
                  fontSize: "12px",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word"
                }}>
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500"
              }}
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

