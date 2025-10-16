-- ====================================
-- VERIFICAR JOGADORES NO BANCO
-- ====================================

-- Ver todos os jogadores cadastrados
SELECT id, nome, apelido, ativo FROM players ORDER BY nome;

-- Contar total
SELECT COUNT(*) as total_jogadores FROM players;

-- Verificar quais nomes específicos existem
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Brenno') THEN '✅' ELSE '❌' 
  END as "Brenno",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Caio') THEN '✅' ELSE '❌' 
  END as "Caio",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Jobson') THEN '✅' ELSE '❌' 
  END as "Jobson",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Joathan') THEN '✅' ELSE '❌' 
  END as "Joathan",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Pedro Meireles') THEN '✅' ELSE '❌' 
  END as "Pedro Meireles",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'João Paulo') THEN '✅' ELSE '❌' 
  END as "João Paulo",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Thiaguinho') THEN '✅' ELSE '❌' 
  END as "Thiaguinho",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Renato') THEN '✅' ELSE '❌' 
  END as "Renato",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Paulo Victor') THEN '✅' ELSE '❌' 
  END as "Paulo Victor",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Guilherme M') THEN '✅' ELSE '❌' 
  END as "Guilherme M",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Maviael') THEN '✅' ELSE '❌' 
  END as "Maviael",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Mousinho') THEN '✅' ELSE '❌' 
  END as "Mousinho",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Vinicius Mousinho') THEN '✅' ELSE '❌' 
  END as "Vinicius Mousinho",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Gustavo') THEN '✅' ELSE '❌' 
  END as "Gustavo",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'João Victor') THEN '✅' ELSE '❌' 
  END as "João Victor",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Lucas Freitas') THEN '✅' ELSE '❌' 
  END as "Lucas Freitas",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Davi') THEN '✅' ELSE '❌' 
  END as "Davi",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Gabriel') THEN '✅' ELSE '❌' 
  END as "Gabriel",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Alysson') THEN '✅' ELSE '❌' 
  END as "Alysson",
  CASE 
    WHEN EXISTS(SELECT 1 FROM players WHERE nome = 'Stefano') THEN '✅' ELSE '❌' 
  END as "Stefano";
