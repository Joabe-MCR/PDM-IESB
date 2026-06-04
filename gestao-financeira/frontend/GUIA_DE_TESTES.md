# Guia de Testes - Gestão Financeira App

## Pré-requisitos

1. **Node.js** instalado (v18+)
2. **Expo CLI** instalado globalmente: `npm install -g expo-cli`
3. **Backend rodando**: `cd gestao-financeira-api && npm run dev`
4. **Emulador Android** ou **iOS Simulator** rodando
5. **Expo Go** instalado no celular (para testar em device físico)

## Passos para Testar

### 1. Instalar Dependências

```bash
cd praticas/gestao-financeira
npm install
```

### 2. Iniciar a Aplicação

```bash
npm start
```

Escolha a plataforma:
- Pressione `a` para Android
- Pressione `i` para iOS
- Pressione `w` para Web

### 3. Testes Funcionais

#### **Teste 1: Login**
- [ ] Abra o app
- [ ] Você deve ver a tela de login
- [ ] Tente clicar em "Entrar" sem preencher - deve mostrar erro
- [ ] Preencha nome com menos de 2 letras - deve mostrar erro
- [ ] Preencha email inválido (sem @) - deve mostrar erro
- [ ] Preencha com dados válidos:
  - Nome: "João Silva"
  - Email: "joao@example.com"
- [ ] Clique em "Entrar"
- [ ] Você deve ser redirecionado para a tela de transações
- [ ] Feche e reabra o app - você deve estar logado (sessão persistida)

#### **Teste 2: Mensagem de Boas-vindas**
- [ ] Na tela de transações, observe o card no topo
- [ ] Deve exibir: "👋 Bem-vindo, João Silva!"
- [ ] O nome deve ser o que você inseriu no login

#### **Teste 3: Botão de Logout**
- [ ] Observe o ícone de logout no header (canto superior direito)
- [ ] Clique nele
- [ ] Deve aparecer um alerta: "Logout - Deseja sair, João Silva?"
- [ ] Clique em "Sair"
- [ ] Você deve ser redirecionado para a tela de login
- [ ] A sessão deve ser apagada de AsyncStorage

#### **Teste 4: Filtro de Mês/Ano (Transações)**
- [ ] Vá para a aba "Transações"
- [ ] Observe o botão de filtro com data atual (ex: "janeiro de 2025")
- [ ] Clique no botão
- [ ] Um picker de data deve aparecer
- [ ] Selecione um mês/ano diferente
- [ ] A lista de transações deve ser filtrada
- [ ] Apenas transações do mês/ano selecionado devem aparecer

#### **Teste 5: Adicionar Transação**
- [ ] Vá para a aba "Adicionar Transação" (botão do meio com +)
- [ ] Preencha:
  - Descrição: "Compra no mercado"
  - Valor: 150.50
  - Data: hoje
  - Categoria: escolha uma
- [ ] Clique em "Adicionar"
- [ ] Você deve ver uma confirmação
- [ ] Volte para a aba de transações
- [ ] A transação nova deve aparecer no topo da lista

#### **Teste 6: Editar Transação**
- [ ] Na tela de transações, faça um toque longo em uma transação
- [ ] Um menu deve aparecer: "Editar", "Excluir", "Cancelar"
- [ ] Clique em "Editar"
- [ ] Um modal deve abrir com os campos preenchidos
- [ ] Altere alguns dados (descrição, valor, etc)
- [ ] Clique em "Salvar"
- [ ] A transação deve ser atualizada na lista

#### **Teste 7: Excluir Transação**
- [ ] Na tela de transações, faça um toque longo em uma transação
- [ ] Clique em "Excluir"
- [ ] Um alerta deve pedir confirmação
- [ ] Clique em "Excluir" no alerta
- [ ] A transação deve desaparecer da lista
- [ ] Você deve ver "Sucesso - Transação excluída com sucesso!"

#### **Teste 8: Filtro de Mês/Ano (Resumo)**
- [ ] Vá para a aba "Resumo"
- [ ] Observe o card de saldo do período
- [ ] Observe o gráfico de pizza (se houver despesas)
- [ ] Clique no botão de filtro de data
- [ ] Selecione um mês/ano diferente
- [ ] O saldo e o gráfico devem ser atualizados

#### **Teste 9: Gráfico de Pizza**
- [ ] Vá para a aba "Resumo"
- [ ] Se houver despesas, um gráfico de pizza deve aparecer
- [ ] O gráfico deve ter cores diferentes por categoria
- [ ] Abaixo do gráfico deve haver uma legenda com nomes das categorias
- [ ] Mude o filtro de mês - o gráfico deve atualizar
- [ ] Se não houver despesas no mês, o gráfico não deve aparecer

#### **Teste 10: Categorias Customizadas**
- [ ] Vá para a aba "Categorias"
- [ ] Você verá um formulário no topo: "Nova categoria"
- [ ] Preencha:
  - Identificador: "gym"
  - Nome de exibição: "Academia"
  - Ícone: "fitness-center"
  - Cor: escolha uma cor (clique no ponto)
- [ ] Clique em "Adicionar categoria"
- [ ] Você deve ver "Categoria criada!"
- [ ] A nova categoria deve aparecer na lista abaixo, marcada como "personalizada"
- [ ] Adicione uma transação com essa nova categoria
- [ ] A categoria deve aparecer na tela de transações e resumo

#### **Teste 11: Excluir Categoria Customizada**
- [ ] Na tela de categorias, procure por uma categoria customizada
- [ ] Você deve ver um ícone de lixeira ao lado
- [ ] Clique nele
- [ ] Um alerta deve pedir confirmação
- [ ] Clique em "Excluir"
- [ ] A categoria deve desaparecer
- [ ] Categorias padrão (marcadas como "padrão") não devem ter ícone de lixeira

#### **Teste 12: Pull-to-Refresh**
- [ ] Em qualquer tela com lista (transações, categorias)
- [ ] Faça um gesto de puxar para baixo
- [ ] Um indicador de carregamento deve aparecer
- [ ] Os dados devem ser recarregados da API
- [ ] O indicador deve desaparecer

#### **Teste 13: Mensagens de Erro**
- [ ] Desconecte o backend ou simule um erro de rede
- [ ] Abra o app
- [ ] Você deve ver uma mensagem de erro
- [ ] Deve haver um botão "Tentar novamente"
- [ ] Reconecte o backend
- [ ] Clique em "Tentar novamente"
- [ ] Os dados devem carregar normalmente

#### **Teste 14: Navegação Entre Abas**
- [ ] Clique em cada aba para garantir que todas funcionam:
  - [ ] Transações
  - [ ] Categorias
  - [ ] Adicionar Transação (botão do meio)
  - [ ] Resumo
- [ ] Navegação deve ser suave sem travamentos

#### **Teste 15: Comportamento de Teclado**
- [ ] Abra o formulário de edição de transação
- [ ] Digite em campos de texto
- [ ] O teclado deve aparecer e desaparecer corretamente
- [ ] O modal não deve sumir quando o teclado aparecer

## Checklist Final

- [ ] Login funciona com persistência
- [ ] Logout funciona e limpa sessão
- [ ] Mensagem de boas-vindas exibe nome correto
- [ ] Filtro de mês/ano funciona em ambas as telas
- [ ] Gráfico de pizza renderiza corretamente
- [ ] Edição de transações funciona
- [ ] Exclusão de transações funciona com confirmação
- [ ] Categorias customizadas podem ser criadas
- [ ] Categorias customizadas podem ser excluídas
- [ ] Botão de logout existe e funciona
- [ ] Não há erros de console
- [ ] Interface está responsiva
- [ ] Todas as cores estão corretas

## Troubleshooting

### Problema: "Não consegue conectar à API"
**Solução**: 
- Verifique se o backend está rodando: `cd gestao-financeira-api && npm run dev`
- Verifique a URL da API em `services/api.js`
- Para Android: use `10.0.2.2:3000`
- Para iOS: use `localhost:3000`
- Para device físico: use o IP da máquina na rede local

### Problema: "AsyncStorage não encontrado"
**Solução**:
- Verifique se `@react-native-async-storage/async-storage` está instalado
- Execute `npm install` novamente

### Problema: "Gráfico não aparece"
**Solução**:
- Verifique se `react-native-chart-kit` está instalado
- Certifique-se de que há transações com despesas no período

### Problema: "Modal não abre"
**Solução**:
- Verifique se o toque longo está sendo reconhecido (Android/iOS diferem)
- Tente tocar e segurar por mais de 1 segundo

### Problema: "Ícones de categoria não aparecem"
**Solução**:
- Verifique se o nome do ícone é válido (Material Icons)
- Use a documentação: https://fonts.google.com/icons

## Dicas

1. **Simular Pull-to-Refresh**: Em alguns emuladores, você pode precisar arrastar mais de uma vez
2. **Testar em Device Físico**: Use `npx expo start` e escaneie o QR code com Expo Go
3. **Debug**: Use `console.log()` para debug ou React Native Debugger
4. **Limpar Cache**: Se tiver problemas, execute `npm start -- --clear`

---

**Última atualização**: 2025-05
