# 🤝 Contribuindo para o CSC All Star

## 📋 Antes de Começar

Este é um projeto privado para o grupo CSC All Star. Se você faz parte do grupo, siga estas instruções.

## 🔧 Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/caiofvc/cscallstar.git
cd cscallstar
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env`:
```env
VITE_SUPABASE_URL=https://jzslzbhqwgrazvufklhl.supabase.co
VITE_SUPABASE_ANON_KEY=[pegar com o admin]
VITE_APP_PASSWORD=cscallstar2025
```

4. Execute o projeto:
```bash
npm run dev
```

## 📝 Como Contribuir

### 1. Criar uma Nova Feature

```bash
# Criar branch
git checkout -b feature/nome-da-feature

# Fazer alterações
# ...

# Commit
git add .
git commit -m "feat: descrição da feature"

# Push
git push origin feature/nome-da-feature
```

### 2. Corrigir um Bug

```bash
# Criar branch
git checkout -b fix/nome-do-bug

# Fazer correções
# ...

# Commit
git add .
git commit -m "fix: descrição do bug corrigido"

# Push
git push origin fix/nome-do-bug
```

### 3. Padrão de Commits

Use o padrão Conventional Commits:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alteração em documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração de código
- `test:` - Adicionar testes
- `chore:` - Tarefas gerais

**Exemplos:**
```bash
git commit -m "feat: adicionar filtro por data no dashboard"
git commit -m "fix: corrigir cálculo de percentual de arremessos"
git commit -m "docs: atualizar README com novas instruções"
```

## 🔒 Segurança

**NUNCA** commite:
- Arquivo `.env` (já está no .gitignore)
- Senhas ou tokens
- Dados sensíveis dos jogadores

## 📂 Estrutura de Pastas

```
sistema/
├── src/
│   ├── components/     # Componentes React
│   ├── lib/           # Bibliotecas e configurações
│   └── types.ts       # Tipos TypeScript
├── public/            # Arquivos públicos
├── supabase-setup.sql # SQL do banco
└── *.md              # Documentação
```

## 🐛 Reportar Problemas

Encontrou um bug? Abra uma issue no GitHub com:
- Descrição do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Ambiente (navegador, OS)

## 💡 Sugestões

Tem uma ideia? Abra uma issue com:
- Título claro
- Descrição detalhada
- Benefícios esperados

## 📱 Contato

Dúvidas sobre o projeto? Fale com o grupo no grupo do WhatsApp.

---

Obrigado por contribuir! 🏀
