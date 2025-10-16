# 🚀 Setup Rápido do Banco de Dados

## 📋 Ordem de Execução

Execute os arquivos SQL nesta ordem no **Supabase SQL Editor**:

### **1️⃣ Setup Completo** 
```sql
-- Arquivo: setup-completo.sql
-- Cria todas as tabelas + insere jogadores
```

✅ Cria 4 tabelas: `players`, `games`, `game_participants`, `game_stats`  
✅ Cria índices, triggers, views e políticas RLS  
✅ Insere 20 jogadores automaticamente  

**Resultado esperado:**
- ✅ 20 jogadores cadastrados
- ✅ 0 jogos (ainda)

---

### **2️⃣ Inserir Jogo Histórico (Opcional)**
```sql
-- Arquivo: inserir-jogo-automatico.sql
-- Insere o jogo com estatísticas da planilha
```

✅ Cria 1 jogo com data de hoje  
✅ Adiciona os 20 participantes  
✅ Insere estatísticas de todos os jogadores  

**Resultado esperado:**
- ✅ 1 jogo criado
- ✅ 145 pontos totais no jogo

---

## 🎯 Passo a Passo Completo

### **Passo 1: Limpar Banco (se necessário)**
```sql
-- Se você precisa recriar tudo do zero
DROP TABLE IF EXISTS game_stats CASCADE;
DROP TABLE IF EXISTS game_participants CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP VIEW IF EXISTS player_total_stats;
DROP VIEW IF EXISTS recent_games;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

### **Passo 2: Executar Setup Completo**
1. Abra o **Supabase SQL Editor**
2. Cole todo o conteúdo de `setup-completo.sql`
3. Clique em **Run**
4. Aguarde a mensagem de sucesso

### **Passo 3: Inserir Jogo Histórico**
1. No **Supabase SQL Editor**
2. Cole todo o conteúdo de `inserir-jogo-automatico.sql`
3. Clique em **Run**
4. Aguarde a confirmação

### **Passo 4: Verificar**
```sql
-- Ver jogadores
SELECT * FROM players ORDER BY nome;

-- Ver jogos
SELECT * FROM games;

-- Ver estatísticas do jogo
SELECT 
  p.nome,
  gs.pontos,
  gs.rebotes,
  gs.assistencias
FROM game_stats gs
JOIN players p ON gs.player_id = p.id
ORDER BY gs.pontos DESC;
```

---

## 📁 Arquivos Disponíveis

| Arquivo | Descrição | Quando Usar |
|---------|-----------|-------------|
| `setup-completo.sql` | ⭐ **Recomendado** - Cria tudo + jogadores | Sempre primeiro |
| `inserir-jogo-automatico.sql` | Insere jogo histórico com stats | Depois do setup |
| `inserir-jogadores.sql` | Insere apenas os jogadores | Se já criou as tabelas manualmente |
| `supabase-setup-v2.sql` | Cria apenas estrutura (sem dados) | Se quer configurar manualmente |

---

## ✅ Checklist Final

- [ ] Executei `setup-completo.sql`
- [ ] Verifiquei que 20 jogadores foram criados
- [ ] (Opcional) Executei `inserir-jogo-automatico.sql`
- [ ] (Opcional) Verifiquei que 1 jogo foi criado
- [ ] Configurei o `.env` com as credenciais do Supabase
- [ ] Testei login no app React

---

## ⚠️ Problemas Comuns

### **"relation 'players' already exists"**
✅ Solução: Execute o DROP das tabelas primeiro (Passo 1)

### **"policy already exists"**
✅ Solução: O SQL já tem DROP POLICY, mas se der erro, ignore - significa que já existe

### **"Could not find the 'stats' column"**
✅ Solução: Você está usando o SQL antigo. Use `setup-completo.sql`

### **Jogadores não aparecem no app**
✅ Solução: Verifique se o `.env` está correto e se o servidor está rodando

---

## 🔄 Para Atualizar Estrutura (sem perder dados)

Se você já tem dados e quer adicionar novos campos:

```sql
-- Adicionar novos campos
ALTER TABLE game_stats ADD COLUMN IF NOT EXISTS airballs INTEGER DEFAULT 0;
ALTER TABLE game_stats ADD COLUMN IF NOT EXISTS cestas_contra INTEGER DEFAULT 0;
```

---

## 📞 Suporte

Se algo não funcionar:
1. Verifique os logs do Supabase SQL Editor
2. Confirme que está usando PostgreSQL 14+
3. Certifique-se de que RLS está habilitado

**Tudo pronto! Seu banco está configurado! 🎉**
