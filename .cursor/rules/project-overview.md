# GeoCapture - Visão Geral do Projeto

## Descrição

**GeoCapture** é uma aplicação web de localização de números de telefone. O usuário insere um número de telefone e a aplicação simula uma busca de localização, exibindo informações como cidade, operadora e coordenadas GPS.

## Principais Funcionalidades

- ✅ Validação de números de telefone internacionais
- 🌍 Detecção automática do país do usuário
- 🗺️ Visualização em mapa interativo (Leaflet)
- 🌐 Suporte a múltiplos idiomas (PT, EN, ES, FR, IT, JA)
- 📱 Design responsivo (mobile-first)

## Stack Tecnológica

| Tecnologia            | Descrição                                  |
| --------------------- | ------------------------------------------ |
| **React 18**          | Biblioteca principal para construção da UI |
| **TypeScript**        | Tipagem estática para JavaScript           |
| **Vite**              | Bundler e servidor de desenvolvimento      |
| **Tailwind CSS 4**    | Framework CSS utilitário                   |
| **Wouter**            | Roteamento leve para React                 |
| **React Query**       | Gerenciamento de estado assíncrono         |
| **Leaflet**           | Mapas interativos                          |
| **i18next**           | Internacionalização                        |
| **libphonenumber-js** | Validação de números de telefone           |
| **Lucide React**      | Biblioteca de ícones                       |
| **Radix UI**          | Componentes primitivos acessíveis          |

## Fluxo da Aplicação

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLUXO DO USUÁRIO                        │
└─────────────────────────────────────────────────────────────────┘

     ┌──────────┐      ┌─────────────┐      ┌──────────┐      ┌──────────┐
     │   HOME   │ ──▶  │  SEARCHING  │ ──▶  │  RESULT  │ ──▶  │  UNLOCK  │
     │          │      │             │      │          │      │          │
     │ Usuário  │      │ Animação de │      │ Mostra   │      │ Paywall  │
     │ digita   │      │ busca com   │      │ dados    │      │ com mapa │
     │ telefone │      │ progresso   │      │ parciais │      │ real     │
     └──────────┘      └─────────────┘      └──────────┘      └──────────┘
```

### Detalhes do Fluxo

1. **Home** (`/`) - Landing page com formulário de busca
   - Detecta país do usuário automaticamente
   - Exibe formulário de telefone
   - Valida número em tempo real

2. **Searching** (`/searching?phone=+55...`) - Animação de progresso
   - Animação de progresso (5 segundos)
   - Busca dados da API (operadora, região)
   - Redireciona automaticamente para resultado

3. **Result** (`/result?phone=+55...`) - Dados parciais com CTA
   - Mostra cidade e operadora
   - Dados sensíveis "bloqueados"
   - CTA para desbloquear

4. **Unlock** (`/unlock?phone=+55...`) - Mapa real com paywall
   - Mapa real com localização do usuário
   - Paywall sobre o mapa
   - Timer de urgência
   - Prova social em tempo real
   - CTA para pagamento

## Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Verificar erros de TypeScript
npm run check

# Gerar build de produção
npm run build

# Preview do build
npm run preview
```

## Deploy

- Plataforma: Vercel
- Configuração: `vercel.json` na raiz
