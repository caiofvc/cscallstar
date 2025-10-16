# 🎮 Novo Fluxo: Partida com Seleção de Jogadores

## 🏗️ Estrutura Atualizada

Agora o banco tem **4 tabelas**:

1. **`players`** - Jogadores cadastrados
2. **`games`** - Cada jogo/racha
3. **`game_participants`** ⭐ **NOVA** - Define quem está jogando
4. **`game_stats`** - Estatísticas de cada jogador por jogo

## 📋 Fluxo Completo

### **1. Configurar Partida**
```
Usuário clica "Iniciar Partida Ao Vivo"
  ↓
Abre tela GameSetup
  ↓
Usuário seleciona:
  - Quais jogadores estão jogando (checkbox)
  - Descrição (ex: "Racha de Terça")
  - Local (ex: "Quadra do CSC")
  ↓
Clica "Iniciar Partida"
```

### **2. Criar Jogo no Banco**
```sql
-- 1. Criar registro do jogo
INSERT INTO games (data, descricao, local)
VALUES (CURRENT_DATE, 'Racha de Terça', 'Quadra do CSC')
RETURNING id; -- retorna game_id

-- 2. Adicionar participantes
INSERT INTO game_participants (game_id, player_id)
VALUES 
  ('game_id', 'player1_id'),
  ('game_id', 'player2_id'),
  ('game_id', 'player3_id');
```

### **3. Modo Ao Vivo**
```
Abre LiveGameMode com APENAS os jogadores selecionados
  ↓
Dropdown mostra só quem está jogando
  ↓
Usuário registra ações normalmente
  ↓
Clica "Salvar Alterações"
  ↓
Estatísticas salvas em game_stats
```

## 💻 Implementação no App.tsx

### **Estado Necessário:**
```typescript
const [showGameSetup, setShowGameSetup] = useState(false)
const [currentGame, setCurrentGame] = useState<{
  id: string
  players: Player[]
  info: { descricao?: string; local?: string }
} | null>(null)
```

### **Função para Criar Jogo:**
```typescript
const createGame = async (
  selectedPlayers: Player[], 
  gameInfo: { descricao?: string; local?: string }
) => {
  try {
    // 1. Criar o jogo
    const { data: gameData, error: gameError } = await supabase
      .from('games')
      .insert({
        data: new Date().toISOString().split('T')[0],
        descricao: gameInfo.descricao,
        local: gameInfo.local
      })
      .select()
      .single()

    if (gameError) throw gameError

    // 2. Adicionar participantes
    const participants = selectedPlayers.map(p => ({
      game_id: gameData.id,
      player_id: p.id
    }))

    const { error: participantsError } = await supabase
      .from('game_participants')
      .insert(participants)

    if (participantsError) throw participantsError

    // 3. Abrir modo ao vivo
    setCurrentGame({
      id: gameData.id,
      players: selectedPlayers,
      info: gameInfo
    })
    setShowGameSetup(false)

  } catch (err: any) {
    alert('Erro ao criar jogo: ' + err.message)
  }
}
```

### **Salvar Estatísticas:**
```typescript
const saveGameStats = async (playerId: string, stats: PlayerStats) => {
  if (!currentGame) return

  try {
    // Inserir ou atualizar estatísticas do jogo
    const { error } = await supabase
      .from('game_stats')
      .upsert({
        game_id: currentGame.id,
        player_id: playerId,
        pontos: stats.pontos,
        rebotes: stats.rebotes,
        assistencias: stats.assistencias,
        roubos: stats.roubos,
        tocos: stats.tocos,
        arremessosTentados: stats.arremessosTentados,
        arremessosConvertidos: stats.arremessosConvertidos,
        arremessos3Tentados: stats.arremessos3Tentados,
        arremessos3Convertidos: stats.arremessos3Convertidos,
        lancesLivresTentados: stats.lancesLivresTentados,
        lancesLivresConvertidos: stats.lancesLivresConvertidos,
        turnovers: stats.turnovers
      }, {
        onConflict: 'game_id,player_id' // Atualiza se já existe
      })

    if (error) throw error
  } catch (err: any) {
    alert('Erro ao salvar: ' + err.message)
  }
}
```

### **Render:**
```tsx
{/* Botão para iniciar */}
<button
  onClick={() => setShowGameSetup(true)}
  className="..."
>
  Iniciar Partida
</button>

{/* Modal de setup */}
{showGameSetup && (
  <GameSetup
    players={players}
    onStart={createGame}
    onClose={() => setShowGameSetup(false)}
  />
)}

{/* Modo ao vivo */}
{currentGame && (
  <LiveGameMode
    players={currentGame.players}
    gameInfo={currentGame.info}
    onUpdate={saveGameStats}
    onClose={() => setCurrentGame(null)}
  />
)}
```

## 🎯 Benefícios

✅ **Prático** - Só aparecem os jogadores que estão jogando  
✅ **Organizado** - Cada partida tem seus participantes registrados  
✅ **Histórico** - Sabe quem jogou em cada partida  
✅ **Flexível** - Nem todos os jogadores precisam estar em todas as partidas  
✅ **Relatórios** - Pode filtrar estatísticas por quem participou  

## 📊 Consultas Úteis

### **Ver participantes de um jogo:**
```sql
SELECT p.nome, p.apelido
FROM game_participants gp
JOIN players p ON gp.player_id = p.id
WHERE gp.game_id = 'game_id_aqui';
```

### **Ver jogos que um jogador participou:**
```sql
SELECT g.data, g.descricao, g.local
FROM game_participants gp
JOIN games g ON gp.game_id = g.id
WHERE gp.player_id = 'player_id_aqui'
ORDER BY g.data DESC;
```

### **Total de jogos por jogador:**
```sql
SELECT 
  p.nome,
  COUNT(gp.game_id) as total_jogos
FROM players p
LEFT JOIN game_participants gp ON p.id = gp.player_id
GROUP BY p.id, p.nome
ORDER BY total_jogos DESC;
```

## 🚀 Próximos Passos

1. ✅ Execute `supabase-setup-v2.sql` (atualizado)
2. 🔄 Integre `GameSetup` no App.tsx
3. 🔄 Atualize funções de criação e salvamento
4. 🎨 Teste o fluxo completo
5. 📊 Adicione tela de histórico de jogos

---

**Pronto! Agora só aparecem os jogadores que estão na partida! 🎉**
