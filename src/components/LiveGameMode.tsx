import { useState } from 'react'
import { X, Undo2, Save } from 'lucide-react'
import { Player } from '../types'

interface LiveGameModeProps {
  players: Player[] // Apenas jogadores selecionados para esta partida
  gameInfo?: {
    descricao?: string
    local?: string
  }
  onUpdate: (playerId: string, updates: any) => void
  onClose: () => void
}

interface GameAction {
  id: string
  playerId: string
  playerName: string
  action: string
  timestamp: Date
  details?: any
}

export default function LiveGameMode({ players, gameInfo, onUpdate, onClose }: LiveGameModeProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [actions, setActions] = useState<GameAction[]>([])
  const [activePlayers, setActivePlayers] = useState<Player[]>(players)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const addAction = (action: string, details?: any) => {
    if (!selectedPlayer) return

    const newAction: GameAction = {
      id: Date.now().toString(),
      playerId: selectedPlayer.id,
      playerName: selectedPlayer.apelido || selectedPlayer.nome,
      action,
      timestamp: new Date(),
      details
    }

    setActions([newAction, ...actions])
  }

  const handleQuickAction = (actionType: string) => {
    if (!selectedPlayer) {
      alert('Selecione um jogador primeiro!')
      return
    }

    const stats = { ...selectedPlayer.stats }

    switch (actionType) {
      case '2pts_made':
        stats.pontos += 2
        stats.arremessosConvertidos += 1
        stats.arremessosTentados += 1
        addAction('Cesta de 2 pontos', { points: 2 })
        break
      case '2pts_miss':
        stats.arremessosTentados += 1
        addAction('Errou arremesso de 2')
        break
      case '3pts_made':
        stats.pontos += 3
        stats.arremessos3Convertidos += 1
        stats.arremessos3Tentados += 1
        addAction('Cesta de 3 pontos!', { points: 3 })
        break
      case '3pts_miss':
        stats.arremessos3Tentados += 1
        addAction('Errou arremesso de 3')
        break
      case 'ft_made':
        stats.pontos += 1
        stats.lancesLivresConvertidos += 1
        stats.lancesLivresTentados += 1
        addAction('Lance livre convertido', { points: 1 })
        break
      case 'ft_miss':
        stats.lancesLivresTentados += 1
        addAction('Errou lance livre')
        break
      case 'rebound':
        stats.rebotes += 1
        addAction('Rebote')
        break
      case 'assist':
        stats.assistencias += 1
        addAction('Assistência')
        break
      case 'steal':
        stats.roubos += 1
        addAction('Roubo de bola')
        break
      case 'block':
        stats.tocos += 1
        addAction('Toco')
        break
      case 'turnover':
        stats.turnovers += 1
        addAction('Turnover')
        break
    }

    // Atualiza localmente sem salvar
    setSelectedPlayer({ ...selectedPlayer, stats })
    setActivePlayers(activePlayers.map(p => 
      p.id === selectedPlayer.id ? { ...p, stats } : p
    ))
    setHasUnsavedChanges(true)
  }

  const undoLastAction = () => {
    if (actions.length === 0) return
    
    const lastAction = actions[0]
    const player = activePlayers.find(p => p.id === lastAction.playerId)
    
    if (!player) return

    const stats = { ...player.stats }

    // Reverter a ação
    switch (lastAction.action) {
      case 'Cesta de 2 pontos':
        stats.pontos -= 2
        stats.arremessosConvertidos -= 1
        stats.arremessosTentados -= 1
        break
      case 'Errou arremesso de 2':
        stats.arremessosTentados -= 1
        break
      case 'Cesta de 3 pontos!':
        stats.pontos -= 3
        stats.arremessos3Convertidos -= 1
        stats.arremessos3Tentados -= 1
        break
      case 'Errou arremesso de 3':
        stats.arremessos3Tentados -= 1
        break
      case 'Lance livre convertido':
        stats.pontos -= 1
        stats.lancesLivresConvertidos -= 1
        stats.lancesLivresTentados -= 1
        break
      case 'Errou lance livre':
        stats.lancesLivresTentados -= 1
        break
      case 'Rebote':
        stats.rebotes -= 1
        break
      case 'Assistência':
        stats.assistencias -= 1
        break
      case 'Roubo de bola':
        stats.roubos -= 1
        break
      case 'Toco':
        stats.tocos -= 1
        break
      case 'Turnover':
        stats.turnovers -= 1
        break
    }

    // Atualiza localmente sem salvar
    setActivePlayers(activePlayers.map(p => 
      p.id === player.id ? { ...p, stats } : p
    ))
    setActions(actions.slice(1))
    
    if (selectedPlayer?.id === player.id) {
      setSelectedPlayer({ ...player, stats })
    }
  }

  const handleSaveAll = () => {
    if (!hasUnsavedChanges) return
    
    // Salvar todas as alterações
    activePlayers.forEach(player => {
      const original = players.find(p => p.id === player.id)
      if (original && JSON.stringify(original.stats) !== JSON.stringify(player.stats)) {
        onUpdate(player.id, player.stats)
      }
    })
    
    setHasUnsavedChanges(false)
    alert('Estatísticas salvas com sucesso!')
  }

  const ActionButton = ({ 
    label, 
    action, 
    color
  }: { 
    label: string
    action: string
    color: string
  }) => (
    <button
      onClick={() => handleQuickAction(action)}
      className={`${color} text-white font-bold py-6 px-4 rounded-xl text-lg shadow-lg active:scale-95 transition-transform`}
    >
      {label}
    </button>
  )

  const totalPoints = selectedPlayer ? selectedPlayer.stats.pontos : 0

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-900 py-4 z-10">
          <div>
            <h1 className="text-xl font-bold text-white">Modo Ao Vivo</h1>
            {(gameInfo?.descricao || gameInfo?.local) && (
              <p className="text-slate-400 text-sm mt-1">
                {gameInfo.descricao}
                {gameInfo.descricao && gameInfo.local && ' • '}
                {gameInfo.local}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Player Selector */}
        <div className="mb-6">
          <label className="block text-slate-300 mb-3 font-medium">Jogador Atual</label>
          <select
            value={selectedPlayer?.id || ''}
            onChange={(e) => {
              const player = activePlayers.find(p => p.id === e.target.value)
              setSelectedPlayer(player || null)
            }}
            className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione um jogador...</option>
            {activePlayers.map(player => (
              <option key={player.id} value={player.id}>
                {player.apelido || player.nome} {player.stats.pontos > 0 && `(${player.stats.pontos} pts)`}
              </option>
            ))}
          </select>
        </div>

        {selectedPlayer && (
          <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
            <p className="text-white text-lg mb-1">Pontos</p>
            <p className="text-white text-5xl font-bold">{totalPoints}</p>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="space-y-6 mb-6">
          {/* Cestas */}
          <div>
            <h3 className="text-slate-300 font-medium mb-3">Arremessos</h3>
            <div className="grid grid-cols-2 gap-3">
              <ActionButton 
                label="Cesta 2pts" 
                action="2pts_made" 
                color="bg-green-600 hover:bg-green-700"
              />
              <ActionButton 
                label="Errou 2pts" 
                action="2pts_miss" 
                color="bg-red-600 hover:bg-red-700"
              />
              <ActionButton 
                label="Cesta 3pts" 
                action="3pts_made" 
                color="bg-purple-600 hover:bg-purple-700"
              />
              <ActionButton 
                label="Errou 3pts" 
                action="3pts_miss" 
                color="bg-red-600 hover:bg-red-700"
              />
              <ActionButton 
                label="Lance Livre Convertido" 
                action="ft_made" 
                color="bg-blue-600 hover:bg-blue-700"
              />
              <ActionButton 
                label="Lance Livre Errado" 
                action="ft_miss" 
                color="bg-red-600 hover:bg-red-700"
              />
            </div>
          </div>

          {/* Outras Ações */}
          <div>
            <h3 className="text-slate-300 font-medium mb-3">Outras Ações</h3>
            <div className="grid grid-cols-2 gap-3">
              <ActionButton 
                label="Rebote" 
                action="rebound" 
                color="bg-orange-600 hover:bg-orange-700"
              />
              <ActionButton 
                label="Assistência" 
                action="assist" 
                color="bg-cyan-600 hover:bg-cyan-700"
              />
              <ActionButton 
                label="Roubo" 
                action="steal" 
                color="bg-yellow-600 hover:bg-yellow-700"
              />
              <ActionButton 
                label="Toco" 
                action="block" 
                color="bg-pink-600 hover:bg-pink-700"
              />
              <ActionButton 
                label="Turnover" 
                action="turnover" 
                color="bg-slate-700 hover:bg-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          {hasUnsavedChanges && (
            <button
              onClick={handleSaveAll}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Salvar Alterações
            </button>
          )}
          
          {actions.length > 0 && (
            <button
              onClick={undoLastAction}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Undo2 size={20} />
              Desfazer Última Ação
            </button>
          )}
        </div>

        {/* Recent Actions */}
        {actions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-slate-300 font-medium mb-3">Últimas Ações</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {actions.slice(0, 10).map(action => (
                <div
                  key={action.id}
                  className="bg-slate-800 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">{action.playerName}</p>
                    <p className="text-slate-400 text-sm">{action.action}</p>
                  </div>
                  <p className="text-slate-500 text-xs">
                    {action.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score Summary */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          <h3 className="text-slate-300 font-medium mb-3 text-center">Placar do Jogo</h3>
          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {activePlayers
              .filter(p => p.stats.pontos > 0)
              .sort((a, b) => b.stats.pontos - a.stats.pontos)
              .map(player => (
                <div
                  key={player.id}
                  className="bg-slate-700 rounded-lg p-3 text-center"
                >
                  <p className="text-white font-bold text-xl">{player.stats.pontos}</p>
                  <p className="text-slate-300 text-sm truncate">
                    {player.apelido || player.nome}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
