-- ====================================
-- INSERÇÃO AUTOMÁTICA DE JOGO HISTÓRICO
-- Este script busca os IDs automaticamente por nome
-- ====================================

DO $$
DECLARE
  v_game_id UUID;
  v_brenno_id UUID;
  v_caio_id UUID;
  v_jobson_id UUID;
  v_joathan_id UUID;
  v_pedro_id UUID;
  v_joao_paulo_id UUID;
  v_thiaguinho_id UUID;
  v_renato_id UUID;
  v_paulo_victor_id UUID;
  v_guilherme_id UUID;
  v_maviael_id UUID;
  v_mousinho_id UUID;
  v_vinicius_id UUID;
  v_gustavo_id UUID;
  v_joao_victor_id UUID;
  v_lucas_id UUID;
  v_davi_id UUID;
  v_gabriel_id UUID;
  v_alysson_id UUID;
  v_stefano_id UUID;
BEGIN
  -- PASSO 1: Criar o jogo
  -- Altere a data se necessário (ex: '2025-10-13' para ontem)
  INSERT INTO games (data, descricao, local)
  VALUES (CURRENT_DATE - INTERVAL '1 day', 'Racha de Ontem', 'Quadra CSC')
  RETURNING id INTO v_game_id;
  
  RAISE NOTICE 'Jogo criado com ID: %', v_game_id;

  -- PASSO 2: Buscar IDs dos jogadores pelo nome
  -- Busca pelos nomes exatos inseridos no setup-completo.sql
  SELECT id INTO v_brenno_id FROM players WHERE nome = 'Brenno' LIMIT 1;
  SELECT id INTO v_caio_id FROM players WHERE nome = 'Caio' LIMIT 1;
  SELECT id INTO v_jobson_id FROM players WHERE nome = 'Jobson' LIMIT 1;
  SELECT id INTO v_joathan_id FROM players WHERE nome = 'Joathan' LIMIT 1;
  SELECT id INTO v_pedro_id FROM players WHERE nome = 'Pedro Meireles' LIMIT 1;
  SELECT id INTO v_joao_paulo_id FROM players WHERE nome = 'João Paulo' LIMIT 1;
  SELECT id INTO v_thiaguinho_id FROM players WHERE nome = 'Thiaguinho' LIMIT 1;
  SELECT id INTO v_renato_id FROM players WHERE nome = 'Renato Monteiro' LIMIT 1;
  SELECT id INTO v_paulo_victor_id FROM players WHERE nome = 'Paulo Victor' LIMIT 1;
  SELECT id INTO v_guilherme_id FROM players WHERE nome = 'Guilherme Machado' LIMIT 1;
  SELECT id INTO v_maviael_id FROM players WHERE nome = 'Maviael' LIMIT 1;
  SELECT id INTO v_mousinho_id FROM players WHERE nome = 'Mousinho' LIMIT 1;
  SELECT id INTO v_vinicius_id FROM players WHERE nome = 'Vinicius Mousinho' LIMIT 1;
  SELECT id INTO v_gustavo_id FROM players WHERE nome = 'Gustavo' LIMIT 1;
  SELECT id INTO v_joao_victor_id FROM players WHERE nome = 'João Victor' LIMIT 1;
  SELECT id INTO v_lucas_id FROM players WHERE nome = 'Lucas Freitas' LIMIT 1;
  SELECT id INTO v_davi_id FROM players WHERE nome = 'Davi' LIMIT 1;
  SELECT id INTO v_gabriel_id FROM players WHERE nome = 'Gabriel' LIMIT 1;
  SELECT id INTO v_alysson_id FROM players WHERE nome = 'Alysson' LIMIT 1;
  SELECT id INTO v_stefano_id FROM players WHERE nome = 'Stefano' LIMIT 1;

  -- Verificar se todos os jogadores foram encontrados
  IF v_brenno_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Brenno'; END IF;
  IF v_caio_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Caio'; END IF;
  IF v_jobson_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Jobson'; END IF;
  IF v_joathan_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Joathan'; END IF;
  IF v_pedro_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Pedro Meireles'; END IF;
  IF v_joao_paulo_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: João Paulo'; END IF;
  IF v_thiaguinho_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Thiaguinho'; END IF;
  IF v_renato_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Renato Monteiro'; END IF;
  IF v_paulo_victor_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Paulo Victor'; END IF;
  IF v_guilherme_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Guilherme Machado'; END IF;
  IF v_maviael_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Maviael'; END IF;
  IF v_mousinho_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Mousinho'; END IF;
  IF v_vinicius_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Vinicius Mousinho'; END IF;
  IF v_gustavo_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Gustavo'; END IF;
  IF v_joao_victor_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: João Victor'; END IF;
  IF v_lucas_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Lucas Freitas'; END IF;
  IF v_davi_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Davi'; END IF;
  IF v_gabriel_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Gabriel'; END IF;
  IF v_alysson_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Alysson'; END IF;
  IF v_stefano_id IS NULL THEN RAISE EXCEPTION 'Jogador não encontrado: Stefano'; END IF;

  RAISE NOTICE 'Todos os 20 jogadores encontrados!';

  -- PASSO 3: Inserir participantes
  INSERT INTO game_participants (game_id, player_id) VALUES
    (v_game_id, v_brenno_id),
    (v_game_id, v_caio_id),
    (v_game_id, v_jobson_id),
    (v_game_id, v_joathan_id),
    (v_game_id, v_pedro_id),
    (v_game_id, v_joao_paulo_id),
    (v_game_id, v_thiaguinho_id),
    (v_game_id, v_renato_id),
    (v_game_id, v_paulo_victor_id),
    (v_game_id, v_guilherme_id),
    (v_game_id, v_maviael_id),
    (v_game_id, v_mousinho_id),
    (v_game_id, v_vinicius_id),
    (v_game_id, v_gustavo_id),
    (v_game_id, v_joao_victor_id),
    (v_game_id, v_lucas_id),
    (v_game_id, v_davi_id),
    (v_game_id, v_gabriel_id),
    (v_game_id, v_alysson_id),
    (v_game_id, v_stefano_id);

  RAISE NOTICE 'Participantes adicionados!';

  -- PASSO 4: Inserir estatísticas
  INSERT INTO game_stats (game_id, player_id, pontos, rebotes, assistencias, arremessosConvertidos, arremessos3Convertidos, arremessosTentados, tocos, roubos, airballs, cestas_contra) VALUES
    (v_game_id, v_brenno_id, 21, 11, 2, 4, 2, 11, 2, 1, 2, 1), -- Airball=2, Cesta contra=1
    (v_game_id, v_caio_id, 3, 7, 1, 0, 1, 1, 0, 0, 0, 0),
    (v_game_id, v_jobson_id, 0, 3, 2, 0, 0, 0, 1, 1, 1, 0), -- Airball=1
    (v_game_id, v_joathan_id, 4, 0, 0, 2, 0, 2, 0, 0, 0, 0),
    (v_game_id, v_pedro_id, 19, 5, 0, 9, 0, 10, 2, 0, 0, 0),
    (v_game_id, v_joao_paulo_id, 8, 5, 0, 4, 0, 4, 1, 3, 0, 0),
    (v_game_id, v_thiaguinho_id, 5, 3, 3, 1, 1, 2, 2, 0, 0, 0),
    (v_game_id, v_renato_id, 5, 8, 5, 1, 1, 3, 1, 0, 0, 0),
    (v_game_id, v_paulo_victor_id, 5, 0, 0, 1, 1, 2, 0, 0, 0, 0),
    (v_game_id, v_guilherme_id, 4, 11, 1, 2, 0, 2, 1, 0, 0, 0),
    (v_game_id, v_maviael_id, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0),
    (v_game_id, v_mousinho_id, 7, 0, 0, 2, 1, 3, 2, 0, 0, 0),
    (v_game_id, v_vinicius_id, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0),
    (v_game_id, v_gustavo_id, 4, 5, 2, 2, 0, 2, 4, 1, 0, 0),
    (v_game_id, v_joao_victor_id, 3, 0, 0, 0, 1, 1, 1, 0, 0, 0),
    (v_game_id, v_lucas_id, 0, 2, 2, 0, 0, 0, 3, 0, 0, 0),
    (v_game_id, v_davi_id, 20, 2, 3, 1, 6, 7, 1, 2, 0, 0),
    (v_game_id, v_gabriel_id, 0, 1, 2, 0, 0, 0, 1, 0, 0, 0),
    (v_game_id, v_alysson_id, 21, 2, 2, 9, 0, 12, 4, 2, 0, 0),
    (v_game_id, v_stefano_id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

  RAISE NOTICE 'Estatísticas inseridas com sucesso!';
  RAISE NOTICE 'Total de pontos do jogo: 145';

END $$;

-- Verificar o resultado
SELECT 
  g.id,
  g.data,
  g.descricao,
  COUNT(gp.player_id) as total_jogadores,
  SUM(gs.pontos) as total_pontos
FROM games g
LEFT JOIN game_participants gp ON g.id = gp.game_id
LEFT JOIN game_stats gs ON g.id = gs.game_id
GROUP BY g.id, g.data, g.descricao
ORDER BY g.created_at DESC
LIMIT 1;
