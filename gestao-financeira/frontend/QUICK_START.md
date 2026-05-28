# Quick Start - Gestão Financeira App

## 🚀 Início Rápido (5 minutos)

### 1️⃣ Backend
```bash
cd praticas/gestao-financeira-api
npm install
npm run prisma:migrate  # Se for primeira vez
npm run prisma:seed     # Se quiser dados de exemplo
npm run dev
```
Servidor rodará em: `http://localhost:3000`

### 2️⃣ Frontend
```bash
cd praticas/gestao-financeira
npm install
npm start
```

Escolha:
- `a` → Android Emulator
- `i` → iOS Simulator  
- `w` → Web

### 3️⃣ Login
- **Nome**: Qualquer nome (ex: "João Silva")
- **Email**: Qualquer email válido (ex: "joao@example.com")
- **Clique**: "Entrar"

## 🎯 Principais Funcionalidades

| Funcionalidade | Onde Usar | Como Usar |
|---|---|---|
| **Filtro Mês/Ano** | Transações, Resumo | Clique no botão de calendário |
| **Gráfico Pizza** | Resumo | Veja as despesas por categoria |
| **Editar Transação** | Transações | Toque longo → Editar |
| **Nova Categoria** | Categorias | Preencha o formulário → Adicionar |
| **Logout** | Header | Clique no ícone de logout |

## 📱 Navegação

```
┌─────────────────────────────────┐
│  Header: Gestão Financeira [⬅] │
├─────────────────────────────────┤
│  [💰] [📂] [➕] [📊]            │
│   Trans  Cat  Add   Sum         │
└─────────────────────────────────┘

Abas:
1. 💰 Transações - Lista de movimentações
2. 📂 Categorias - Gerenciar categorias
3. ➕ Adicionar - Criar nova transação
4. 📊 Resumo - Análise com gráficos
```

## ✨ Destaques

✅ **Login Persistente** - Dados salvos localmente  
✅ **Boas-vindas Personalizada** - Com seu nome  
✅ **Filtros Inteligentes** - Por mês e ano  
✅ **Gráficos Visuais** - Pizza chart  
✅ **Edição Completa** - Modificar qualquer transação  
✅ **Categorias Customizadas** - Crie as suas próprias  

## 🔧 Troubleshooting Rápido

| Problema | Solução |
|---|---|
| API não conecta | Verifique se backend está em `npm run dev` |
| AsyncStorage erro | Reinstale: `npm install` |
| Gráfico não aparece | Certifique-se de ter transações com despesas |
| Ícones não mostram | Use nomes válidos (ex: "heart", "star", "check") |

## 📚 Documentação Completa

- [`FUNCIONALIDADES_IMPLEMENTADAS.md`](./FUNCIONALIDADES_IMPLEMENTADAS.md) - Todas as features
- [`GUIA_DE_TESTES.md`](./GUIA_DE_TESTES.md) - Testes detalhados
- [`RESUMO_IMPLEMENTACAO.md`](./RESUMO_IMPLEMENTACAO.md) - Detalhes técnicos

## 💡 Dicas

🔹 **Adicionar Transação**: Use o botão roxo no meio das abas  
🔹 **Editar**: Toque longo em qualquer transação  
🔹 **Filtrar**: Clique no calendário para mudar mês  
🔹 **Sair**: Clique no ícone de logout no topo direito  

## 🎓 Próximos Passos

1. Explore cada tela
2. Crie algumas transações
3. Teste os filtros
4. Adicione uma categoria customizada
5. Edite e delete transações
6. Veja o gráfico de pizza

---

**Tudo pronto para usar! 🎉**
