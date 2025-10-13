# 🚀 Deploy - Colocar o Sistema no Ar

## ✨ Opção Recomendada: Vercel (GRATUITO)

O Vercel é perfeito para este projeto e faz deploy automático sempre que você fizer push no GitHub!

### 📋 Passo a Passo

#### 1️⃣ Criar Conta no Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Faça login com sua conta do GitHub
5. Autorize o Vercel a acessar seus repositórios

#### 2️⃣ Importar o Projeto

1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Você verá seus repositórios do GitHub
3. Encontre **"cscallstar"** e clique em **"Import"**

#### 3️⃣ Configurar o Projeto

Na página de configuração:

**Framework Preset**: Vite (deve detectar automaticamente)

**Build Settings** (já configuradas):
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables** (IMPORTANTE!):
Clique em **"Environment Variables"** e adicione:

```
VITE_SUPABASE_URL = https://jzslzbhqwgrazvufklhl.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6c2x6Ymhxd2dyYXp2dWZrbGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjExMjYsImV4cCI6MjA3MDIzNzEyNn0.WFjpsJXA1zhy3HCU8aCfn_irh7ReTZqqpQ-1EmLhvTY
VITE_APP_PASSWORD = cscallstar2025
```

⚠️ **IMPORTANTE**: Copie as variáveis EXATAMENTE como estão acima!

#### 4️⃣ Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos enquanto o Vercel faz o build
3. ✅ Pronto! Seu site está no ar!

#### 5️⃣ Acessar o Site

Após o deploy, você receberá uma URL tipo:
```
https://cscallstar.vercel.app
```

ou

```
https://cscallstar-xxx.vercel.app
```

🎉 **Copie essa URL e compartilhe com o grupo!**

## 🔄 Deploy Automático

**A mágica**: Agora, sempre que você fizer push no GitHub, o Vercel faz deploy automático!

```bash
# Fazer alteração no código
# ...

# Commit e push
git add .
git commit -m "feat: nova funcionalidade"
git push

# O Vercel vai detectar automaticamente e fazer novo deploy!
```

## 📱 Configurar Domínio Personalizado (Opcional)

Se você tiver um domínio próprio:

1. No dashboard do Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `cscallstar.com.br`)
3. Configure os DNS conforme instruções do Vercel
4. Aguarde propagação (até 48h)

## 🔧 Variáveis de Ambiente

### Ver/Editar Variáveis

1. No Vercel, vá em **Settings** → **Environment Variables**
2. Você pode editar ou adicionar novas
3. Após editar, clique em **"Redeploy"** para aplicar

### Mudar a Senha do Sistema

1. Vá em **Environment Variables**
2. Edite `VITE_APP_PASSWORD`
3. Coloque a nova senha
4. Clique em **"Save"**
5. Faça **"Redeploy"**

## 📊 Monitoramento

No dashboard do Vercel você pode ver:
- ✅ Status dos deploys
- 📈 Quantidade de acessos
- 🐛 Logs de erro
- ⚡ Performance do site

## 🔒 Segurança

### Domínio Privado

Se quiser que apenas quem tem o link acesse:
1. Não compartilhe a URL publicamente
2. Use apenas no grupo do WhatsApp
3. Mude a senha regularmente

### Proteção Adicional

Para produção, considere:
- Adicionar autenticação do Supabase
- Configurar Row Level Security mais restritivo
- Usar domínio personalizado com HTTPS

## 🆘 Problemas Comuns

### "Build Failed"
- Verifique se todas as variáveis de ambiente foram adicionadas
- Veja os logs do build no Vercel
- Certifique-se que o projeto roda localmente (`npm run build`)

### "Site carrega mas dá erro"
- Verifique as variáveis de ambiente no Vercel
- Confirme se a API Key do Supabase está correta
- Veja o console do navegador (F12)

### "Não consegue fazer login"
- Verifique se `VITE_APP_PASSWORD` foi configurada
- Tente fazer redeploy

### "Dados não aparecem"
- Confirme que a tabela `players` foi criada no Supabase
- Verifique se a URL do Supabase está correta
- Teste se consegue adicionar jogador

## 🎯 Alternativas ao Vercel

### Netlify (também gratuito)

1. Acesse: https://netlify.com
2. Conecte com GitHub
3. Importe o repositório
4. Configure as mesmas variáveis de ambiente
5. Deploy!

### Cloudflare Pages (também gratuito)

1. Acesse: https://pages.cloudflare.com
2. Conecte com GitHub
3. Importe o repositório
4. Configure variáveis
5. Deploy!

## 📝 Checklist de Deploy

- [ ] Conta criada no Vercel
- [ ] Projeto importado do GitHub
- [ ] 3 variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Site acessível pela URL
- [ ] Consegue fazer login
- [ ] Consegue adicionar jogador
- [ ] Dados salvam no Supabase
- [ ] URL compartilhada com o grupo

## 🌐 Acesso pelo Celular

Depois do deploy, qualquer um pode acessar pelo celular:
1. Abra o navegador do celular
2. Digite a URL do Vercel
3. Faça login
4. Use normalmente!

**Dica**: Adicione o site à tela inicial do celular para acesso rápido:
- **iPhone**: Safari → Compartilhar → Adicionar à Tela Inicial
- **Android**: Chrome → Menu → Adicionar à tela inicial

---

✅ **Sistema no ar e pronto para usar!** 🏀

**URL do Deploy**: Você receberá após configurar o Vercel
