# 🔄 Atualização - Sistema Otimizado para Racha Semanal

## ✅ Mudanças Implementadas

### 1. Sessão Estendida
- ✅ **Antes**: 24 horas
- ✅ **Agora**: **72 horas (3 dias)**
- 💡 Perfeito para racha semanal - não precisa fazer login toda hora

### 2. Registro Apenas por Dia
- ✅ **Antes**: Salvava data e hora completa (ex: 13/10/2025 14:32:15)
- ✅ **Agora**: Salva apenas o dia (ex: 13/10/2025)
- 💡 Ideal para racha semanal - cada segunda-feira é um novo jogo

### 3. Visualização da Última Participação
- ✅ **Novo**: Cada card mostra "Último racha: DD/MM/AAAA"
- 💡 Você vê quando foi a última vez que o jogador participou

## 🔧 O Que Você Precisa Fazer Agora

### IMPORTANTE: Atualizar o Banco de Dados

Se você já tinha rodado o SQL antes, precisa **atualizar a tabela** no Supabase:

#### Opção 1: Recriar a Tabela (Se não tem dados importantes)

```sql
-- Apagar a tabela antiga
DROP TABLE IF EXISTS players CASCADE;

-- Depois execute TODO o conteúdo do arquivo supabase-setup.sql novamente
```

#### Opção 2: Alterar a Tabela Existente (Se já tem dados)

```sql
-- Alterar tipo das colunas de timestamp para date
ALTER TABLE players 
  ALTER COLUMN created_at TYPE DATE,
  ALTER COLUMN updated_at TYPE DATE;

-- Atualizar a função do trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_DATE;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Adicionar índice novo
CREATE INDEX IF NOT EXISTS players_updated_at_idx ON players(updated_at DESC);
```

### Depois: Reiniciar o Servidor

```bash
# Parar o servidor (Ctrl+C)
# Reiniciar
npm run dev
```

## 📊 Novos Recursos

### Ver Jogadores que Jogaram Esta Semana

No Supabase SQL Editor:

```sql
SELECT 
  nome,
  apelido,
  (stats->>'jogos')::int as jogos,
  (stats->>'pontos')::int as pontos,
  updated_at as ultimo_jogo
FROM players
WHERE updated_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY updated_at DESC;
```

### Ver Estatísticas do Racha de Hoje

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

### Ver Quem Jogou na Segunda Passada

```sql
SELECT nome, apelido
FROM players
WHERE updated_at = CURRENT_DATE - INTERVAL '7 days'
ORDER BY nome;
```

## 🎯 Como Funciona Agora

### Fluxo do Racha Semanal:

1. **Segunda-feira - Dia de Racha**
   - Abra o sistema (não precisa login se jogou nos últimos 3 dias)
   - Veja quem jogou da última vez
   - Atualize as estatísticas de hoje

2. **Durante a Semana**
   - Acesse quando quiser para ver estatísticas
   - Sessão válida por 72h

3. **Próxima Segunda**
   - Sistema mostra automaticamente quando foi o último racha de cada jogador
   - Campo `updated_at` é atualizado automaticamente para o dia de hoje

## 📅 Exemplo Prático

### Hoje é Segunda (13/10/2025)
- Jogador "João" joga e você atualiza suas estatísticas
- Sistema salva: `updated_at = 2025-10-13`
- No card dele aparece: "Último racha: 13/10/2025"

### Próxima Segunda (20/10/2025)
- Você abre o sistema
- Card do João mostra: "Último racha: 13/10/2025"
- Você atualiza as estatísticas dele novamente
- Sistema atualiza automaticamente: `updated_at = 2025-10-20`

### Segunda Seguinte (27/10/2025)
- Se João não jogou no dia 20, ainda mostra: "Último racha: 13/10/2025"
- Se jogou, mostra: "Último racha: 20/10/2025"

## 🎨 Nova Interface

Cada card de jogador agora mostra:

```
┌─────────────────────────────┐
│ Nome do Jogador             │
│ "Apelido"                   │
│                             │
│ 📅 Último racha: 13/10/2025 │
│ ─────────────────────────── │
│ Jogos: 5                    │
│ Média PPG: 12.5             │
│ FG%: 45.2%                  │
│ Rebotes: 23                 │
│ Assistências: 15            │
│                             │
│ [Ver Estatísticas Completas]│
└─────────────────────────────┘
```

## ✅ Benefícios

1. **Sessão mais longa**: Não precisa fazer login toda hora
2. **Controle semanal**: Veja exatamente quando cada jogador participou
3. **Queries simplificadas**: Buscar por dia é mais fácil que por timestamp
4. **Histórico claro**: "Fulano jogou há 2 semanas" fica visível
5. **Performance**: Índices otimizados para buscas por data

## 🔍 Verificar se Está Funcionando

1. Faça login (senha: cscallstar2025)
2. Adicione ou edite um jogador
3. Veja se aparece "Último racha: [data de hoje]"
4. No Supabase, veja a coluna `updated_at` - deve mostrar apenas a data

---

✅ **Sistema otimizado para racha semanal!** 🏀
