import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../../components/Button';

import {
  Author,
  Container,
  Title,
  Header,
  ButtonCreateGame,
  ButtonRemoveGame,
  GameCard,
  GameCardContainer,
  GameTitle,
  GamePlayers,
} from './styles'

interface IPlayer {
  name?: string;
  color: string;
  score: number;
}

interface IGame {
  id: string;
  title: string;
  players: IPlayer[];
}

const GameList: React.FC = () => {

  const [games, setGames] = useState([] as IGame[])

  const navigation = useNavigation()

  const loadGames = useCallback(
    async () => {
      const storage = await AsyncStorage.getItem('@contapontos')
      const parsedStorage = storage ? JSON.parse(storage) : [];
      setGames(parsedStorage)
    },
    [],
  )

  const handleRemoveGame = useCallback(
    async (id: string) => {
      setGames(prevState => prevState.filter(game => game.id !== id))

      ToastAndroid.show("Jogo removido com sucesso", ToastAndroid.SHORT);
    },
    [games],
  )

  const handleConfirmRemove = useCallback(
    (game: IGame) => {
      Alert.alert(
        `Removendo jogo ${game.title}`,
        `Tem certeza que deseja remover o jogo? ${game.players.map((player, index) => {
          return index === 0 ? `${player.name} (${player.score})` : `${player.name} (${player.score})`
        })}`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => handleRemoveGame(game.id) }
        ]
      );
    },
    [],
  )

  useEffect(() => {
    loadGames()
  }, [])

  useEffect(() => {
    async function updateStorage(gamesToStorage: IGame[]){
      await AsyncStorage.setItem('@contapontos', JSON.stringify(gamesToStorage))
    }

    updateStorage(games)
  },[games])

  return (
    <ScrollView>
      <Container>
        {games.length > 0 && (
          <Header>
            <View style={{ justifyContent: 'center' }}>
              <Title>Conta Pontos</Title>
              <Author>por @nathanopereira</Author>
            </View>
            <View>
              <ButtonCreateGame onPress={() => navigation.navigate('CreateGame')} >
                <Icon name="plus" color="#fff" size={15} />
              </ButtonCreateGame>
            </View>
          </Header>
        )}

        {games.map(game => (
          <GameCard onPress={() => navigation.navigate('Gameplay', { id: game.id })} key={game.id}>
            <GameCardContainer>
              <GameTitle>{game.title}</GameTitle>
              <GamePlayers>{game.players.map((player, index) => {
                return index === 0 ? `${player.name} (${player.score})` : ` • ${player.name} (${player.score})`
              })}
              </GamePlayers>
            </GameCardContainer>
            <ButtonRemoveGame onPress={() => handleConfirmRemove(game)}>
              <Icon name="trash" color="#aaa" size={20} />
            </ButtonRemoveGame>
          </GameCard>
        ))}

        {games.length === 0 && (
          <View>
            <Title isBig>Conta Pontos</Title>
            <Author isBig>por @nathanopereira</Author>
            <Button onPress={() => navigation.navigate('CreateGame')} style={{ backgroundColor: '#06f' }}>Criar Jogo</Button>
          </View>
        )}
      </Container>
    </ScrollView>
  );
}

export default GameList;
