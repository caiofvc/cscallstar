import { useState } from 'react'
import { X, Check, PlayCircle } from 'lucide-react'
import { Player } from '../types'

interface GameSetupProps {
  players: Player[]
  onStart: (selectedPlayers: Player[], gameInfo: { descricao?: string; local?: string }) => void
  onClose: () => void
}

export default function GameSetup({ players, onStart, onClose }: GameSetupProps) {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<Set<string>>(new Set())
  const [descricao, setDescricao] = useState('')
  const [local, setLocal] = useState('')

  const togglePlayer = (playerId: string) => {
    const newSelected = new Set(selectedPlayerIds)
    if (newSelected.has(playerId)) {
      newSelected.delete(playerId)
    } else {
      newSelected.add(playerId)
    }
    setSelectedPlayerIds(newSelected)
  }

  const handleStart = () => {
    if (selectedPlayerIds.size === 0) {
      alert('Selecione pelo menos um jogador!')
      return
    }

    const selectedPlayers = players.filter(p => selectedPlayerIds.has(p.id))
    onStart(selectedPlayers, { descricao, local })
  }

  const selectAll = () => {
    setSelectedPlayerIds(new Set(players.map(p => p.id)))
  }

  const clearAll = () => {
    setSelectedPlayerIds(new Set())
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Configurar Partida</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Game Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Descrição (opcional)
              </label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Racha de Terça"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Local (opcional)
              </label>
              <input
                type="text"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Ex: Quadra do CSC"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Player Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-slate-300 font-medium text-lg">
                Jogadores na Partida ({selectedPlayerIds.size}/{players.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Todos
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={clearAll}
                  className="text-sm text-slate-400 hover:text-slate-300"
                >
                  Limpar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {players.map(player => {
                const isSelected = selectedPlayerIds.has(player.id)
                return (
                  <button
                    key={player.id}
                    onClick={() => togglePlayer(player.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500'
                        : 'bg-slate-700 border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">
                          {player.apelido || player.nome}
                        </p>
                        {player.apelido && (
                          <p className="text-slate-300 text-sm">{player.nome}</p>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="text-white flex-shrink-0" size={24} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {players.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <p>Nenhum jogador cadastrado ainda.</p>
                <p className="text-sm mt-2">Cadastre jogadores primeiro!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform"
          >
            Cancelar
          </button>
          <button
            onClick={handleStart}
            disabled={selectedPlayerIds.size === 0}
            className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform ${
              selectedPlayerIds.size === 0
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <PlayCircle size={24} />
            Iniciar Partida
          </button>
        </div>
      </div>
    </div>
  )
}
