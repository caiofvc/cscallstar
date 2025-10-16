# 📱 Guia de Uso Mobile - CSC All Star

Este guia é especialmente para você que vai usar o sistema durante as partidas no celular.

## 🎮 Modo Ao Vivo - O Jeito Mais Rápido

### Como Usar Durante a Partida

1. **Abra o app no celular** e faça login
2. Clique no botão verde **"Iniciar Partida Ao Vivo"**
3. Você verá uma tela otimizada para registro rápido

### Registrando Ações

#### Passo a Passo
1. **Selecione o jogador** no dropdown no topo
2. **Toque no botão da ação** que acabou de acontecer
3. **Pronto!** A estatística já foi salva automaticamente

#### Botões Disponíveis

**🎯 Arremessos**
- **Cesta 2pts** 🎯 - Arremesso de campo convertido (2 pontos)
- **Errou 2pts** - Arremesso de campo perdido
- **Cesta 3pts** 🔥 - Arremesso de 3 pontos convertido
- **Errou 3pts** - Arremesso de 3 perdido
- **Lance Livre ✓** - Lance livre convertido (1 ponto)
- **Lance Livre ✗** - Lance livre errado

**💪 Outras Ações**
- **Rebote** 💪 - Rebote ofensivo ou defensivo
- **Assistência** 🤝 - Passe que resulta em cesta
- **Roubo** ⚡ - Roubo de bola
- **Toco** 🚫 - Bloqueio de arremesso
- **Turnover** - Perda de bola

### ↩️ Desfazer Erros

Tocou no botão errado? Sem problema!

1. Role a tela até o botão **"Desfazer Última Ação"**
2. Toque nele para reverter a última ação
3. A estatística será automaticamente corrigida

### 📊 Placar em Tempo Real

- Na parte inferior da tela, você vê o placar atualizado
- Mostra os pontos de todos os jogadores com pontuação
- Ordenado do maior para o menor pontuador
- Atualiza automaticamente a cada ação

### 📜 Histórico de Ações

- Logo abaixo do botão "Desfazer", você vê as últimas 10 ações
- Mostra qual jogador fez o quê e em que horário
- Útil para revisar e confirmar os registros

## ✏️ Editor Rápido de Estatísticas

Se preferir editar estatísticas manualmente ou fazer ajustes:

1. Na tela principal, toque em **"Editar Stats"** no card do jogador
2. Use as **abas** para navegar:
   - **Principal** - Jogos, pontos, rebotes, assistências, roubos, tocos, turnovers
   - **Arremessos** - FG%, 3P%, FT% com tentados e convertidos

### Controles
- **Botão Verde (+)** - Incrementa o valor
- **Botão Vermelho (-)** - Decrementa o valor
- **Campo Central** - Mostra o valor atual
- **Percentual** - Calculado automaticamente nos arremessos

## 🎯 Dicas para Uso Durante o Jogo

### Antes da Partida
1. ✅ Cadastre todos os jogadores com antecedência
2. ✅ Teste o sistema para se familiarizar
3. ✅ Verifique a conexão com internet
4. ✅ Deixe o celular carregado ou com bateria suficiente

### Durante a Partida
- 👤 **Sempre selecione o jogador antes** de registrar a ação
- 👀 **Confirme visualmente** quando a ação for registrada
- 🔄 **Use o histórico** para verificar se algo foi registrado errado
- ↩️ **Desfaça imediatamente** se cometer um erro
- 📊 **Confira o placar** periodicamente

### Fluxo Rápido Recomendado
```
CESTA DE 3 PONTOS:
1. Toque no dropdown de jogador
2. Selecione o jogador
3. Toque em "Cesta 3pts"
✅ Pronto! 3 pontos registrados

REBOTE + ASSISTÊNCIA:
1. Selecione jogador que pegou rebote
2. Toque em "Rebote"
3. Selecione jogador que deu assistência
4. Toque em "Assistência"
5. Selecione jogador que fez a cesta
6. Toque em "Cesta 2pts" ou "Cesta 3pts"
```

## 🚨 Resolução de Problemas

### "Selecione um jogador primeiro!"
- Você tentou registrar uma ação sem selecionar o jogador
- Toque no dropdown no topo e escolha um jogador

### Ação registrada para o jogador errado
1. Toque em "Desfazer Última Ação"
2. Selecione o jogador correto
3. Registre a ação novamente

### Botão não responde
- Aguarde um segundo e toque novamente
- O sistema pode estar salvando no banco de dados
- Verifique sua conexão com internet

### Perdeu várias ações
- Não use o "Desfazer" múltiplas vezes seguidas
- É melhor usar o "Editar Stats" e ajustar manualmente
- Desfazer só reverte a última ação de cada vez

## 🔋 Otimizações Mobile

O sistema foi otimizado para:

- ✅ **Touch targets grandes** (mínimo 44x44px)
- ✅ **Sem zoom indesejado** em inputs
- ✅ **Feedback visual** ao tocar (botões diminuem)
- ✅ **Scroll suave** em listas longas
- ✅ **Modo retrato** (uso com uma mão)
- ✅ **Funciona offline** temporariamente (salva quando voltar internet)

## 💾 Salvamento Automático

- ⚡ Cada ação é salva **imediatamente** no banco de dados
- ☁️ Dados sincronizados **em tempo real** com o Supabase
- 🔄 Se perder conexão, o sistema tenta **reconectar automaticamente**
- ✅ Ao fechar o Modo Ao Vivo, **tudo já está salvo**

## 📱 Atalhos e Gestos

- **Toque duplo no topo** - Volta ao topo da tela
- **Swipe para baixo** - Atualiza a lista (na tela principal)
- **Toque longo** não faz nada - todos os botões respondem com toque simples

## 🏆 Boas Práticas

1. **Um operador** - Ideal ter 1 pessoa dedicada a registrar
2. **Confirmação verbal** - Fale "registrado" após cada ação importante
3. **Pausas táticas** - Aproveite para revisar os registros
4. **Fim do jogo** - Confirme o placar com os jogadores antes de fechar

## ❓ Perguntas Frequentes

**P: Preciso de internet durante todo o jogo?**
R: Sim, para salvar as ações em tempo real. Mas se cair, o sistema continua funcionando e sincroniza depois.

**P: Posso usar em vários celulares ao mesmo tempo?**
R: Sim! Todos verão as atualizações em tempo real.

**P: E se o celular desligar no meio do jogo?**
R: Todas as ações já registradas estão salvas. Você pode continuar de onde parou.

**P: Como sei se a ação foi salva?**
R: A ação aparece no histórico abaixo e o placar é atualizado.

**P: Posso editar depois do jogo?**
R: Sim! Use o "Editar Stats" no card do jogador na tela principal.

---

💡 **Dica Final**: Pratique antes da primeira partida! Simule algumas ações para pegar o jeito da interface.
