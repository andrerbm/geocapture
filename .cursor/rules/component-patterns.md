# Padrões de Componentes - GeoCapture

## Estrutura de Componente (Padrão)

```typescript
// imports
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ComponentProps } from './types';

// tipos (se pequenos, senão em types.ts)
interface Props {
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}

// componente principal
export const MyComponent = ({ title, onSubmit, className }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('base-styles', className)}>
      <h1>{title}</h1>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {t('common.submit')}
      </Button>
    </div>
  );
};
```

## Hooks Disponíveis no Projeto

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

### `use-phone-field.ts`

Gerencia estado e lógica do campo de telefone.

```typescript
const {
  country,             // País selecionado
  value,               // Valor formatado
  isValid,             // Se o número é válido
  digitCount,          // Quantidade de dígitos
  maxDigits,           // Máximo de dígitos para o país
  handleChange,        // Handler de mudança
  handleCountryChange, // Handler de mudança de país
  handleSearch,        // Handler de busca
} = usePhoneField(initialCountry, onValidSearch);
```

### `use-toast.ts`

Gerencia notificações toast.

```typescript
const { toast } = useToast();

toast({
  title: 'Sucesso!',
  description: 'Operação realizada com sucesso.',
});
```

### `useSearchProgress` (pages/searching/)

Hook com lógica de progresso da busca.

```typescript
// Retorna:
{
  progress,   // 0-100 (porcentagem)
  steps,      // Array de steps com status
  phoneInfo,  // Dados da API (operadora, região)
  error,      // Mensagem de erro, se houver
}
```

### `useUnlockPage` (pages/unlock/)

Hook principal da página de desbloqueio.

```typescript
// Retorna:
{
  phoneNumber,          // Número do telefone
  currentLocation,      // Dados de localização baseados no DDD
  ipLocation,           // Localização real via IP
  loadingLocation,      // Estado de loading
  timeLeft,             // Segundos restantes no timer
  showToast,            // Controle do toast
  toastMessage,         // Mensagem do toast
  handleUnlock,         // Função para redirecionar
  hideToast,            // Função para fechar toast
  lastActivityMinutes,  // Minutos desde última atividade
  mapCenter,            // Coordenadas do mapa
  displayCity,          // Cidade para exibição
  displayRegion,        // Região para exibição
}
```

## Utilitários Disponíveis

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

### `lib/utils.ts`

Utilitário para classes CSS:

```typescript
import { cn } from '@/lib/utils';

// Combina classes condicionalmente
<div className={cn('base-class', isActive && 'active-class')} />
```

### `lib/queryClient.ts`

Configuração do React Query para cache e requisições.

### `lib/i18n.ts`

Configuração do i18next para internacionalização.

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
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('home.title')}</h1>;
};
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

## Componentização (Clean Code)

### Princípio: Componentes Pequenos e Focados

Cada componente deve ter UMA responsabilidade:

```typescript
// ❌ ERRADO - Componente fazendo muitas coisas
const UserCard = ({ user }) => {
  return (
    <div>
      <img src={user.avatar} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <div>
        {user.posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ CORRETO - Componentes separados por responsabilidade
const UserAvatar = ({ src, alt }: AvatarProps) => (
  <img src={src} alt={alt} className="rounded-full" />
);

const UserInfo = ({ name, bio }: UserInfoProps) => (
  <div>
    <h2>{name}</h2>
    <p>{bio}</p>
  </div>
);

const PostCard = ({ title, content }: PostProps) => (
  <div>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

const PostList = ({ posts }: PostListProps) => (
  <div>
    {posts.map(post => (
      <PostCard key={post.id} {...post} />
    ))}
  </div>
);

const UserCard = ({ user }: UserCardProps) => (
  <div>
    <UserAvatar src={user.avatar} alt={user.name} />
    <UserInfo name={user.name} bio={user.bio} />
    <PostList posts={user.posts} />
  </div>
);
```

### Extrair Lógica para Hooks

```typescript
// ❌ ERRADO - Lógica misturada no componente
const SearchPage = () => {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState([]);
  const [phoneInfo, setPhoneInfo] = useState(null);

  useEffect(() => {
    // 50 linhas de lógica...
  }, []);

  // mais lógica...

  return <div>...</div>;
};

// ✅ CORRETO - Lógica extraída para hook
const useSearchProgress = (phoneNumber: string) => {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo | null>(null);

  // toda lógica aqui...

  return { progress, steps, phoneInfo };
};

const SearchPage = () => {
  const { progress, steps, phoneInfo } = useSearchProgress(phoneNumber);

  return (
    <div>
      <ProgressBar value={progress} />
      <StepsList steps={steps} />
      <PhoneInfoCard info={phoneInfo} />
    </div>
  );
};
```

## Uso dos Componentes UI (Shadcn/UI)

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

<Card>
  <CardContent>
    <Button variant="default">Clique aqui</Button>
  </CardContent>
</Card>
```
