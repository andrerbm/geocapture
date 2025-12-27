# Boas Práticas - GeoCapture

## Princípios Fundamentais

### 1. Simplicidade

- Preferir soluções simples e diretas
- Evitar over-engineering
- Não adicionar features não solicitadas

### 2. Clean Code

- Componentes pequenos e focados (single responsibility)
- Funções fazem UMA coisa bem feita
- Nomes descritivos e auto-explicativos
- Código legível > código "inteligente"

### 3. DRY (Don't Repeat Yourself)

- Reutilizar código existente
- Extrair lógica comum para hooks/utilitários
- Verificar se já existe algo similar antes de criar

### 4. Consistência

- Seguir padrões já estabelecidos no projeto
- Manter estilo de código uniforme
- Usar as mesmas abstrações existentes

## O que FAZER

### Código

- ✅ Usar arrow functions
- ✅ Usar async/await (nunca .then())
- ✅ Usar destructuring
- ✅ Usar template literals
- ✅ Tipar tudo explicitamente
- ✅ Componentizar em pedaços pequenos
- ✅ Extrair lógica para hooks customizados
- ✅ Usar React Query para requisições

### Estrutura

- ✅ Manter arquivos < 300 linhas
- ✅ Criar barrel exports (index.ts)
- ✅ Separar tipos em types.ts
- ✅ Separar constantes em constants.ts
- ✅ Seguir estrutura modular para páginas complexas

### Qualidade

- ✅ Rodar `npm run check` antes de commits
- ✅ Tratar erros com try/catch
- ✅ Usar loading states
- ✅ Usar Error Boundaries

## O que NÃO FAZER

### Código

- ❌ Usar function declarations (usar arrow functions)
- ❌ Usar .then()/.catch() (usar async/await)
- ❌ Usar `any` no TypeScript
- ❌ Criar componentes com > 150 linhas
- ❌ Misturar lógica e UI no mesmo componente
- ❌ Duplicar código

### Processo

- ❌ Adicionar features não solicitadas
- ❌ Criar abstrações desnecessárias
- ❌ Modificar `.env` sem confirmação
- ❌ Adicionar dados mockados fora de testes
- ❌ Introduzir novas tecnologias sem necessidade

## Padrões de Refatoração

### Quando Refatorar

1. **Arquivo > 300 linhas** → Dividir em múltiplos arquivos
2. **Função > 50 linhas** → Extrair em funções menores
3. **Componente > 150 linhas** → Componentizar
4. **Lógica repetida** → Extrair para hook/utilitário
5. **Muitos props** → Usar composição ou context

### Como Refatorar

```typescript
// ANTES: Componente grande
const BigComponent = () => {
  // 200 linhas de código...
};

// DEPOIS: Componentes pequenos + hook
const useBigComponentLogic = () => {
  // lógica extraída
  return { state, handlers };
};

const SubComponentA = ({ data }: Props) => { ... };
const SubComponentB = ({ data }: Props) => { ... };

const BigComponent = () => {
  const { state, handlers } = useBigComponentLogic();

  return (
    <div>
      <SubComponentA data={state.a} />
      <SubComponentB data={state.b} />
    </div>
  );
};
```

## Ambiente

| Ambiente | Descrição                             |
| -------- | ------------------------------------- |
| `dev`    | Desenvolvimento local (`npm run dev`) |
| `test`   | Testes automatizados                  |
| `prod`   | Produção (Vercel)                     |

## Checklist Antes de Commit

- [ ] `npm run check` passa sem erros
- [ ] Código segue padrões ES6+ (arrow functions, async/await)
- [ ] Componentes estão componentizados
- [ ] Tipos estão definidos
- [ ] Não há código duplicado
- [ ] Arquivos não excedem limites de linhas
