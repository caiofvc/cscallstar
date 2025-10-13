# ⚡ Como Usar - CSC All Star

## 🔐 PASSO 1: Adicionar Senha ao .env

Abra o arquivo `.env` e adicione esta linha no final:

```env
VITE_APP_PASSWORD=cscallstar2025
```

Seu arquivo `.env` completo deve ficar assim:

```env
VITE_SUPABASE_URL=https://jzslzbhqwgrazvufklhl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6c2x6Ymhxd2dyYXp2dWZrbGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjExMjYsImV4cCI6MjA3MDIzNzEyNn0.WFjpsJXA1zhy3HCU8aCfn_irh7ReTZqqpQ-1EmLhvTY
VITE_APP_PASSWORD=cscallstar2025
```

💡 **Dica**: Você pode mudar a senha para qualquer outra que preferir!

## 🗄️ PASSO 2: Criar Tabelas no Supabase

### Opção A: Guia Rápido (1 minuto)

1. Acesse: https://supabase.com
2. Abra seu projeto CSC All Star
3. Clique em **SQL Editor** no menu lateral
4. Clique em **New Query**
5. Abra o arquivo `supabase-setup.sql` deste projeto
6. **Copie TODO o conteúdo**
7. Cole no SQL Editor
8. Clique em **RUN** (ou Ctrl+Enter)
9. ✅ Pronto! Tabela criada

### Opção B: Guia Detalhado

Leia o arquivo **`SETUP_BANCO.md`** para instruções completas com screenshots e troubleshooting.

## 🚀 PASSO 3: Reiniciar o Servidor

Se o servidor já estiver rodando, pressione:
- **Ctrl + C** no terminal para parar
- Digite: `npm run dev` para reiniciar

Ou se não estiver rodando:

```bash
npm run dev
```

## 🔑 PASSO 4: Fazer Login

1. Abra o navegador na URL mostrada (geralmente http://localhost:5173)
2. Você verá a tela de login
3. Digite a senha: **cscallstar2025**
4. Clique em **Entrar**

## ✅ PASSO 5: Usar o Sistema

### Adicionar Jogador
1. Clique em **"Adicionar Jogador"**
2. Preencha nome e apelido (opcional)
3. Clique em **"Adicionar"**

### Ver Estatísticas Completas
1. Clique em **"Ver Estatísticas Completas"** no card do jogador
2. Você verá TODAS as estatísticas disponíveis:
   - Jogos
   - Pontos
   - Rebotes
   - Assistências
   - **Roubos de Bola** ⭐
   - **Tocos** ⭐
   - Arremessos de Campo (tentados/convertidos + FG%)
   - Arremessos de 3 Pontos (tentados/convertidos + 3P%)
   - Lances Livres (tentados/convertidos + FT%)
   - Turnovers

### Atualizar Estatísticas
1. Use os botões **+** e **-** para incrementar/decrementar
2. Ou digite o valor diretamente
3. Clique em **"Salvar Estatísticas"**
4. Os dados são salvos automaticamente no Supabase

### Editar Jogador
1. Clique no ícone de **lápis** no card
2. Altere nome ou apelido
3. Clique em **"Salvar"**

### Remover Jogador
1. Clique no ícone de **lixeira** no card
2. Confirme a remoção

### Sair do Sistema
1. Clique em **"Sair"** no canto superior direito
2. Você voltará para a tela de login
3. A sessão expira automaticamente após 24 horas

## 📊 Visualizar Dados no Supabase

1. Acesse seu projeto no Supabase
2. Clique em **Table Editor**
3. Selecione a tabela **players**
4. Veja todos os jogadores com:
   - Timestamps de criação e atualização
   - Todas as estatísticas em formato JSON
   - Possibilidade de editar manualmente

## 🔒 Segurança

- ✅ **Login único**: Senha compartilhada com o grupo
- ✅ **Sessão de 72h**: Válida por 3 dias (ideal para racha semanal)
- ✅ **Logout manual**: Saia quando quiser
- ✅ **Dados em nuvem**: Salvos no Supabase
- 📅 **Registro por dia**: Apenas a data é salva (sem hora)

## 🎯 Fluxo Típico de Uso

### Antes de um Jogo:
1. Abra o sistema
2. Confira se todos os jogadores estão cadastrados
3. Se faltar alguém, adicione

### Durante/Depois do Jogo:
1. Clique em "Ver Estatísticas Completas"
2. Atualize os valores conforme o jogo acontece
3. Salve as estatísticas

### Para Ver Rankings:
1. Acesse o Supabase → Table Editor
2. Execute as queries SQL do arquivo `SETUP_BANCO.md`
3. Veja rankings por pontos, média PPG, FG%, etc.

## 📱 Uso em Mobile

O sistema é responsivo! Pode usar no celular:
1. Abra o navegador do celular
2. Acesse a URL do servidor (precisa estar na mesma rede)
3. Faça login normalmente
4. Todas as funcionalidades funcionam no mobile

## ❓ Problemas Comuns

### "Invalid API Key"
- Verifique se o `.env` está correto
- Reinicie o servidor (Ctrl+C e `npm run dev`)

### "Senha incorreta"
- Verifique se adicionou `VITE_APP_PASSWORD` no `.env`
- Senha padrão: `cscallstar2025`
- Reinicie o servidor após alterar `.env`

### "relation 'players' does not exist"
- Execute o SQL do arquivo `supabase-setup.sql`
- Veja o guia completo em `SETUP_BANCO.md`

### Tocos e Roubos não aparecem
- ✅ Já estão implementados!
- Clique em "Ver Estatísticas Completas"
- Eles aparecem logo após "Assistências"

## 🎉 Pronto!

Agora você tem:
- ✅ Tela de login com senha única
- ✅ Tocos e Roubos de Bola nas estatísticas
- ✅ Dados salvos no Supabase com timestamps
- ✅ Sistema completo funcionando

**Senha padrão**: `cscallstar2025`

Bom racha! 🏀
