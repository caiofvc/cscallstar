# 🏀 CSC All Star - Sistema de Racha de Basquete

Sistema completo para gerenciar jogadores e estatísticas do seu racha de basquete com integração ao Supabase.

## 📋 Funcionalidades

- 🔐 **Login com Senha Única**: Acesso controlado para o grupo
- ✅ **Cadastro de Jogadores**: Adicione jogadores com nome e apelido
- 📊 **Estatísticas Completas**: Acompanhe todas as estatísticas importantes incluindo tocos e roubos
- 📈 **Percentuais Automáticos**: Cálculo automático de FG%, 3P% e FT%
- ☁️ **Persistência em Nuvem**: Dados salvos no Supabase com timestamps
- 🔄 **Sincronização em Tempo Real**: Dados atualizados automaticamente
- 🎨 **Interface Moderna**: Design responsivo e intuitivo

## 📊 Estatísticas Rastreadas

- Jogos disputados
- Pontos totais e média por jogo (PPG)
- Rebotes
- Assistências
- Roubos de bola
- Tocos
- Arremessos de campo (tentados/convertidos)
- Arremessos de 3 pontos (tentados/convertidos)
- Lances livres (tentados/convertidos)
- Turnovers (perdas de bola)

## 🌐 Sistema Online

🎉 **Acesse o sistema online**: [Link será gerado após deploy no Vercel]

📖 **Quer colocar no ar?** Leia o guia: **`DEPLOY.md`**

## 🚀 Como Usar Localmente

### Pré-requisitos

1. Node.js instalado
2. Conta no [Supabase](https://supabase.com) (gratuita)

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar Supabase
# Siga as instruções em SUPABASE_CONFIG.md para:
# - Criar projeto no Supabase
# - Executar o SQL em supabase-setup.sql
# - Configurar o arquivo .env

# 3. Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### ⚠️ Configuração Obrigatória

Antes de usar o sistema, siga estes passos:

1. **Configure o Supabase**: Execute o SQL do arquivo `supabase-setup.sql`
2. **Configure o arquivo `.env`**: Adicione URL, API Key e senha
3. **Reinicie o servidor**: `npm run dev`

📖 **Guia Completo**: Leia o arquivo **`COMO_USAR.md`** para instruções passo a passo!

### Primeiro Uso

1. Faça login com a senha (padrão: **cscallstar2025**)
2. Clique em "Adicionar Jogador" para cadastrar os participantes do racha
3. Preencha nome e apelido (opcional) de cada jogador
4. Após os jogos, clique em "Ver Estatísticas Completas" no card do jogador
5. Atualize as estatísticas usando os botões + e - ou digitando diretamente
6. Clique em "Salvar Estatísticas" para registrar os dados

## 🛠️ Tecnologias

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **Lucide React** - Ícones modernos
- **Supabase** - Backend e banco de dados PostgreSQL
- **Row Level Security** - Segurança de dados

## 📱 Interface

- **Dashboard**: Visão geral com total de jogadores, jogos e pontos
- **Cards de Jogadores**: Resumo rápido das principais estatísticas
- **Modal de Estatísticas**: Interface completa para atualização de dados
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 💡 Dicas

- Os dados são salvos automaticamente no Supabase em nuvem
- Cada jogador tem `created_at` e `updated_at` registrados automaticamente
- Use o campo "Jogos" para registrar quando um jogador participa de uma partida
- Os percentuais são calculados automaticamente conforme você atualiza os arremessos
- Você pode editar o nome/apelido dos jogadores a qualquer momento
- Acesse o painel do Supabase para visualizar relatórios e executar queries SQL personalizadas

## 📁 Arquivos Importantes

- **`DEPLOY.md`** - 🚀 Como colocar o sistema no ar (Vercel)
- **`COMO_USAR.md`** - ⭐ Guia rápido para começar
- **`SETUP_BANCO.md`** - Guia detalhado para configurar o banco de dados
- **`SUPABASE_CONFIG.md`** - Guia completo de configuração do Supabase
- **`CONTRIBUINDO.md`** - Guia para contribuidores
- **`supabase-setup.sql`** - SQL para criar a tabela no Supabase
- **`.env.example`** - Exemplo de arquivo de variáveis de ambiente
- **`src/lib/supabase.ts`** - Configuração do cliente Supabase
- **`src/lib/auth.ts`** - Sistema de autenticação

## 📄 Licença

Projeto de código aberto para uso livre.
