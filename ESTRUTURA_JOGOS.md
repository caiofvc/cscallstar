# 🏀 Estrutura de Jogos Separados por Data

## 📊 Novo Modelo de Banco de Dados

A nova estrutura permite registrar **cada jogo separadamente**, mantendo histórico completo.

### **3 Tabelas Principais:**

#### 1️⃣ **`players`** - Cadastro de Jogadores
Armazena os jogadores cadastrados no sistema.

```sql
- id (UUID)
- nome (TEXT) - Nome completo
- apelido (TEXT) - Apelido
- ativo (BOOLEAN) - Se o jogador está ativo
- created_at (TIMESTAMP)
```

#### 2️⃣ **`games`** - Registro de Jogos/Rachas
Cada linha representa uma partida/racha específico.

```sql
- id (UUID)
- data (DATE) - Data do jogo
- descricao (TEXT) - Ex: "Racha de Terça"
- local (TEXT) - Ex: "Quadra do CSC"
- created_at (TIMESTAMP)
```

#### 3️⃣ **`game_stats`** - Estatísticas por Jogo
Liga jogadores aos jogos com as estatísticas daquela partida específica.

```sql
- id (UUID)
- game_id (UUID) - Referência ao jogo
- player_id (UUID) - Referência ao jogador
- pontos, rebotes, assistencias, etc.
- created_at, updated_at
```

---

## 🎯 Como Funciona na Prática

### **Exemplo 1: Jogo de Ontem**

```sql
-- 1. Criar o jogo
INSERT INTO games (data, descricao) 
VALUES ('2025-10-13', 'Racha de Segunda');
-- Retorna: game_id = 'abc-123'

-- 2. Registrar estatísticas dos jogadores
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias)
VALUES 
  ('abc-123', 'player-joao', 18, 7, 4),
  ('abc-123', 'player-maria', 22, 10, 6),
  ('abc-123', 'player-pedro', 15, 5, 8);
```

### **Exemplo 2: Jogo de Hoje**

```sql
-- Novo jogo, novo registro!
INSERT INTO games (data, descricao) 
VALUES (CURRENT_DATE, 'Racha de Terça');
-- Retorna: game_id = 'def-456'

-- Estatísticas desse jogo específico
INSERT INTO game_stats (game_id, player_id, pontos, rebotes)
VALUES 
  ('def-456', 'player-joao', 20, 9),
  ('def-456', 'player-maria', 16, 12);
```

---

## 📈 Consultas Úteis

### **Ver estatísticas totais de um jogador (histórico completo)**
```sql
SELECT * FROM player_total_stats 
WHERE nome = 'João Silva';
```

### **Ver todos os jogos de uma semana específica**
```sql
SELECT * FROM games 
WHERE data >= '2025-10-07' 
  AND data < '2025-10-14'
ORDER BY data DESC;
```

### **Ver estatísticas de um jogador em um jogo específico**
```sql
SELECT gs.*, g.data, g.descricao
FROM game_stats gs
JOIN games g ON gs.game_id = g.id
WHERE gs.player_id = 'player-joao'
  AND g.id = 'abc-123';
```

### **Top 5 maiores pontuadores de todos os tempos**
```sql
SELECT * FROM player_total_stats
ORDER BY pontos DESC
LIMIT 5;
```

### **Estatísticas de uma semana específica**
```sql
SELECT 
  p.nome,
  COUNT(DISTINCT gs.game_id) as jogos,
  SUM(gs.pontos) as pontos_semana
FROM game_stats gs
JOIN games g ON gs.game_id = g.id
JOIN players p ON gs.player_id = p.id
WHERE g.data >= '2025-10-07' AND g.data < '2025-10-14'
GROUP BY p.id, p.nome
ORDER BY pontos_semana DESC;
```

---

## 🔄 Migração do Sistema Atual

### **Opção 1: Começar do Zero (Recomendado)**
1. Execute o `supabase-setup-v2.sql`
2. Cadastre os jogadores novamente
3. Comece a registrar jogos separadamente

### **Opção 2: Migrar Dados Existentes**
Se você tem dados no sistema antigo:

```sql
-- 1. Criar jogadores na nova estrutura
INSERT INTO players (nome, apelido)
SELECT nome, apelido FROM old_players_table;

-- 2. Criar um "jogo histórico" com os dados acumulados
INSERT INTO games (data, descricao)
VALUES (CURRENT_DATE, 'Dados Históricos Importados');

-- 3. Migrar estatísticas como um único jogo
-- (você precisará adaptar conforme sua estrutura antiga)
```

---

## 🎮 Implementação no App

Você precisará atualizar o código React para:

1. **Criar novo jogo** antes de iniciar o Modo Ao Vivo
2. **Associar estatísticas ao jogo** atual
3. **Listar jogos** por data/semana
4. **Filtrar visualizações** (hoje, esta semana, este mês, histórico)

### **Fluxo Sugerido:**

```
1. Usuário clica "Iniciar Partida"
   └─> App cria um novo registro em "games"

2. Usuário registra ações no Modo Ao Vivo
   └─> Estatísticas vão para "game_stats" com o game_id atual

3. Usuário clica "Salvar"
   └─> Dados persistidos no jogo específico

4. Tela principal mostra:
   - Jogo de hoje (se existir)
   - Histórico de jogos
   - Estatísticas por período
```

---

## 🎁 Benefícios da Nova Estrutura

✅ **Histórico completo** - Todos os jogos ficam registrados  
✅ **Análise por período** - Veja desempenho semanal/mensal  
✅ **Comparações** - Compare jogadores em jogos específicos  
✅ **Relatórios** - Estatísticas detalhadas e filtráveis  
✅ **Escalabilidade** - Suporta infinitos jogos  
✅ **Flexibilidade** - Pode adicionar mais informações aos jogos (vencedor, placar final, etc.)

---

## 📝 Próximos Passos

1. ✅ Execute `supabase-setup-v2.sql` no Supabase
2. 🔄 Atualize o código React para usar as novas tabelas
3. 🎨 Adicione tela para listar histórico de jogos
4. 📊 Crie filtros por data/período
5. 🏆 Implemente rankings e estatísticas avançadas

---

**Quer que eu adapte o código React para usar essa nova estrutura?**
