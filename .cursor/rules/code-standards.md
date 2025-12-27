# Padrões de Código - GeoCapture

## JavaScript/TypeScript Moderno (ES6+)

### Arrow Functions (OBRIGATÓRIO)
Sempre usar arrow functions ao invés de function declarations:

```typescript
// ✅ CORRETO
const handleClick = () => {
  // lógica
};

const fetchData = async (id: string) => {
  const response = await api.get(`/data/${id}`);
  return response.data;
};

// ❌ ERRADO
function handleClick() {
  // lógica
}
```

### Async/Await (OBRIGATÓRIO)
Sempre usar async/await ao invés de Promises com .then():

```typescript
// ✅ CORRETO
const fetchUserData = async (userId: string) => {
  try {
    const user = await api.getUser(userId);
    const posts = await api.getUserPosts(userId);
    return { user, posts };
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

// ❌ ERRADO
const fetchUserData = (userId: string) => {
  return api.getUser(userId)
    .then(user => api.getUserPosts(userId)
      .then(posts => ({ user, posts })))
    .catch(error => {
      console.error('Erro:', error);
      throw error;
    });
};
```

### Destructuring
Usar destructuring para objetos e arrays:

```typescript
// ✅ CORRETO
const { name, email } = user;
const [first, second] = items;
const { data, isLoading } = useQuery(...);

// ❌ ERRADO
const name = user.name;
const email = user.email;
```

### Template Literals
Usar template literals para strings dinâmicas:

```typescript
// ✅ CORRETO
const message = `Olá, ${name}! Você tem ${count} mensagens.`;

// ❌ ERRADO
const message = 'Olá, ' + name + '! Você tem ' + count + ' mensagens.';
```

### Spread Operator
Usar spread para copiar/mesclar objetos e arrays:

```typescript
// ✅ CORRETO
const newUser = { ...user, name: 'Novo Nome' };
const allItems = [...items1, ...items2];

// ❌ ERRADO
const newUser = Object.assign({}, user, { name: 'Novo Nome' });
```

## TypeScript

### Tipagem Explícita
- Sempre tipar parâmetros de funções
- Sempre tipar retornos de funções
- Evitar `any` - usar `unknown` quando necessário
- Usar interfaces para objetos complexos

```typescript
// ✅ CORRETO
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

// ❌ ERRADO
const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
```

### Exportação de Tipos
Exportar tipos com `export type`:

```typescript
export type { User, UserRole };
export interface UserProps { ... }
```

## Nomenclatura
- **Componentes**: PascalCase (`PhoneInput.tsx`)
- **Hooks**: camelCase com prefixo "use" (`usePhoneField.ts`)
- **Utilitários**: kebab-case (`phone-utils.ts`)
- **Tipos/Interfaces**: PascalCase (`PhoneInfo`, `Step`)
- **Constantes**: SCREAMING_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Variáveis/Funções**: camelCase (`handleSubmit`, `userData`)

## Ordem de Imports
```typescript
// 1. React e bibliotecas externas
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// 2. Componentes UI
import { Button } from '@/components/ui/button';

// 3. Componentes locais
import { PhoneInput } from '@/components/PhoneInput';

// 4. Hooks
import { usePhoneField } from '@/hooks/use-phone-field';

// 5. Utilitários
import { cn } from '@/lib/utils';

// 6. Tipos
import type { PhoneInfo } from './types';
```

## Limites de Código
- **Arquivos**: máximo 200-300 linhas
- **Funções**: máximo 50 linhas
- **Componentes**: máximo 150 linhas
- Se ultrapassar, refatorar em arquivos/funções menores

