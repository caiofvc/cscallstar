# ⚡ Início Rápido - CSC All Star

Guia rápido para colocar o sistema funcionando em **5 minutos**.

## 📝 Checklist

- [ ] Node.js instalado
- [ ] Conta no Supabase criada
- [ ] Dependências instaladas
- [ ] Projeto Supabase configurado
- [ ] Arquivo .env criado
- [ ] Servidor rodando

## 🚀 Passos

### 1️⃣ Instalar Dependências (1 min)

```bash
npm install
```

### 2️⃣ Criar Conta no Supabase (2 min)

1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub ou email
4. Clique em "New Project"
5. Preencha:
   - Nome: **CSC All Star**
   - Senha do banco: **crie uma senha forte**
   - Região: **South America (São Paulo)**
6. Clique em "Create new project"
7. ⏳ Aguarde ~2 minutos

### 3️⃣ Configurar Banco de Dados (1 min)

1. No Supabase, clique em **SQL Editor** (menu lateral)
2. Clique em **New Query**
3. Abra o arquivo `supabase-setup.sql` deste projeto
4. **Copie TODO o conteúdo** e cole no SQL Editor
5. Clique em **RUN** (ou Ctrl+Enter)
6. ✅ Verifique se apareceu "Success"

### 4️⃣ Pegar Credenciais (30 seg)

1. No Supabase, clique em **Settings** (engrenagem no menu)
2. Clique em **API**
3. Copie:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public** (chave longa começando com `eyJ...`)

### 5️⃣ Criar Arquivo .env (30 seg)

1. Na raiz do projeto, crie um arquivo chamado `.env`
2. Cole isto (substituindo pelos seus valores):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**⚠️ IMPORTANTE**: Substitua pelos valores reais que você copiou!

### 6️⃣ Rodar o Projeto (10 seg)

```bash
npm run dev
```

Abra o navegador em: **http://localhost:5173**

## ✅ Testar

1. Clique em "Adicionar Jogador"
2. Adicione um jogador de teste
3. Volte ao Supabase → **Table Editor** → **players**
4. Você deve ver o jogador com `created_at` e `updated_at`!

## ❌ Deu Erro?

### "Invalid API Key"
- Verifique se copiou a chave `anon public` correta
- Certifique-se que o arquivo `.env` está na **raiz do projeto**
- Reinicie o servidor: Ctrl+C e `npm run dev` novamente

### "relation 'players' does not exist"
- Execute novamente o SQL do arquivo `supabase-setup.sql`
- Verifique se clicou em "RUN" no SQL Editor

### "Failed to fetch"
- Verifique se a URL do Supabase está correta
- Teste se o projeto Supabase está ativo (acesse o painel)

## 📚 Próximos Passos

- Leia `SUPABASE_CONFIG.md` para detalhes completos
- Explore o Table Editor do Supabase
- Adicione seus jogadores reais
- Configure autenticação (opcional, para produção)

## 💬 Precisa de Ajuda?

Abra o console do navegador (F12) para ver erros detalhados.
