import { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'
import { Player, PlayerStats } from '../types'

interface StatsModalProps {
  player: Player
  onUpdate: (stats: PlayerStats) => void
  onClose: () => void
}

export default function StatsModal({ player, onUpdate, onClose }: StatsModalProps) {
  const [stats, setStats] = useState<PlayerStats>(player.stats)

  const updateStat = (key: keyof PlayerStats, value: number) => {
    setStats({ ...stats, [key]: Math.max(0, value) })
  }

  const increment = (key: keyof PlayerStats) => {
    updateStat(key, (stats[key] || 0) + 1)
  }

  const decrement = (key: keyof PlayerStats) => {
    updateStat(key, (stats[key] || 0) - 1)
  }

  const handleSave = () => {
    onUpdate(stats)
  }

  const StatInput = ({ 
    label, 
    statKey 
  }: { 
    label: string
    statKey: keyof PlayerStats 
  }) => (
    <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
      <label className="text-slate-300 font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => decrement(statKey)}
          className="bg-slate-700 hover:bg-slate-600 text-white p-1 rounded transition-colors"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          value={stats[statKey]}
          onChange={(e) => updateStat(statKey, parseInt(e.target.value) || 0)}
          className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => increment(statKey)}
          className="bg-slate-700 hover:bg-slate-600 text-white p-1 rounded transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )

  const fgPercentage = stats.arremessosTentados > 0
    ? ((stats.arremessosConvertidos / stats.arremessosTentados) * 100).toFixed(1)
    : '0.0'

  const fg3Percentage = stats.arremessos3Tentados > 0
    ? ((stats.arremessos3Convertidos / stats.arremessos3Tentados) * 100).toFixed(1)
    : '0.0'

  const ftPercentage = stats.lancesLivresTentados > 0
    ? ((stats.lancesLivresConvertidos / stats.lancesLivresTentados) * 100).toFixed(1)
    : '0.0'

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full border border-slate-700 shadow-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{player.nome}</h2>
            {player.apelido && (
              <p className="text-slate-400">"{player.apelido}"</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 text-center">
            <p className="text-blue-400 text-sm mb-1">FG%</p>
            <p className="text-white text-xl font-bold">{fgPercentage}%</p>
          </div>
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3 text-center">
            <p className="text-purple-400 text-sm mb-1">3P%</p>
            <p className="text-white text-xl font-bold">{fg3Percentage}%</p>
          </div>
          <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3 text-center">
            <p className="text-green-400 text-sm mb-1">FT%</p>
            <p className="text-white text-xl font-bold">{ftPercentage}%</p>
          </div>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          <StatInput label="Jogos" statKey="jogos" />
          <StatInput label="Pontos" statKey="pontos" />
          <StatInput label="Rebotes" statKey="rebotes" />
          <StatInput label="Assistências" statKey="assistencias" />
          <StatInput label="Roubos de Bola" statKey="roubos" />
          <StatInput label="Tocos" statKey="tocos" />
          
          <div className="border-t border-slate-700 my-4 pt-4">
            <h3 className="text-slate-300 font-semibold mb-3">Arremessos de Campo</h3>
            <div className="space-y-3">
              <StatInput label="Tentados" statKey="arremessosTentados" />
              <StatInput label="Convertidos" statKey="arremessosConvertidos" />
            </div>
          </div>

          <div className="border-t border-slate-700 my-4 pt-4">
            <h3 className="text-slate-300 font-semibold mb-3">Arremessos de 3 Pontos</h3>
            <div className="space-y-3">
              <StatInput label="Tentados" statKey="arremessos3Tentados" />
              <StatInput label="Convertidos" statKey="arremessos3Convertidos" />
            </div>
          </div>

          <div className="border-t border-slate-700 my-4 pt-4">
            <h3 className="text-slate-300 font-semibold mb-3">Lances Livres</h3>
            <div className="space-y-3">
              <StatInput label="Tentados" statKey="lancesLivresTentados" />
              <StatInput label="Convertidos" statKey="lancesLivresConvertidos" />
            </div>
          </div>

          <StatInput label="Turnovers (Perdas)" statKey="turnovers" />
        </div>

        <div className="flex gap-3 pt-6 border-t border-slate-700 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Salvar Estatísticas
          </button>
        </div>
      </div>
    </div>
  )
}
