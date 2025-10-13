# ⚡ Deploy Rápido - 5 Minutos

## 🎯 Objetivo
Colocar o sistema CSC All Star no ar, acessível por qualquer um através de uma URL.

## 🚀 Passos Rápidos

### 1️⃣ Acessar Vercel (1 min)
1. Abra: **https://vercel.com**
2. Clique: **"Sign Up"**
3. Escolha: **"Continue with GitHub"**
4. Autorize o acesso

### 2️⃣ Importar Projeto (1 min)
1. Clique: **"Add New..."** → **"Project"**
2. Encontre: **"cscallstar"**
3. Clique: **"Import"**

### 3️⃣ Configurar Variáveis (2 min)
Na tela de configuração, clique em **"Environment Variables"**

Adicione estas 3 variáveis (copie e cole exatamente):

**Nome**: `VITE_SUPABASE_URL`  
**Valor**: `https://jzslzbhqwgrazvufklhl.supabase.co`

**Nome**: `VITE_SUPABASE_ANON_KEY`  
**Valor**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6c2x6Ymhxd2dyYXp2dWZrbGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjExMjYsImV4cCI6MjA3MDIzNzEyNn0.WFjpsJXA1zhy3HCU8aCfn_irh7ReTZqqpQ-1EmLhvTY`

**Nome**: `VITE_APP_PASSWORD`  
**Valor**: `cscallstar2025`

### 4️⃣ Deploy (1 min)
1. Clique: **"Deploy"**
2. Aguarde 2-3 minutos
3. 🎉 Pronto!

### 5️⃣ Acessar
Você receberá uma URL tipo:
```
https://cscallstar.vercel.app
```

✅ **Copie e compartilhe com o grupo!**

## 📱 Testar

1. Abra a URL no navegador
2. Faça login: `cscallstar2025`
3. Adicione um jogador de teste
4. Verifique se salvou

## 🔄 Atualizações Automáticas

Toda vez que você fizer push no GitHub, o site atualiza automaticamente!

```bash
git add .
git commit -m "alteração"
git push
# Site atualiza sozinho em 2-3 minutos!
```

## ❓ Problemas?

**Build Failed?**
- Verifique se adicionou as 3 variáveis de ambiente
- Veja os logs no Vercel

**Login não funciona?**
- Confirme que `VITE_APP_PASSWORD` foi adicionada
- Faça redeploy

**Dados não aparecem?**
- Verifique se criou a tabela no Supabase (veja `SETUP_BANCO.md`)

## 📖 Guia Completo

Para mais detalhes, leia: **`DEPLOY.md`**

---

✅ **Sistema no ar em 5 minutos!** 🏀
