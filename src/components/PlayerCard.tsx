import { Edit2, Trash2, TrendingUp, Calendar } from 'lucide-react'
import { Player } from '../types'

interface PlayerCardProps {
  player: Player
  onEdit: () => void
  onDelete: () => void
  onViewStats: () => void
}

export default function PlayerCard({ player, onEdit, onDelete, onViewStats }: PlayerCardProps) {
  const avgPontos = player.stats.jogos > 0 
    ? (player.stats.pontos / player.stats.jogos).toFixed(1) 
    : '0.0'
  
  const fgPercentage = player.stats.arremessosTentados > 0
    ? ((player.stats.arremessosConvertidos / player.stats.arremessosTentados) * 100).toFixed(1)
    : '0.0'

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Nunca'
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-xl hover:shadow-slate-900/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{player.nome}</h3>
          {player.apelido && (
            <p className="text-slate-400 text-sm">"{player.apelido}"</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onDelete}
            className="text-slate-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {player.updated_at && (
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 pb-2 border-b border-slate-700">
            <Calendar size={14} />
            <span>Último racha: {formatDate(player.updated_at)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Jogos</span>
          <span className="text-white font-semibold">{player.stats.jogos}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Média PPG</span>
          <span className="text-white font-semibold">{avgPontos}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">FG%</span>
          <span className="text-white font-semibold">{fgPercentage}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Rebotes</span>
          <span className="text-white font-semibold">{player.stats.rebotes}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Assistências</span>
          <span className="text-white font-semibold">{player.stats.assistencias}</span>
        </div>
      </div>

      <button
        onClick={onViewStats}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-lg"
      >
        <TrendingUp size={20} />
        Editar Stats
      </button>
    </div>
  )
}
