# Contador de pontos

# Requisitos funcionais
- [x]  Permitir criar partidas com um ou mais jogadores
- [x]  Permitir adicionar nome a partida
- [x]  Permitir criar jogador, com nome e cor
- [x]  Permitir adicionar pontos para cada jogador assim que clicar
- [ ]  Exibir histórico em forma de grid ou gráfico
- [x]  Exibir menu para voltar a tela principal e permitir criar outro jogo
- [x]  Permitir remover pontos dos jogadores

# Requisitos não funcionais
- [x] Salvar todo histórico a cada ação
- [x] Armazenar os dados no AsyncStorage
- [x] Dividir a tela do celular de acordo com a quantidade jogadores da partida
- [x] Números grandes, nomes peguenos, cores no fundo

# Regras de negócio

storage = @contapontos = [game1, game2]

# Evoluções
- [ ] Utilizar a mesma cor para todos jogadores, conforme jogador faz mais pontos
"aumenta" a cor. Exemplo: todos começam com pontos pretos e fundo branco, assim que um
jogador pontuar, seus pontos recebe uma cor com fundo bem "forte"
