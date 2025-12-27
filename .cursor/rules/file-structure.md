# Estrutura de Arquivos - GeoCapture

## Estrutura Completa do Projeto

```
GeoCapture/
├── 📁 client/                    # Código-fonte do frontend
│   ├── 📁 public/                # Arquivos estáticos (favicon, imagens)
│   ├── 📁 src/                   # Código React
│   │   ├── 📁 components/        # Componentes reutilizáveis
│   │   │   ├── 📁 ui/            # Shadcn/UI components
│   │   │   ├── 📁 sections/      # Seções da landing page
│   │   │   └── 📁 phone-input/   # Componentes do input de telefone
│   │   ├── 📁 hooks/             # Hooks personalizados
│   │   ├── 📁 lib/               # Utilitários e configurações
│   │   │   └── 📁 locales/       # Arquivos de tradução (i18n)
│   │   ├── 📁 pages/             # Páginas da aplicação
│   │   │   ├── 📁 searching/     # Página de busca (modular)
│   │   │   └── 📁 unlock/        # Página de desbloqueio (modular)
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

## Páginas

### `pages/home.tsx`

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

### `pages/searching/`

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

### `pages/unlock/`

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

## Estrutura de Páginas Complexas (Padrão)

Páginas com muita lógica DEVEM seguir esta estrutura modular:

```
pagina/
├── index.ts           # Barrel export
├── types.ts           # Tipos TypeScript
├── constants.ts       # Dados estáticos
├── usePaginaHook.ts   # Hook com lógica
├── Pagina.tsx         # Componente principal
└── components/        # Sub-componentes
    ├── index.ts       # Barrel export dos componentes
    └── *.tsx          # Componentes específicos da página
```

## Componentes

### `components/ui/` (Shadcn/UI)

Componentes base baseados no Radix UI:

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

### `components/phone-input/`

Componentes do input de telefone:

| Componente            | Descrição                             |
| --------------------- | ------------------------------------- |
| `CountrySelector.tsx` | Seletor de país com bandeira          |
| `ErrorMessage.tsx`    | Mensagem de erro de validação         |
| `SecurityBadges.tsx`  | Badges de segurança                   |
| `StatusIndicator.tsx` | Indicador de status (válido/inválido) |
| `index.ts`            | Barrel export                         |

### `components/sections/`

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

### Componentes Individuais

| Componente             | Descrição                                     |
| ---------------------- | --------------------------------------------- |
| `PhoneInput.tsx`       | Input principal com seletor de país           |
| `StickyPhoneInput.tsx` | Versão sticky que aparece ao rolar            |
| `HeroSection.tsx`      | Seção hero com título e input                 |
| `LanguageSelector.tsx` | Dropdown para seleção de idioma               |
| `ErrorBoundary.tsx`    | Captura erros e exibe fallback                |

## Aliases de Importação

- `@/` → `client/src/`

```typescript
// ✅ CORRETO
import { Button } from '@/components/ui/button';
import { usePhoneField } from '@/hooks/use-phone-field';

// ❌ ERRADO
import { Button } from '../../../components/ui/button';
```

## Barrel Exports

Sempre criar `index.ts` para exportar componentes de uma pasta:

```typescript
// components/phone-input/index.ts
export { CountrySelector } from './CountrySelector';
export { ErrorMessage } from './ErrorMessage';
export { SecurityBadges } from './SecurityBadges';
export { StatusIndicator } from './StatusIndicator';
```

## Assets

### `attached_assets/`

| Arquivo             | Descrição              |
| ------------------- | ---------------------- |
| `dashboard.png`     | Preview do dashboard   |
| `precise_gps.svg`   | Ícone GPS preciso      |
| `modern_ml.svg`     | Ícone Machine Learning |
| `wide_range.svg`    | Ícone ampla cobertura  |
| `generated_images/` | Imagens geradas por IA |

### `client/public/`

| Arquivo            | Descrição           |
| ------------------ | ------------------- |
| `favicon.svg`      | Ícone do site (SVG) |
| `favicon.png`      | Ícone do site (PNG) |
| `branch-right.png` | Imagem decorativa   |
