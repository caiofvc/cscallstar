# 🔧 Configuração do Supabase

Este guia vai te ajudar a configurar o Supabase para o projeto CSC All Star.

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com) (gratuita)
2. Node.js instalado no seu computador

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha os dados:
   - **Name**: CSC All Star (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte (GUARDE ESSA SENHA!)
   - **Region**: Escolha a região mais próxima (ex: South America)
5. Clique em "Create new project"
6. Aguarde alguns minutos enquanto o projeto é criado

### 2. Criar a Tabela de Jogadores

1. No painel do Supabase, clique em **"SQL Editor"** no menu lateral
2. Clique em **"New Query"**
3. Copie todo o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor SQL
5. Clique em **"Run"** (ou pressione Ctrl+Enter)
6. Verifique se a mensagem de sucesso apareceu

### 3. Obter as Credenciais do Projeto

1. No painel do Supabase, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"** no menu lateral
3. Você verá duas informações importantes:
   - **Project URL**: Uma URL que começa com `https://...supabase.co`
   - **anon public**: Uma chave longa (token JWT)

### 4. Configurar as Variáveis de Ambiente

1. Na pasta raiz do projeto, crie um arquivo chamado `.env`
2. Adicione as seguintes linhas (substitua pelos seus valores):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**⚠️ IMPORTANTE**: 
- Substitua os valores acima pelas suas credenciais reais do Supabase
- Nunca compartilhe esse arquivo `.env` publicamente
- O arquivo `.env` já está no `.gitignore` para não ser enviado ao Git

### 5. Instalar Dependências e Executar

```bash
# Instalar o cliente do Supabase (se ainda não instalou)
npm install @supabase/supabase-js

# Iniciar o projeto
npm run dev
```

## ✅ Verificar se Está Funcionando

1. Abra o aplicativo no navegador
2. Tente adicionar um novo jogador
3. Volte ao Supabase e clique em **"Table Editor"**
4. Selecione a tabela **"players"**
5. Você deve ver o jogador que acabou de adicionar com:
   - `id`: UUID gerado automaticamente
   - `nome`: Nome do jogador
   - `apelido`: Apelido (se fornecido)
   - `stats`: Objeto JSON com as estatísticas
   - `created_at`: Data/hora de criação
   - `updated_at`: Data/hora de atualização

## 🔍 Estrutura da Tabela

```sql
players
├── id (UUID) - Chave primária
├── nome (TEXT) - Nome do jogador
├── apelido (TEXT) - Apelido opcional
├── stats (JSONB) - Estatísticas em formato JSON
├── created_at (TIMESTAMPTZ) - Data de criação
└── updated_at (TIMESTAMPTZ) - Data de última atualização
```

## 📊 Visualizar Dados no Supabase

- **Table Editor**: Ver e editar dados manualmente
- **SQL Editor**: Executar queries personalizadas
- **API Docs**: Ver documentação automática da API

### Exemplos de Queries Úteis

**Ver todos os jogadores ordenados por data:**
```sql
SELECT * FROM players ORDER BY created_at DESC;
```

**Ver total de pontos por jogador:**
```sql
SELECT 
  nome,
  (stats->>'pontos')::int as total_pontos
FROM players
ORDER BY (stats->>'pontos')::int DESC;
```

**Ver jogadores criados hoje:**
```sql
SELECT * FROM players 
WHERE DATE(created_at) = CURRENT_DATE;
```

## 🛡️ Segurança

O projeto está configurado com Row Level Security (RLS) permitindo:
- ✅ Leitura pública (qualquer um pode ver)
- ✅ Inserção pública (qualquer um pode adicionar)
- ✅ Atualização pública (qualquer um pode editar)
- ✅ Deleção pública (qualquer um pode remover)

**Para ambientes de produção**, você pode querer:
1. Adicionar autenticação de usuários
2. Restringir as políticas de RLS
3. Criar permissões específicas por usuário

## ❓ Problemas Comuns

### "Invalid API Key"
- Verifique se copiou a chave `anon public` corretamente
- Certifique-se de que o arquivo `.env` está na raiz do projeto

### "relation 'players' does not exist"
- Execute o SQL do arquivo `supabase-setup.sql` no SQL Editor
- Verifique se a tabela foi criada no Table Editor

### Dados não aparecem
- Verifique o console do navegador (F12) para erros
- Confira se as políticas de RLS foram criadas corretamente
- Teste a conexão usando o Table Editor do Supabase

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
