# 📝 Comandos Git - Deploy no GitHub

Siga estes comandos na ordem para fazer push no GitHub.

---

## 1️⃣ Fazer Commit Inicial

```powershell
git commit -m "Initial commit: Youtuber app - automação de upload para YouTube"
```

---

## 2️⃣ Renomear Branch para Main (se necessário)

```powershell
git branch -M main
```

---

## 3️⃣ Adicionar Remote do GitHub

**Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub:**

```powershell
git remote add origin https://github.com/SEU-USUARIO/youtuber.git
```

**Exemplo:**
```powershell
git remote add origin https://github.com/joaosilva/youtuber.git
```

---

## 4️⃣ Fazer Push

```powershell
git push -u origin main
```

---

## ⚠️ Se pedir autenticação:

### Usar Personal Access Token:

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Dê um nome: `youtuber-deploy`
4. Marque o escopo: **`repo`** (todas as permissões de repositório)
5. Clique em **"Generate token"**
6. **COPIE o token** (ele só aparece uma vez!)
7. Quando o Git pedir senha:
   - **Username:** seu usuário do GitHub
   - **Password:** cole o token (NÃO sua senha normal)

---

## ✅ Verificar se funcionou

```powershell
git remote -v
```

Deve mostrar:
```
origin  https://github.com/SEU-USUARIO/youtuber.git (fetch)
origin  https://github.com/SEU-USUARIO/youtuber.git (push)
```

---

## 🔄 Próximos commits (depois do primeiro)

Quando fizer mudanças no futuro:

```powershell
git add .
git commit -m "Descrição das mudanças"
git push
```

---

**Agora você pode seguir para o próximo passo: Configurar Vercel!**

