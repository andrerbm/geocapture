# Guia de Deploy na Vercel

## 📋 Configurações no Dashboard da Vercel

Ao conectar seu repositório na Vercel, configure assim:

### Configurações Básicas

| Campo                | Valor                                |
| -------------------- | ------------------------------------ |
| **Root Directory**   | (deixe vazio)                        |
| **Build Command**    | (deixe vazio - usa do `vercel.json`) |
| **Output Directory** | (deixe vazio - usa do `vercel.json`) |
| **Install Command**  | (deixe vazio - usa do `vercel.json`) |
| **Framework Preset** | `Other` ou `None`                    |

### Variáveis de Ambiente

**Não são necessárias** - O projeto não usa variáveis de ambiente no cliente.

---

## 📁 Configurações no `vercel.json`

O arquivo `vercel.json` já está configurado corretamente:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Explicação das Configurações

1. **`buildCommand`**: `"npm run build"`

   - Executa `tsx script/build.ts`
   - Que por sua vez executa `vite build`
   - Gera os arquivos em `dist/public/`

2. **`outputDirectory`**: `"dist/public"`

   - Diretório onde os arquivos estáticos serão servidos
   - Corresponde ao `outDir` configurado no `vite.config.ts`

3. **`installCommand`**: `"npm install"`

   - Usa automaticamente o `.npmrc` com `legacy-peer-deps=true`
   - Resolve conflitos de peer dependencies (React 19 vs react-leaflet)

4. **`framework`**: `null`

   - Indica que é um projeto estático, não um framework específico

5. **`rewrites`**:
   - Configura SPA routing
   - Todas as rotas (`/*`) redirecionam para `/index.html`
   - Necessário para o roteamento client-side funcionar

---

## 🔄 Processo de Deploy

1. **Conectar Repositório**

   - Vá em [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Conecte seu repositório GitHub/GitLab/Bitbucket

2. **Configurar Projeto**

   - A Vercel detectará automaticamente o `vercel.json`
   - Não precisa preencher nada manualmente
   - Clique em "Deploy"

3. **Build Automático**
   - A Vercel executará:
     ```bash
     npm install          # Com legacy-peer-deps
     npm run build        # Build do cliente
     ```
   - Os arquivos serão servidos de `dist/public/`

---

## ✅ Checklist de Deploy

- [x] `vercel.json` configurado
- [x] `.npmrc` com `legacy-peer-deps=true`
- [x] `package.json` com script `build`
- [x] `vite.config.ts` com `outDir: "dist/public"`
- [x] `index.html` em `client/index.html`
- [ ] Repositório conectado na Vercel
- [ ] Deploy executado

---

## 🐛 Troubleshooting

### Erro: "Could not find the build directory"

- Verifique se o `outputDirectory` está correto: `dist/public`
- Certifique-se de que o build está gerando arquivos nesse diretório

### Erro: "ERESOLVE could not resolve"

- Verifique se o `.npmrc` está no repositório
- Deve conter: `legacy-peer-deps=true`

### Erro: "404 Not Found" nas rotas

- Verifique se o `rewrites` está configurado no `vercel.json`
- Todas as rotas devem redirecionar para `/index.html`

### Build funciona mas a página não carrega

- Verifique se o `index.html` está sendo gerado em `dist/public/index.html`
- Verifique os caminhos dos assets (devem ser relativos)

---

## 📝 Notas Importantes

- O projeto é **100% estático** (frontend apenas)
- Não há servidor backend necessário
- Todas as APIs são externas (geozilla.com, ipapi.co, etc.)
- O deploy é apenas do frontend React
