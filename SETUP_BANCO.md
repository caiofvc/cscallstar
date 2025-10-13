# 🗄️ Configuração do Banco de Dados - Passo a Passo

## 📋 Pré-requisitos

✅ Projeto criado no Supabase  
✅ Arquivo `.env` configurado

## 🚀 Executar SQL no Supabase

### Passo 1: Acessar o SQL Editor

1. Acesse seu projeto no [Supabase](https://supabase.com)
2. No menu lateral, clique em **"SQL Editor"**
3. Clique em **"New Query"**

### Passo 2: Copiar o SQL

Abra o arquivo `supabase-setup.sql` neste projeto e copie **TODO o conteúdo**.

### Passo 3: Executar o SQL

1. Cole o SQL copiado no editor
2. Clique no botão **"RUN"** (ou pressione `Ctrl + Enter`)
3. Aguarde a mensagem de sucesso ✅

### Passo 4: Verificar a Tabela

1. No menu lateral, clique em **"Table Editor"**
2. Você deve ver a tabela **"players"**
3. Clique nela para visualizar a estrutura

## 📊 Estrutura da Tabela Criada

```
players
├── id (UUID) - Chave primária, gerado automaticamente
├── nome (TEXT) - Nome do jogador (obrigatório)
├── apelido (TEXT) - Apelido do jogador (opcional)
├── stats (JSONB) - Todas as estatísticas em formato JSON
├── created_at (DATE) - Data de criação (apenas dia, sem hora)
└── updated_at (DATE) - Data de última atualização (apenas dia, sem hora)
```

**💡 Importante**: Os campos `created_at` e `updated_at` armazenam apenas o DIA (sem hora), perfeito para racha semanal. Assim você consegue ver quando foi o último jogo e agrupar estatísticas por dia.

### Estrutura do campo `stats`:

```json
{
  "pontos": 0,
  "rebotes": 0,
  "assistencias": 0,
  "roubos": 0,
  "tocos": 0,
  "arremessosTentados": 0,
  "arremessosConvertidos": 0,
  "arremessos3Tentados": 0,
  "arremessos3Convertidos": 0,
  "lancesLivresTentados": 0,
  "lancesLivresConvertidos": 0,
  "turnovers": 0,
  "jogos": 0
}
```

## 🔒 Recursos de Segurança Configurados

### 1. Row Level Security (RLS)
- ✅ Habilitado na tabela
- ✅ Políticas de acesso público configuradas
- ⚠️ **Atenção**: Atualmente qualquer um pode ler/escrever

### 2. Trigger Automático
- ✅ Campo `updated_at` atualizado automaticamente
- ✅ Registra timestamp de todas as modificações

### 3. Índices
- ✅ Índice em `created_at` para ordenação rápida

## 🔐 Segurança Adicional (Opcional)

Se você quiser restringir o acesso apenas para usuários autenticados no Supabase, substitua as políticas por estas:

```sql
-- Remover políticas públicas
DROP POLICY IF EXISTS "Permitir leitura pública de jogadores" ON players;
DROP POLICY IF EXISTS "Permitir inserção pública de jogadores" ON players;
DROP POLICY IF EXISTS "Permitir atualização pública de jogadores" ON players;
DROP POLICY IF EXISTS "Permitir deleção pública de jogadores" ON players;

-- Criar políticas apenas para usuários autenticados
CREATE POLICY "Permitir tudo para usuários autenticados"
  ON players
  USING (auth.role() = 'authenticated');
```

## ✅ Testar a Configuração

### Teste 1: Inserir um registro manualmente

No **Table Editor**:
1. Clique em **"Insert"** → **"Insert row"**
2. Preencha:
   - `nome`: "Teste"
   - `apelido`: "Test"
   - `stats`: Cole o JSON acima
3. Clique em **"Save"**

### Teste 2: Verificar timestamps

1. Após inserir, verifique os campos `created_at` e `updated_at`
2. Edite o registro e veja o `updated_at` ser atualizado automaticamente

### Teste 3: Testar pela aplicação

1. Execute `npm run dev`
2. Faça login com a senha: **cscallstar2025**
3. Adicione um jogador
4. Volte ao Table Editor e veja o registro

## 📝 Queries Úteis

### Ver todos os jogadores com estatísticas principais

```sql
SELECT 
  nome,
  apelido,
  (stats->>'pontos')::int as pontos,
  (stats->>'rebotes')::int as rebotes,
  (stats->>'assistencias')::int as assistencias,
  (stats->>'jogos')::int as jogos,
  created_at,
  updated_at
FROM players
ORDER BY created_at DESC;
```

### Ver jogadores ordenados por pontos

```sql
SELECT 
  nome,
  (stats->>'pontos')::int as total_pontos,
  (stats->>'jogos')::int as jogos,
  CASE 
    WHEN (stats->>'jogos')::int > 0 
    THEN ROUND((stats->>'pontos')::numeric / (stats->>'jogos')::numeric, 1)
    ELSE 0
  END as media_ppg
FROM players
WHERE (stats->>'jogos')::int > 0
ORDER BY (stats->>'pontos')::int DESC;
```

### Ver jogadores criados hoje

```sql
SELECT *
FROM players
WHERE created_at = CURRENT_DATE
ORDER BY created_at DESC;
```

### Ver jogadores atualizados esta semana

```sql
SELECT 
  nome,
  apelido,
  (stats->>'jogos')::int as jogos,
  (stats->>'pontos')::int as pontos,
  updated_at as ultima_atualizacao
FROM players
WHERE updated_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY updated_at DESC;
```

### Ver estatísticas do racha de hoje

```sql
SELECT 
  nome,
  (stats->>'pontos')::int as pontos,
  (stats->>'rebotes')::int as rebotes,
  (stats->>'assistencias')::int as assistencias,
  (stats->>'roubos')::int as roubos,
  (stats->>'tocos')::int as tocos,
  updated_at
FROM players
WHERE updated_at = CURRENT_DATE
ORDER BY (stats->>'pontos')::int DESC;
```

### Calcular percentual de arremessos

```sql
SELECT 
  nome,
  (stats->>'arremessosConvertidos')::int as convertidos,
  (stats->>'arremessosTentados')::int as tentados,
  CASE 
    WHEN (stats->>'arremessosTentados')::int > 0 
    THEN ROUND(
      ((stats->>'arremessosConvertidos')::numeric / 
       (stats->>'arremessosTentados')::numeric) * 100, 
      1
    )
    ELSE 0
  END as fg_percentage
FROM players
WHERE (stats->>'arremessosTentados')::int > 0
ORDER BY fg_percentage DESC;
```

## ❓ Problemas Comuns

### "permission denied for table players"
- Execute o SQL completo novamente
- Verifique se as políticas de RLS foram criadas

### "relation 'players' does not exist"
- A tabela não foi criada
- Execute o arquivo `supabase-setup.sql` no SQL Editor

### Dados não aparecem na aplicação
- Verifique se o arquivo `.env` está configurado
- Abra o console do navegador (F12) para ver erros
- Teste inserir um registro manualmente no Table Editor

### Campo `updated_at` não atualiza
- Execute novamente a criação do trigger no SQL
- Verifique em **Database** → **Functions** se a função existe

## 🎯 Próximos Passos

Após configurar o banco:

1. ✅ Execute `npm run dev`
2. ✅ Faça login com a senha padrão: **cscallstar2025**
3. ✅ Adicione jogadores
4. ✅ Atualize estatísticas
5. ✅ Verifique os dados no Table Editor do Supabase

## 🔄 Backup e Restore

### Fazer backup

```sql
-- Exportar dados (copie o resultado)
SELECT json_agg(t) 
FROM players t;
```

### Restaurar backup

```sql
-- Inserir dados de backup
INSERT INTO players (nome, apelido, stats)
SELECT 
  data->>'nome',
  data->>'apelido',
  (data->>'stats')::jsonb
FROM json_array_elements('[COLE_SEU_BACKUP_AQUI]'::json) data;
```

---

✅ **Banco configurado com sucesso!** Agora você pode usar o sistema completo. 🏀
