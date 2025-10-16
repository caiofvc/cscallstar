-- ====================================
-- INSERIR JOGADORES
-- ====================================

INSERT INTO players (nome, apelido, ativo) VALUES
  ('Brenno', 'Brenno', true),
  ('Caio', 'Caio', true),
  ('Jobson', 'Jobson', true),
  ('Joathan', 'Joathan', true),
  ('Pedro Meireles', 'Pedro', true),
  ('João Paulo', 'JP', true),
  ('Thiaguinho', 'Thiago', true),
  ('Renato', 'Renato', true),
  ('Paulo Victor', 'PV', true),
  ('Guilherme M', 'Gui', true),
  ('Maviael', 'Mavi', true),
  ('Mousinho', 'Mousinho', true),
  ('Vinicius Mousinho', 'Vini', true),
  ('Gustavo', 'Gustavo', true),
  ('João Victor', 'JV', true),
  ('Lucas Freitas', 'Lucas', true),
  ('Davi', 'Davi', true),
  ('Gabriel', 'Gabriel', true),
  ('Alysson', 'Aly', true),
  ('Stefano', 'Stefano', true);

-- Verificar jogadores inseridos
SELECT id, nome, apelido FROM players ORDER BY nome;
