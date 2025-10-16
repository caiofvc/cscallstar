-- ====================================
-- INSERIR JOGO HISTÓRICO COM ESTATÍSTICAS
-- ====================================

-- IMPORTANTE: Este SQL assume que os jogadores já foram cadastrados
-- Você precisará ajustar os player_id's de acordo com os IDs reais do seu banco

-- PASSO 1: Criar o jogo
-- Ajuste a data, descrição e local conforme necessário
INSERT INTO games (data, descricao, local)
VALUES (CURRENT_DATE, 'Jogo Histórico', 'Quadra CSC')
RETURNING id;

-- ANOTE O ID RETORNADO e substitua 'GAME_ID_AQUI' abaixo

-- ====================================
-- PASSO 2: Buscar IDs dos jogadores
-- ====================================
-- Execute este SELECT para ver os IDs dos jogadores:
SELECT id, nome, apelido FROM players ORDER BY nome;

-- ====================================
-- PASSO 3: Inserir participantes
-- Substitua os IDs pelos IDs reais dos jogadores
-- ====================================
INSERT INTO game_participants (game_id, player_id)
VALUES 
  ('GAME_ID_AQUI', 'ID_BRENNO'),
  ('GAME_ID_AQUI', 'ID_CAIO'),
  ('GAME_ID_AQUI', 'ID_JOBSON'),
  ('GAME_ID_AQUI', 'ID_JOATHAN'),
  ('GAME_ID_AQUI', 'ID_PEDRO_MEIRELES'),
  ('GAME_ID_AQUI', 'ID_JOAO_PAULO'),
  ('GAME_ID_AQUI', 'ID_THIAGUINHO'),
  ('GAME_ID_AQUI', 'ID_RENATO'),
  ('GAME_ID_AQUI', 'ID_PAULO_VICTOR'),
  ('GAME_ID_AQUI', 'ID_GUILHERME_M'),
  ('GAME_ID_AQUI', 'ID_MAVIAEL'),
  ('GAME_ID_AQUI', 'ID_MOUSINHO'),
  ('GAME_ID_AQUI', 'ID_VINICIUS_MOUSINHO'),
  ('GAME_ID_AQUI', 'ID_GUSTAVO'),
  ('GAME_ID_AQUI', 'ID_JOAO_VICTOR'),
  ('GAME_ID_AQUI', 'ID_LUCAS_FREITAS'),
  ('GAME_ID_AQUI', 'ID_DAVI'),
  ('GAME_ID_AQUI', 'ID_GABRIEL'),
  ('GAME_ID_AQUI', 'ID_ALYSSON'),
  ('GAME_ID_AQUI', 'ID_STEFANO');

-- ====================================
-- PASSO 4: Inserir estatísticas
-- Substitua os IDs pelos IDs reais
-- ====================================

-- Brenno: 21pts, 11reb, 2ast, 4x2pts, 2x3pts, 7FG, 2tocos, 1roubo, 1cesta-contra
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessos3Convertidos, arremessosTentados, tocos, roubos)
VALUES ('GAME_ID_AQUI', 'ID_BRENNO', 21, 11, 2, 4, 2, 7, 2, 1);

-- Caio: 3pts, 7reb, 1ast, 1x3pts
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessos3Convertidos, arremessosTentados)
VALUES ('GAME_ID_AQUI', 'ID_CAIO', 3, 7, 1, 1, 1);

-- Jobson: 0pts, 3reb, 2ast, 1toco, 1roubo
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, tocos, roubos)
VALUES ('GAME_ID_AQUI', 'ID_JOBSON', 0, 3, 2, 1, 1);

-- Joathan: 4pts, 2x2pts
INSERT INTO game_stats (game_id, player_id, pontos, arremessosConvertidos, arremessosTentados)
VALUES ('GAME_ID_AQUI', 'ID_JOATHAN', 4, 2, 2);

-- Pedro Meireles: 19pts, 5reb, 9x2pts, 1FG, 2tocos
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, arremessosConvertidos, arremessosTentados, tocos)
VALUES ('GAME_ID_AQUI', 'ID_PEDRO_MEIRELES', 19, 5, 9, 10, 2);

-- João Paulo: 8pts, 5reb, 4x2pts, 1toco, 3roubos
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, arremessosConvertidos, arremessosTentados, tocos, roubos)
VALUES ('GAME_ID_AQUI', 'ID_JOAO_PAULO', 8, 5, 4, 4, 1, 3);

-- Thiaguinho: 5pts, 3reb, 3ast, 1x2pts, 1x3pts, 2tocos
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessos3Convertidos, arremessosTentados, tocos)
VALUES ('GAME_ID_AQUI', 'ID_THIAGUINHO', 5, 3, 3, 1, 1, 2, 2);

-- Renato: 5pts, 8reb, 5ast, 1toco, 1x2pts, 1x3pts
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessos3Convertidos, arremessosTentados, tocos)
VALUES ('GAME_ID_AQUI', 'ID_RENATO', 5, 8, 5, 1, 1, 2, 1);

-- Paulo Victor: 5pts, 1x2pts, 1x3pts
INSERT INTO game_stats (game_id, player_id, pontos, arremessosConvertidos, arremessos3Convertidos, arremessosTentados)
VALUES ('GAME_ID_AQUI', 'ID_PAULO_VICTOR', 5, 1, 1, 2);

-- Guilherme M: 4pts, 11reb, 1ast, 2x2pts, 1toco
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessosTentados, tocos)
VALUES ('GAME_ID_AQUI', 'ID_GUILHERME_M', 4, 11, 1, 2, 2, 1);

-- Maviael: 0pts, 1reb, 1ast, 1toco
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, tocos)
VALUES ('GAME_ID_AQUI', 'ID_MAVIAEL', 0, 1, 1, 1);

-- Mousinho: 7pts, 2x2pts, 1x3pts, 2tocos
INSERT INTO game_stats (game_id, player_id, pontos, arremessosConvertidos, arremessos3Convertidos, arremessosTentados, tocos)
VALUES ('GAME_ID_AQUI', 'ID_MOUSINHO', 7, 2, 1, 3, 2);

-- Vinicius Mousinho: 0pts, 2reb, 2tocos
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, tocos)
VALUES ('GAME_ID_AQUI', 'ID_VINICIUS_MOUSINHO', 0, 2, 2);

-- Gustavo: 4pts, 5reb, 2ast, 2x2pts, 4tocos, 1roubo
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessosTentados, tocos, roubos)
VALUES ('GAME_ID_AQUI', 'ID_GUSTAVO', 4, 5, 2, 2, 2, 4, 1);

-- João Victor: 3pts, 1x3pts, 1toco
INSERT INTO game_stats (game_id, player_id, pontos, arremessos3Convertidos, arremessosTentados, tocos)
VALUES ('GAME_ID_AQUI', 'ID_JOAO_VICTOR', 3, 1, 1, 1);

-- Lucas Freitas: 0pts, 2reb, 2ast, 3tocos
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, tocos)
VALUES ('GAME_ID_AQUI', 'ID_LUCAS_FREITAS', 0, 2, 2, 3);

-- Davi: 20pts, 2reb, 3ast, 1x2pts, 6x3pts, 1toco, 2roubos
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessos3Convertidos, arremessosTentados, tocos, roubos)
VALUES ('GAME_ID_AQUI', 'ID_DAVI', 20, 2, 3, 1, 6, 7, 1, 2);

-- Gabriel: 0pts, 1reb, 2ast, 1toco
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, tocos)
VALUES ('GAME_ID_AQUI', 'ID_GABRIEL', 0, 1, 2, 1);

-- Alysson: 21pts, 2reb, 2ast, 9x2pts, 3FG, 4tocos, 2roubos
INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessosTentados, tocos, roubos)
VALUES ('GAME_ID_AQUI', 'ID_ALYSSON', 21, 2, 2, 9, 12, 4, 2);

-- Stefano: 0pts
INSERT INTO game_stats (game_id, player_id, pontos)
VALUES ('GAME_ID_AQUI', 'ID_STEFANO', 0);

-- ====================================
-- OBSERVAÇÕES IMPORTANTES:
-- ====================================
-- 1. "FG" foi interpretado como arremessosTentados
-- 2. "AirBall" e "Cesta contra" não têm campos específicos (foram ignorados)
-- 3. Calculei arremessos2Convertidos = cestas de 2pts
-- 4. Calculei arremessos3Convertidos = cestas de 3pts
-- 5. Total de pontos já está na planilha
-- 6. Para campos vazios, usei 0 (padrão)

-- ====================================
-- COMO USAR ESTE SQL:
-- ====================================
-- 1. Execute PASSO 1 para criar o jogo e anote o ID
-- 2. Execute PASSO 2 para ver os IDs dos jogadores
-- 3. Substitua todos os 'GAME_ID_AQUI' e 'ID_JOGADOR' pelos IDs reais
-- 4. Execute PASSO 3 para adicionar participantes
-- 5. Execute PASSO 4 para inserir as estatísticas

-- ====================================
-- ALTERNATIVA MAIS FÁCIL:
-- ====================================
-- Se você me passar os IDs dos jogadores, eu crio um SQL pronto!
-- Ou execute este comando e me mande o resultado:
-- SELECT id, nome, apelido FROM players ORDER BY nome;
