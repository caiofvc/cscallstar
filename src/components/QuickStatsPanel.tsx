import { useState } from 'react'
import { X, Plus, Minus, TrendingUp } from 'lucide-react'
import { Player, PlayerStats } from '../types'

interface QuickStatsPanelProps {
  player: Player
  onUpdate: (stats: PlayerStats) => void
  onClose: () => void
}

export default function QuickStatsPanel({ player, onUpdate, onClose }: QuickStatsPanelProps) {
  const [stats, setStats] = useState<PlayerStats>(player.stats)
  const [activeTab, setActiveTab] = useState<'main' | 'shooting'>('main')

  const updateStat = (key: keyof PlayerStats, value: number) => {
    setStats({ ...stats, [key]: Math.max(0, value) })
  }

  const increment = (key: keyof PlayerStats, amount: number = 1) => {
    updateStat(key, (stats[key] ?? 0) + amount)
  }

  const decrement = (key: keyof PlayerStats, amount: number = 1) => {
    updateStat(key, (stats[key] ?? 0) - amount)
  }

  const handleSave = () => {
    onUpdate(stats)
  }

  // Quick stat button component optimized for touch
  const QuickStatButton = ({ 
    label, 
    statKey
  }: { 
    label: string
    statKey: keyof PlayerStats
  }) => (
    <div className="bg-slate-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <label className="text-slate-300 font-medium text-lg">{label}</label>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => decrement(statKey)}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl flex-shrink-0 active:scale-95 transition-transform"
        >
          <Minus size={24} />
        </button>
        <div className="flex-1 bg-slate-700 rounded-xl py-4 text-center">
          <span className="text-white text-3xl font-bold">{stats[statKey] ?? 0}</span>
        </div>
        <button
          type="button"
          onClick={() => increment(statKey)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl flex-shrink-0 active:scale-95 transition-transform"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  )

  const ShootingStatButton = ({ 
    label, 
    madeKey,
    attemptKey,
    color
  }: { 
    label: string
    madeKey: keyof PlayerStats
    attemptKey: keyof PlayerStats
    color: string
  }) => {
    const percentage = (stats[attemptKey] ?? 0) > 0
      ? (((stats[madeKey] ?? 0) / (stats[attemptKey] ?? 1)) * 100).toFixed(1)
      : '0.0'

    return (
      <div className={`${color} rounded-xl p-4`}>
        <h4 className="text-white font-semibold mb-3 text-lg">{label}</h4>
        <div className="text-center mb-3 bg-black/20 rounded-lg py-2">
          <span className="text-white text-2xl font-bold">{percentage}%</span>
        </div>
        
        {/* Convertidos */}
        <div className="mb-3">
          <p className="text-white/80 text-sm mb-2">Convertidos</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(madeKey)}
              className="bg-black/30 hover:bg-black/40 text-white p-3 rounded-lg flex-shrink-0"
            >
              <Minus size={20} />
            </button>
            <div className="flex-1 bg-black/30 rounded-lg py-2 text-center">
              <span className="text-white text-2xl font-bold">{stats[madeKey] ?? 0}</span>
            </div>
            <button
              onClick={() => increment(madeKey)}
              className="bg-black/30 hover:bg-black/40 text-white p-3 rounded-lg flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Tentados */}
        <div>
          <p className="text-white/80 text-sm mb-2">Tentados</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(attemptKey)}
              className="bg-black/30 hover:bg-black/40 text-white p-3 rounded-lg flex-shrink-0"
            >
              <Minus size={20} />
            </button>
            <div className="flex-1 bg-black/30 rounded-lg py-2 text-center">
              <span className="text-white text-2xl font-bold">{stats[attemptKey] ?? 0}</span>
            </div>
            <button
              onClick={() => increment(attemptKey)}
              className="bg-black/30 hover:bg-black/40 text-white p-3 rounded-lg flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
      <div className="bg-slate-900 rounded-t-3xl md:rounded-xl w-full md:max-w-2xl md:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{player.nome}</h2>
            {player.apelido && (
              <p className="text-slate-400">"{player.apelido}"</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('main')}
            className={`flex-1 py-4 font-medium transition-colors ${
              activeTab === 'main'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400'
            }`}
          >
            <TrendingUp className="inline mr-2" size={18} />
            Principal
          </button>
          <button
            onClick={() => setActiveTab('shooting')}
            className={`flex-1 py-4 font-medium transition-colors ${
              activeTab === 'shooting'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400'
            }`}
          >
            Arremessos
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'main' ? (
            <>
              <QuickStatButton label="Jogos" statKey="jogos" />
              <QuickStatButton label="Pontos" statKey="pontos" />
              <QuickStatButton label="Rebotes" statKey="rebotes" />
              <QuickStatButton label="Assistências" statKey="assistencias" />
              <QuickStatButton label="Roubos" statKey="roubos" />
              <QuickStatButton label="Tocos" statKey="tocos" />
              <QuickStatButton label="Turnovers" statKey="turnovers" />
              <QuickStatButton label="Airballs" statKey="airballs" />
              <QuickStatButton label="Cestas Contra" statKey="cestas_contra" />
            </>
          ) : (
            <>
              <ShootingStatButton
                label="Arremessos de Campo"
                madeKey="arremessosConvertidos"
                attemptKey="arremessosTentados"
                color="bg-blue-600"
              />
              <ShootingStatButton
                label="Arremessos de 3 Pontos"
                madeKey="arremessos3Convertidos"
                attemptKey="arremessos3Tentados"
                color="bg-purple-600"
              />
              <ShootingStatButton
                label="Lances Livres"
                madeKey="lancesLivresConvertidos"
                attemptKey="lancesLivresTentados"
                color="bg-green-600"
              />
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
