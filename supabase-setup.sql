-- Criar tabela de jogadores
CREATE TABLE IF NOT EXISTS players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  apelido TEXT,
  stats JSONB NOT NULL DEFAULT '{
    "pontos": 0,
    "rebotes": 0,
    "assistencias": 0,
    "roubos": 0,
    "tocos": 0,
    "arremessosTentados": 0,
    "arremessosConvertidos": 0,
    "arremessos3Tentados": 0,
    "arremessos3Convertidos": 0,
    "lancesLivresTentados": 0,
    "lancesLivresConvertidos": 0,
    "turnovers": 0,
    "jogos": 0
  }'::jsonb,
  created_at DATE DEFAULT CURRENT_DATE,
  updated_at DATE DEFAULT CURRENT_DATE
);

-- Criar índice para ordenação por data de criação
CREATE INDEX IF NOT EXISTS players_created_at_idx ON players(created_at DESC);

-- Criar índice para agrupar por data de atualização (útil para filtrar jogos por dia)
CREATE INDEX IF NOT EXISTS players_updated_at_idx ON players(updated_at DESC);

-- Criar função para atualizar o updated_at automaticamente (apenas data, sem hora)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_DATE;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de jogadores"
  ON players FOR SELECT
  USING (true);

-- Criar política para permitir inserção pública
CREATE POLICY "Permitir inserção pública de jogadores"
  ON players FOR INSERT
  WITH CHECK (true);

-- Criar política para permitir atualização pública
CREATE POLICY "Permitir atualização pública de jogadores"
  ON players FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Criar política para permitir deleção pública
CREATE POLICY "Permitir deleção pública de jogadores"
  ON players FOR DELETE
  USING (true);
