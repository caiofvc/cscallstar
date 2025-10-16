import { useState, useEffect } from 'react'
import { Plus, User, Loader2, LogOut, PlayCircle } from 'lucide-react'
import { Player, PlayerStats } from './types'
import PlayerCard from './components/PlayerCard'
import PlayerForm from './components/PlayerForm'
import StatsModal from './components/StatsModal'
import QuickStatsPanel from './components/QuickStatsPanel'
import LiveGameMode from './components/LiveGameMode'
import Login from './components/Login'
import { supabase } from './lib/supabase'
import { authService } from './lib/auth'

function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [statsPlayer, setStatsPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [liveGameMode, setLiveGameMode] = useState(false)
  const useQuickStats = true // Sempre usa o painel rápido otimizado para mobile

  // Verificar autenticação ao carregar
  useEffect(() => {
    if (authService.isAuthenticated()) {
      setIsAuthenticated(true)
      loadPlayers()
    } else {
      setLoading(false)
    }
  }, [])

  const loadPlayers = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Adicionar stats vazias para compatibilidade (estrutura nova não tem stats no player)
      const playersWithStats = (data || []).map(player => ({
        ...player,
        stats: {
          pontos: 0,
          rebotes: 0,
          assistencias: 0,
          roubos: 0,
          tocos: 0,
          arremessosTentados: 0,
          arremessosConvertidos: 0,
          arremessos3Tentados: 0,
          arremessos3Convertidos: 0,
          lancesLivresTentados: 0,
          lancesLivresConvertidos: 0,
          turnovers: 0,
          jogos: 0,
          airballs: 0,
          cestas_contra: 0,
        }
      }))
      
      setPlayers(playersWithStats)
    } catch (err: any) {
      setError(err.message)
      console.error('Erro ao carregar jogadores:', err)
    } finally {
      setLoading(false)
    }
  }

  const addPlayer = async (nome: string, apelido?: string) => {
    try {
      const newPlayer = {
        nome,
        apelido,
        ativo: true
      }

      const { data, error } = await supabase
        .from('players')
        .insert([newPlayer])
        .select()

      if (error) throw error
      if (data) {
        // Adicionar stats vazias localmente para compatibilidade com o código atual
        const playerWithStats = {
          ...data[0],
          stats: {
            pontos: 0,
            rebotes: 0,
            assistencias: 0,
            roubos: 0,
            tocos: 0,
            arremessosTentados: 0,
            arremessosConvertidos: 0,
            arremessos3Tentados: 0,
            arremessos3Convertidos: 0,
            lancesLivresTentados: 0,
            lancesLivresConvertidos: 0,
            turnovers: 0,
            jogos: 0,
            airballs: 0,
            cestas_contra: 0,
          }
        }
        setPlayers([playerWithStats, ...players])
      }
      setShowForm(false)
    } catch (err: any) {
      alert('Erro ao adicionar jogador: ' + err.message)
      console.error('Erro:', err)
    }
  }

  const updatePlayer = async (id: string, nome: string, apelido?: string) => {
    try {
      const { error } = await supabase
        .from('players')
        .update({ nome, apelido })
        .eq('id', id)

      if (error) throw error

      setPlayers(players.map(p => 
        p.id === id ? { ...p, nome, apelido } : p
      ))
      setEditingPlayer(null)
    } catch (err: any) {
      alert('Erro ao atualizar jogador: ' + err.message)
      console.error('Erro:', err)
    }
  }

  const deletePlayer = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este jogador?')) {
      try {
        const { error } = await supabase
          .from('players')
          .delete()
          .eq('id', id)

        if (error) throw error

        setPlayers(players.filter(p => p.id !== id))
      } catch (err: any) {
        alert('Erro ao remover jogador: ' + err.message)
        console.error('Erro:', err)
      }
    }
  }

  const updateStats = async (id: string, stats: PlayerStats) => {
    // NOTA: Com a nova estrutura, stats são salvos por jogo em game_stats
    // Esta função agora apenas atualiza localmente para compatibilidade
    // Use o LiveGameMode para registrar estatísticas de jogos
    try {
      // Atualizar apenas localmente (não persiste no banco)
      setPlayers(players.map(p => 
        p.id === id ? { ...p, stats } : p
      ))
      setStatsPlayer(null)
      
      alert('⚠️ Atenção: Estatísticas não foram salvas no banco!\nUse o "Modo Ao Vivo" para registrar jogos e estatísticas.')
    } catch (err: any) {
      alert('Erro ao atualizar estatísticas: ' + err.message)
      console.error('Erro:', err)
    }
  }

  const handleLogin = async (password: string) => {
    setAuthLoading(true)
    try {
      await authService.login(password)
      setIsAuthenticated(true)
      await loadPlayers()
    } catch (err: any) {
      throw err
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      authService.logout()
      setIsAuthenticated(false)
      setPlayers([])
    }
  }

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} loading={authLoading} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
              title="Sair"
            >
              <LogOut size={20} />
              <span className="text-sm">Sair</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              🏀 CSC All Star
            </h1>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <User className="text-blue-400" size={24} />
              <div>
                <p className="text-slate-400 text-sm">Total de Jogadores</p>
                <p className="text-2xl font-bold text-white">{players.length}</p>
              </div>
            </div>
          </div>
          {/*<div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-400" size={24} />
              <div>
                <p className="text-slate-400 text-sm">Total de Jogos</p>
                <p className="text-2xl font-bold text-white">
                  {players.reduce((acc, p) => acc + p.stats.jogos, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-slate-400 text-sm">Total de Pontos</p>
                <p className="text-2xl font-bold text-white">
                  {players.reduce((acc, p) => acc + p.stats.pontos, 0)}
                </p>
              </div>
            </div>
          </div>*/}
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setLiveGameMode(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-lg"
          >
            <PlayCircle size={24} />
            Iniciar Partida Ao Vivo
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Adicionar Jogador
          </button>
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-400" size={48} />
            <p className="ml-4 text-slate-400 text-lg">Carregando jogadores...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg mb-2">Erro ao carregar dados</p>
            <p className="text-slate-500">{error}</p>
            <button
              onClick={loadPlayers}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-20">
            <User className="mx-auto text-slate-600 mb-4" size={64} />
            <p className="text-slate-400 text-lg">Nenhum jogador cadastrado ainda.</p>
            <p className="text-slate-500">Clique em "Adicionar Jogador" para começar!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                onEdit={() => setEditingPlayer(player)}
                onDelete={() => deletePlayer(player.id)}
                onViewStats={() => setStatsPlayer(player)}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        {showForm && (
          <PlayerForm
            onSubmit={addPlayer}
            onClose={() => setShowForm(false)}
          />
        )}

        {editingPlayer && (
          <PlayerForm
            player={editingPlayer}
            onSubmit={(nome, apelido) => updatePlayer(editingPlayer.id, nome, apelido)}
            onClose={() => setEditingPlayer(null)}
          />
        )}

        {statsPlayer && (
          useQuickStats ? (
            <QuickStatsPanel
              player={statsPlayer}
              onUpdate={(stats) => updateStats(statsPlayer.id, stats)}
              onClose={() => setStatsPlayer(null)}
            />
          ) : (
            <StatsModal
              player={statsPlayer}
              onUpdate={(stats) => updateStats(statsPlayer.id, stats)}
              onClose={() => setStatsPlayer(null)}
            />
          )
        )}

        {liveGameMode && (
          <LiveGameMode
            players={players}
            onUpdate={updateStats}
            onClose={() => setLiveGameMode(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App
