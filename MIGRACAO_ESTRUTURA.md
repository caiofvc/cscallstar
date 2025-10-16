# 🔄 Migração de Estrutura - Status Atual

## ✅ O Que Foi Feito

### **1. Banco de Dados**
- ✅ Nova estrutura criada (`supabase-setup-v2.sql`)
- ✅ 4 tabelas: `players`, `games`, `game_participants`, `game_stats`
- ✅ Campos `airballs` e `cestas_contra` adicionados
- ✅ 20 jogadores inseridos

### **2. Componentes React**
- ✅ `GameSetup.tsx` - Seleção de jogadores antes de iniciar jogo
- ✅ `LiveGameMode.tsx` - Modo ao vivo com botão de salvar
- ✅ `QuickStatsPanel.tsx` - Editor de stats com novos campos

### **3. Correções App.tsx**
- ✅ `loadPlayers()` - Adiciona stats vazias localmente
- ✅ `addPlayer()` - Compatível com nova estrutura
- ⚠️ `updateStats()` - Desabilitado temporariamente (apenas local)

---

## ⚠️ Estado Atual

### **Funciona:**
- ✅ Login
- ✅ Listar jogadores
- ✅ Adicionar jogadores
- ✅ Remover jogadores
- ✅ Editar nome/apelido

### **Limitado:**
- ⚠️ **Editar Stats** - Não salva no banco (mostra aviso)
- ⚠️ **Modo Ao Vivo** - Ainda não integrado com banco de jogos

### **Não Implementado:**
- ❌ Criar jogo antes de iniciar partida
- ❌ Salvar estatísticas por jogo
- ❌ Histórico de jogos
- ❌ Visualizar estatísticas totais (soma de todos os jogos)

---

## 🎯 Próximos Passos para Completar

### **Passo 1: Integrar GameSetup no App.tsx**

Adicionar estado e função para criar jogos:

```typescript
const [showGameSetup, setShowGameSetup] = useState(false)
const [currentGame, setCurrentGame] = useState<{
  id: string
  players: Player[]
  info: { descricao?: string; local?: string }
} | null>(null)

const createGame = async (
  selectedPlayers: Player[], 
  gameInfo: { descricao?: string; local?: string }
) => {
  // 1. Criar jogo na tabela games
  // 2. Inserir participantes em game_participants
  // 3. Abrir LiveGameMode
}
```

### **Passo 2: Atualizar LiveGameMode**

Fazer o `onUpdate` salvar em `game_stats`:

```typescript
const saveGameStats = async (playerId: string, stats: PlayerStats) => {
  await supabase
    .from('game_stats')
    .upsert({
      game_id: currentGame.id,
      player_id: playerId,
      ...stats
    })
}
```

### **Passo 3: Buscar Estatísticas Totais**

Usar a view `player_total_stats` para mostrar estatísticas acumuladas:

```typescript
const loadPlayerTotalStats = async () => {
  const { data } = await supabase
    .from('player_total_stats')
    .select('*')
  
  // Mesclar com players
}
```

### **Passo 4: Adicionar Tela de Histórico**

Lista de jogos anteriores com filtros por data.

---

## 🔧 Como Usar Agora

### **Para Cadastrar Jogadores:**
1. ✅ Funciona normalmente no app

### **Para Registrar Estatísticas de Jogo:**
1. ❌ **Não use "Editar Stats"** (não salva)
2. ✅ Use SQL manual no Supabase:
   - Execute `inserir-jogo-automatico.sql` para inserir jogo histórico
   - Ou crie jogos manualmente via SQL

### **Para Ver Estatísticas:**
Por enquanto, via SQL:

```sql
-- Ver estatísticas totais de um jogador
SELECT * FROM player_total_stats 
WHERE nome = 'Brenno';

-- Ver jogos de um jogador
SELECT 
  g.data,
  g.descricao,
  gs.pontos,
  gs.rebotes
FROM game_stats gs
JOIN games g ON gs.game_id = g.id
JOIN players p ON gs.player_id = p.id
WHERE p.nome = 'Brenno'
ORDER BY g.data DESC;
```

---

## 📊 Estrutura de Dados

### **Antiga (Removida):**
```
players
  - id
  - nome
  - apelido
  - stats (JSONB) ❌ Removido
```

### **Nova (Atual):**
```
players              games
  - id                - id
  - nome              - data
  - apelido           - descricao
  - ativo             - local

game_participants    game_stats
  - game_id           - game_id
  - player_id         - player_id
                      - pontos, rebotes, etc.
                      - airballs
                      - cestas_contra
```

---

## 🎁 Benefícios da Nova Estrutura

✅ **Histórico completo** - Todos os jogos registrados  
✅ **Estatísticas por período** - Filtrar por semana/mês  
✅ **Flexibilidade** - Nem todos jogam em todos os jogos  
✅ **Relatórios avançados** - Comparar desempenho  
✅ **Escalabilidade** - Suporta infinitos jogos  

---

## 💡 Nota Importante

A estrutura do banco está **pronta e funcional**. O que falta é apenas **integrar o frontend** com as novas tabelas. 

Por enquanto, você pode:
- ✅ Gerenciar jogadores pelo app
- ✅ Inserir jogos via SQL (`inserir-jogo-automatico.sql`)
- ✅ Consultar estatísticas via SQL

**Para integração completa do frontend, entre em contato!** 🚀
