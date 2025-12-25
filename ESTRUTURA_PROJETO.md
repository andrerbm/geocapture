# 📱 GeoCapture - Documentação da Estrutura do Projeto

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Arquivos de Configuração](#arquivos-de-configuração)
5. [Fluxo da Aplicação](#fluxo-da-aplicação)
6. [Páginas](#páginas)
7. [Componentes](#componentes)
8. [Hooks Personalizados](#hooks-personalizados)
9. [Utilitários e Bibliotecas](#utilitários-e-bibliotecas)
10. [Internacionalização (i18n)](#internacionalização-i18n)
11. [Assets](#assets)
12. [Como Funciona na Prática](#como-funciona-na-prática)

---

## Visão Geral

**GeoCapture** é uma aplicação web de localização de números de telefone. O usuário insere um número de telefone e a aplicação simula uma busca de localização, exibindo informações como cidade, operadora e coordenadas GPS.

### Principais Funcionalidades:

- ✅ Validação de números de telefone internacionais
- 🌍 Detecção automática do país do usuário
- 🗺️ Visualização em mapa interativo (Leaflet)
- 🌐 Suporte a múltiplos idiomas (PT, EN, ES, FR, IT, JA)
- 📱 Design responsivo (mobile-first)

---

## Tecnologias Utilizadas

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

---

## Estrutura de Pastas

```
GeoCapture/
├── 📁 client/                    # Código-fonte do frontend
│   ├── 📁 public/                # Arquivos estáticos (favicon, imagens)
│   ├── 📁 src/                   # Código React
│   │   ├── 📁 components/        # Componentes reutilizáveis
│   │   ├── 📁 hooks/             # Hooks personalizados
│   │   ├── 📁 lib/               # Utilitários e configurações
│   │   ├── 📁 pages/             # Páginas da aplicação
│   │   ├── App.tsx               # Componente raiz
│   │   ├── main.tsx              # Ponto de entrada
│   │   └── index.css             # Estilos globais
│   └── index.html                # HTML base
├── 📁 attached_assets/           # Imagens e SVGs do projeto
├── 📁 dist/                      # Build de produção
├── 📁 script/                    # Scripts de build
├── package.json                  # Dependências do projeto
├── vite.config.ts                # Configuração do Vite
├── tsconfig.json                 # Configuração do TypeScript
└── vercel.json                   # Configuração de deploy (Vercel)
```

---

## Arquivos de Configuração

### `package.json`

Define as dependências e scripts do projeto:

```json
{
  "scripts": {
    "dev": "vite dev --port 3000", // Inicia servidor de desenvolvimento
    "build": "vite build", // Gera build de produção
    "preview": "vite preview --port 3000", // Preview do build
    "check": "tsc" // Verifica erros de TypeScript
  }
}
```

### `vite.config.ts`

Configura o Vite com:

- Plugin React
- Plugin Tailwind CSS
- Aliases de importação (`@/` para `client/src/`)
- Configurações de build

### `tsconfig.json`

Configuração do TypeScript com paths aliases e opções de compilação.

### `vercel.json`

Configuração para deploy na Vercel com rewrites para SPA.

---

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

---

## Páginas

### 📄 `pages/home.tsx`

**Página inicial** - Landing page com formulário de busca.

```
home.tsx (re-export)
└── components/sections/
    ├── Navbar.tsx              # Barra de navegação
    ├── HeroSection.tsx         # Seção principal com input
    ├── TargetAudienceSection   # Público-alvo
    ├── WhyChooseSection        # Diferenciais
    ├── DashboardPreviewSection # Preview do dashboard
    ├── TechnologiesSection     # Tecnologias usadas
    ├── TestimonialsSection     # Depoimentos
    ├── HowItWorksSection       # Como funciona
    ├── ReviewsSection          # Avaliações
    ├── KeyQuestionsSection     # Perguntas-chave
    ├── FAQSection              # FAQ
    ├── FooterFormSection       # Formulário no footer
    └── Footer.tsx              # Rodapé
```

**O que faz:**

- Exibe formulário para inserir número de telefone
- Detecta automaticamente o país do usuário
- Valida o número em tempo real
- Redireciona para `/searching` quando válido

---

### 📄 `pages/searching/`

**Página de busca** - Animação de progresso simulando localização.

```
searching/
├── index.ts              # Barrel export
├── types.ts              # Tipos TypeScript
├── useSearchProgress.ts  # Hook com lógica de progresso
├── Searching.tsx         # Componente principal
├── MapBackground.tsx     # Fundo com mapa animado
├── SearchCard.tsx        # Card com steps e progresso
└── SearchSteps.tsx       # Lista de etapas
```

**O que faz:**

- Exibe animação de "busca em andamento"
- Mostra steps de progresso (Conectando → Identificando → Triangulando)
- Busca dados reais da API (operadora, região)
- Redireciona automaticamente para `/result` após 5 segundos

**Hook `useSearchProgress`:**

```typescript
// Retorna:
{
  progress, // 0-100 (porcentagem)
    steps, // Array de steps com status
    phoneInfo, // Dados da API (operadora, região)
    error; // Mensagem de erro, se houver
}
```

---

### 📄 `pages/result.tsx`

**Página de resultado** - Mostra dados parciais e CTA para desbloqueio.

**O que faz:**

- Exibe informações parciais (cidade, operadora)
- Mostra dados "bloqueados" (endereço, coordenadas)
- CTA para página de pagamento

---

### 📄 `pages/unlock/`

**Página de desbloqueio** - Mapa real com paywall.

```
unlock/
├── index.ts              # Barrel export
├── types.ts              # Tipos TypeScript
├── constants.ts          # Dados estáticos (operadoras, localizações)
├── useUnlockPage.ts      # Hook principal com toda lógica
├── leaflet-setup.ts      # Configuração do Leaflet
├── Unlock.tsx            # Componente principal
└── components/
    ├── index.ts          # Barrel export
    ├── MapController.tsx # Controla interações do mapa
    ├── LocationMarker.tsx # Marcador de localização
    ├── MapSection.tsx    # Seção completa do mapa
    ├── ActivityTimeline.tsx # Timeline de atividades
    ├── UnlockCTA.tsx     # Call-to-action
    ├── FeaturesList.tsx  # Lista de features
    ├── SocialProof.tsx   # Avaliações
    └── SocialProofToast.tsx # Toast de prova social
```

**O que faz:**

- Busca localização real via IP do usuário
- Exibe mapa interativo (Leaflet) com marcador
- Mostra paywall sobre o mapa
- Timer de urgência (contagem regressiva)
- Toasts de prova social em tempo real
- CTA para pagamento

**Hook `useUnlockPage`:**

```typescript
// Retorna:
{
  phoneNumber, // Número do telefone
    currentLocation, // Dados de localização baseados no DDD
    ipLocation, // Localização real via IP
    loadingLocation, // Estado de loading
    timeLeft, // Segundos restantes no timer
    showToast, // Controle do toast
    toastMessage, // Mensagem do toast
    handleUnlock, // Função para redirecionar
    hideToast, // Função para fechar toast
    lastActivityMinutes, // Minutos desde última atividade
    mapCenter, // Coordenadas do mapa
    displayCity, // Cidade para exibição
    displayRegion; // Região para exibição
}
```

---

### 📄 `pages/not-found.tsx`

**Página 404** - Exibida quando a rota não existe.

---

## Componentes

### 📁 `components/ui/`

Componentes base do **Shadcn/UI** (baseados no Radix UI):

| Componente      | Descrição                  |
| --------------- | -------------------------- |
| `accordion.tsx` | Acordeão expansível        |
| `avatar.tsx`    | Avatar com imagem/fallback |
| `button.tsx`    | Botão com variantes        |
| `card.tsx`      | Card container             |
| `popover.tsx`   | Popover flutuante          |
| `progress.tsx`  | Barra de progresso         |
| `select.tsx`    | Select dropdown            |
| `toast.tsx`     | Notificação toast          |
| `toaster.tsx`   | Container de toasts        |
| `tooltip.tsx`   | Tooltip de ajuda           |

**Exemplo de uso:**

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

<Card>
  <CardContent>
    <Button variant="default">Clique aqui</Button>
  </CardContent>
</Card>;
```

---

### 📁 `components/phone-input/`

Componentes do input de telefone:

| Componente            | Descrição                             |
| --------------------- | ------------------------------------- |
| `CountrySelector.tsx` | Seletor de país com bandeira          |
| `ErrorMessage.tsx`    | Mensagem de erro de validação         |
| `SecurityBadges.tsx`  | Badges de segurança                   |
| `StatusIndicator.tsx` | Indicador de status (válido/inválido) |
| `index.ts`            | Barrel export                         |

---

### 📁 `components/sections/`

Seções da página inicial:

| Componente                    | Descrição                                       |
| ----------------------------- | ----------------------------------------------- |
| `Navbar.tsx`                  | Barra de navegação com logo e seletor de idioma |
| `HeroSection.tsx`             | Seção hero com título e input principal         |
| `TargetAudienceSection.tsx`   | Cards de público-alvo                           |
| `WhyChooseSection.tsx`        | Diferenciais do serviço                         |
| `DashboardPreviewSection.tsx` | Preview do dashboard                            |
| `TechnologiesSection.tsx`     | Tecnologias utilizadas                          |
| `TestimonialsSection.tsx`     | Depoimentos de usuários                         |
| `HowItWorksSection.tsx`       | Passo a passo                                   |
| `ReviewsSection.tsx`          | Avaliações                                      |
| `KeyQuestionsSection.tsx`     | Perguntas-chave                                 |
| `FAQSection.tsx`              | Perguntas frequentes                            |
| `FooterFormSection.tsx`       | Formulário no footer                            |
| `Footer.tsx`                  | Rodapé                                          |

---

### 📄 Componentes Individuais

#### `PhoneInput.tsx`

Input principal de telefone com:

- Seletor de país com bandeira
- Formatação automática do número
- Validação em tempo real
- Contador de dígitos

#### `StickyPhoneInput.tsx`

Versão sticky do PhoneInput que aparece ao rolar a página.

#### `HeroSection.tsx`

Seção hero da página inicial com:

- Título e subtítulo
- PhoneInput centralizado
- Badges de segurança

#### `LanguageSelector.tsx`

Dropdown para seleção de idioma com bandeiras.

#### `ErrorBoundary.tsx`

Captura erros de renderização e exibe fallback amigável.

---

## Hooks Personalizados

### `use-country-detection.ts`

Detecta o país do usuário automaticamente.

```typescript
const { detectedCountry, isLoading } = useCountryDetection();
// detectedCountry: "BR" | "US" | "PT" | etc.
```

**Como funciona:**

1. Tenta detectar pelo idioma do navegador
2. Fallback para API de geolocalização por IP
3. Padrão: "US" se não conseguir detectar

---

### `use-phone-field.ts`

Gerencia estado e lógica do campo de telefone.

```typescript
const {
  country, // País selecionado
  value, // Valor formatado
  isValid, // Se o número é válido
  digitCount, // Quantidade de dígitos
  maxDigits, // Máximo de dígitos para o país
  handleChange, // Handler de mudança
  handleCountryChange, // Handler de mudança de país
  handleSearch, // Handler de busca
} = usePhoneField(initialCountry, onValidSearch);
```

---

### `use-toast.ts`

Gerencia notificações toast.

```typescript
const { toast } = useToast();

toast({
  title: "Sucesso!",
  description: "Operação realizada com sucesso.",
});
```

---

## Utilitários e Bibliotecas

### `lib/phone-utils.ts`

Funções utilitárias para números de telefone:

```typescript
// Lista de países com código, nome, DDI e bandeira
export const countries: Country[];

// Retorna o máximo de dígitos para um país
export const getMaxLength = (country: CountryCode): number;

// Formata o número enquanto digita
export const formatPhoneNumber = (value: string, country: CountryCode): string;

// Valida se o número está completo
export const isValidPhoneNumber = (phone: string, country: CountryCode): boolean;
```

---

### `lib/utils.ts`

Utilitário para classes CSS:

```typescript
import { cn } from "@/lib/utils";

// Combina classes condicionalmente
<div className={cn("base-class", isActive && "active-class")} />;
```

---

### `lib/queryClient.ts`

Configuração do React Query para cache e requisições.

---

### `lib/i18n.ts`

Configuração do i18next para internacionalização.

---

## Internacionalização (i18n)

### Idiomas Suportados

| Código | Idioma             |
| ------ | ------------------ |
| `pt`   | Português (Brasil) |
| `en`   | English            |
| `es`   | Español            |
| `fr`   | Français           |
| `it`   | Italiano           |
| `ja`   | 日本語             |

### Arquivos de Tradução

Localizados em `lib/locales/`:

```
locales/
├── pt.json   # Português
├── en.json   # Inglês
├── es.json   # Espanhol
├── fr.json   # Francês
├── it.json   # Italiano
└── ja.json   # Japonês
```

### Como Usar

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t("home.title")}</h1>;
}
```

### Estrutura das Traduções

```json
{
  "nav": {
    "title": "GeoCapture"
  },
  "home": {
    "title": "Localize qualquer número",
    "subtitle": "Digite o número abaixo"
  },
  "searching": {
    "title": "Buscando localização",
    "connecting": "Conectando aos satélites..."
  }
}
```

---

## Assets

### `attached_assets/`

Imagens e SVGs usados no projeto:

| Arquivo             | Descrição              |
| ------------------- | ---------------------- |
| `dashboard.png`     | Preview do dashboard   |
| `precise_gps.svg`   | Ícone GPS preciso      |
| `modern_ml.svg`     | Ícone Machine Learning |
| `wide_range.svg`    | Ícone ampla cobertura  |
| `generated_images/` | Imagens geradas por IA |

### `client/public/`

Arquivos públicos servidos diretamente:

| Arquivo            | Descrição           |
| ------------------ | ------------------- |
| `favicon.svg`      | Ícone do site (SVG) |
| `favicon.png`      | Ícone do site (PNG) |
| `branch-right.png` | Imagem decorativa   |

---

## Como Funciona na Prática

### 1. Usuário Acessa a Home

```
URL: /
Componente: Home
```

- Detecta país do usuário automaticamente
- Exibe formulário de telefone
- Valida número em tempo real

### 2. Usuário Clica em "Localizar"

```
URL: /searching?phone=+5584996123112
Componente: Searching
```

- Animação de progresso (5 segundos)
- Busca dados da API (operadora, região)
- Redireciona automaticamente para resultado

### 3. Resultado Parcial

```
URL: /result?phone=+5584996123112
Componente: Result
```

- Mostra cidade e operadora
- Dados sensíveis "bloqueados"
- CTA para desbloquear

### 4. Página de Desbloqueio

```
URL: /unlock?phone=+5584996123112
Componente: Unlock
```

- Mapa real com localização do usuário
- Paywall sobre o mapa
- Timer de urgência
- Prova social em tempo real
- CTA para pagamento

---

## Padrões de Código

### Organização de Componentes

Cada página complexa segue esta estrutura:

```
pagina/
├── index.ts           # Re-export
├── types.ts           # Tipos TypeScript
├── constants.ts       # Dados estáticos
├── usePaginaHook.ts   # Hook com lógica
├── Pagina.tsx         # Componente principal
└── components/        # Sub-componentes
    ├── index.ts
    └── *.tsx
```

### Nomenclatura

- **Componentes**: PascalCase (`PhoneInput.tsx`)
- **Hooks**: camelCase com prefixo "use" (`usePhoneField.ts`)
- **Utilitários**: camelCase (`phone-utils.ts`)
- **Tipos**: PascalCase (`PhoneInfo`, `Step`)

### Imports

```typescript
// 1. React e bibliotecas externas
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// 2. Componentes UI
import { Button } from "@/components/ui/button";

// 3. Componentes locais
import PhoneInput from "@/components/PhoneInput";

// 4. Hooks
import { usePhoneField } from "@/hooks/use-phone-field";

// 5. Utilitários
import { cn } from "@/lib/utils";

// 6. Tipos
import type { PhoneInfo } from "./types";
```

---

## Comandos Úteis

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

---

## Conclusão

O GeoCapture é uma aplicação bem estruturada seguindo boas práticas de:

- ✅ **Componentização**: Componentes pequenos e reutilizáveis
- ✅ **Separação de responsabilidades**: Hooks para lógica, componentes para UI
- ✅ **Tipagem forte**: TypeScript em todo o projeto
- ✅ **Internacionalização**: Suporte a 6 idiomas
- ✅ **Acessibilidade**: Componentes Radix UI
- ✅ **Performance**: Vite + React Query + Code splitting

Para contribuir ou modificar o projeto, siga os padrões estabelecidos e mantenha a estrutura organizada! 🚀
