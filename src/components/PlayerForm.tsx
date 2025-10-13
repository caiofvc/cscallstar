import { useState } from 'react'
import { X } from 'lucide-react'
import { Player } from '../types'

interface PlayerFormProps {
  player?: Player
  onSubmit: (nome: string, apelido?: string) => void
  onClose: () => void
}

export default function PlayerForm({ player, onSubmit, onClose }: PlayerFormProps) {
  const [nome, setNome] = useState(player?.nome || '')
  const [apelido, setApelido] = useState(player?.apelido || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nome.trim()) {
      onSubmit(nome.trim(), apelido.trim() || undefined)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {player ? 'Editar Jogador' : 'Novo Jogador'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Nome <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Digite o nome"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Apelido (opcional)
            </label>
            <input
              type="text"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Digite o apelido"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
            >
              {player ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
