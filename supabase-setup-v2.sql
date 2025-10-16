-- ====================================
-- ESTRUTURA DE BANCO COM JOGOS SEPARADOS
-- ====================================

-- 1. TABELA DE JOGADORES (cadastro básico)
CREATE TABLE IF NOT EXISTS players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  apelido TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. TABELA DE JOGOS (cada racha/partida)
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  descricao TEXT,
  local TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. TABELA DE PARTICIPANTES DO JOGO
-- Define quais jogadores estão participando de cada jogo
CREATE TABLE IF NOT EXISTS game_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(game_id, player_id) -- Um jogador não pode ser adicionado duas vezes ao mesmo jogo
);

-- 4. TABELA DE ESTATÍSTICAS POR JOGO
-- Liga jogadores aos jogos com suas estatísticas específicas
-- Só pode ter estatísticas se o jogador estiver em game_participants
CREATE TABLE IF NOT EXISTS game_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  pontos INTEGER DEFAULT 0,
  rebotes INTEGER DEFAULT 0,
  assistencias INTEGER DEFAULT 0,
  roubos INTEGER DEFAULT 0,
  tocos INTEGER DEFAULT 0,
  arremessosTentados INTEGER DEFAULT 0,
  arremessosConvertidos INTEGER DEFAULT 0,
  arremessos3Tentados INTEGER DEFAULT 0,
  arremessos3Convertidos INTEGER DEFAULT 0,
  lancesLivresTentados INTEGER DEFAULT 0,
  lancesLivresConvertidos INTEGER DEFAULT 0,
  turnovers INTEGER DEFAULT 0,
  airballs INTEGER DEFAULT 0,
  cestas_contra INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(game_id, player_id) -- Um jogador não pode ter múltiplas entradas no mesmo jogo
);

-- ====================================
-- ÍNDICES PARA PERFORMANCE
-- ====================================

CREATE INDEX IF NOT EXISTS idx_players_nome ON players(nome);
CREATE INDEX IF NOT EXISTS idx_players_ativo ON players(ativo);

CREATE INDEX IF NOT EXISTS idx_games_data ON games(data DESC);
CREATE INDEX IF NOT EXISTS idx_games_created ON games(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_game_participants_game ON game_participants(game_id);
CREATE INDEX IF NOT EXISTS idx_game_participants_player ON game_participants(player_id);

CREATE INDEX IF NOT EXISTS idx_game_stats_game ON game_stats(game_id);
CREATE INDEX IF NOT EXISTS idx_game_stats_player ON game_stats(player_id);
CREATE INDEX IF NOT EXISTS idx_game_stats_created ON game_stats(created_at DESC);

-- ====================================
-- TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA
-- ====================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_game_stats_updated_at
  BEFORE UPDATE ON game_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- VIEWS ÚTEIS
-- ====================================

-- View: Estatísticas acumuladas por jogador (total histórico)
CREATE OR REPLACE VIEW player_total_stats AS
SELECT 
  p.id,
  p.nome,
  p.apelido,
  COUNT(DISTINCT gs.game_id) as jogos,
  COALESCE(SUM(gs.pontos), 0) as pontos,
  COALESCE(SUM(gs.rebotes), 0) as rebotes,
  COALESCE(SUM(gs.assistencias), 0) as assistencias,
  COALESCE(SUM(gs.roubos), 0) as roubos,
  COALESCE(SUM(gs.tocos), 0) as tocos,
  COALESCE(SUM(gs.arremessosTentados), 0) as arremessosTentados,
  COALESCE(SUM(gs.arremessosConvertidos), 0) as arremessosConvertidos,
  COALESCE(SUM(gs.arremessos3Tentados), 0) as arremessos3Tentados,
  COALESCE(SUM(gs.arremessos3Convertidos), 0) as arremessos3Convertidos,
  COALESCE(SUM(gs.lancesLivresTentados), 0) as lancesLivresTentados,
  COALESCE(SUM(gs.lancesLivresConvertidos), 0) as lancesLivresConvertidos,
  COALESCE(SUM(gs.turnovers), 0) as turnovers
FROM players p
LEFT JOIN game_stats gs ON p.id = gs.player_id
WHERE p.ativo = true
GROUP BY p.id, p.nome, p.apelido;

-- View: Últimos 5 jogos com detalhes
CREATE OR REPLACE VIEW recent_games AS
SELECT 
  g.id,
  g.data,
  g.descricao,
  g.local,
  COUNT(DISTINCT gs.player_id) as total_jogadores,
  COALESCE(SUM(gs.pontos), 0) as total_pontos,
  g.created_at
FROM games g
LEFT JOIN game_stats gs ON g.id = gs.game_id
GROUP BY g.id, g.data, g.descricao, g.local, g.created_at
ORDER BY g.data DESC, g.created_at DESC
LIMIT 5;

-- ====================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_stats ENABLE ROW LEVEL SECURITY;

-- Políticas para players
CREATE POLICY "Permitir leitura pública de jogadores"
  ON players FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública de jogadores"
  ON players FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de jogadores"
  ON players FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Permitir deleção pública de jogadores"
  ON players FOR DELETE USING (true);

-- Políticas para games
CREATE POLICY "Permitir leitura pública de jogos"
  ON games FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública de jogos"
  ON games FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de jogos"
  ON games FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Permitir deleção pública de jogos"
  ON games FOR DELETE USING (true);

-- Políticas para game_participants
CREATE POLICY "Permitir leitura pública de participantes"
  ON game_participants FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública de participantes"
  ON game_participants FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de participantes"
  ON game_participants FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Permitir deleção pública de participantes"
  ON game_participants FOR DELETE USING (true);

-- Políticas para game_stats
CREATE POLICY "Permitir leitura pública de estatísticas"
  ON game_stats FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública de estatísticas"
  ON game_stats FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de estatísticas"
  ON game_stats FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Permitir deleção pública de estatísticas"
  ON game_stats FOR DELETE USING (true);

-- ====================================
-- FUNÇÕES ÚTEIS
-- ====================================

-- Função para obter estatísticas de um jogador em uma semana específica
CREATE OR REPLACE FUNCTION get_player_stats_by_week(
  p_player_id UUID,
  p_week_start DATE
)
RETURNS TABLE (
  jogos BIGINT,
  pontos BIGINT,
  rebotes BIGINT,
  assistencias BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT gs.game_id)::BIGINT,
    COALESCE(SUM(gs.pontos), 0)::BIGINT,
    COALESCE(SUM(gs.rebotes), 0)::BIGINT,
    COALESCE(SUM(gs.assistencias), 0)::BIGINT
  FROM game_stats gs
  JOIN games g ON gs.game_id = g.id
  WHERE gs.player_id = p_player_id
    AND g.data >= p_week_start
    AND g.data < p_week_start + INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Função para criar um novo jogo e retornar o ID
CREATE OR REPLACE FUNCTION create_game(
  p_data DATE DEFAULT CURRENT_DATE,
  p_descricao TEXT DEFAULT NULL,
  p_local TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_game_id UUID;
BEGIN
  INSERT INTO games (data, descricao, local)
  VALUES (p_data, p_descricao, p_local)
  RETURNING id INTO v_game_id;
  
  RETURN v_game_id;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- DADOS DE EXEMPLO (OPCIONAL - COMENTADO)
-- ====================================

-- Descomente para inserir dados de teste:
/*
-- Inserir jogadores de exemplo
INSERT INTO players (nome, apelido) VALUES 
  ('João Silva', 'Joãozinho'),
  ('Maria Santos', 'Má'),
  ('Pedro Costa', 'Pedrão');

-- Criar um jogo de hoje
INSERT INTO games (data, descricao, local) 
VALUES (CURRENT_DATE, 'Racha de Terça', 'Quadra do CSC');

-- Inserir estatísticas (você precisará pegar o ID do jogo criado)
-- INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias)
-- VALUES ('GAME_ID_AQUI', 'PLAYER_ID_AQUI', 15, 8, 3);
*/
