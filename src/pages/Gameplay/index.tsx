import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { Container, ScoreGrid, ScoreItem, Score, Player } from './styles';

interface IPlayer {
  name?: string;
  color: string;
  score: number;
  id: string;
}

interface IEvent {
  type: string;
  player: string;
  old_score: number;
  score: number;
  created_at: any;
}

interface IGame {
  id: string;
  title: string;
  players: IPlayer[];
  events: IEvent[];
}


const Gameplay: React.FC = ({ route }) => {

  const [game, setGame] = useState({} as IGame)

  const fetchGame = useCallback(async () => {
    const storage = await AsyncStorage.getItem('@contapontos')

    if (!storage) {
      throw new Error('Storage not found')
    }

    const parsedStorage: IGame[] = JSON.parse(storage)
    const search = parsedStorage.find(game => game.id === route.params.id)

    if (!search) {
      throw new Error('Game id not found')
    }

    setGame(search)
  }, [route])

  const incrementScore = useCallback(
    async (playerId: string) => {
      const player = game.players.find(player => player.id === playerId)
      console.log(player)
      if (player) {
        const oldScore = player.score
        const event = { type: 'increment-score', player: playerId, old_score: oldScore, score: player.score, created_at: new Date() };
        const players = game.players.map(player => {
          if (player.id === playerId) {
            return {
              ...player,
              score: player.score + 1,
            }
          }

          return player
        })

        console.log(players)

        setGame(game => ({ ...game, events: game.events ? [...game.events, event] : [event], players }))
      }
    },
    [game],
  )

  const updateStorage = useCallback(
    async () => {
      const storage = await AsyncStorage.getItem('@contapontos')
      if (storage) {
        const parsedStorage: IGame[] = JSON.parse(storage)
        const newStorage = parsedStorage.map(g => {
          if (g.id === game.id) {
            return {
              ...g,
              ...game
            }
          }

          return g
        })

        await AsyncStorage.setItem('@contapontos', JSON.stringify(newStorage))
      }
    },
    [game],
  )

  useEffect(() => {
    if (game.id) updateStorage()
  }, [game])

  useEffect(() => {
    fetchGame()
  }, [])

  if (!game.id) {
    return (
      <View><Text>Jogo não encontrado</Text></View>
    )
  }

  return (
    <Container>
      <ScoreGrid>
        {game.players.map(player => (
          <ScoreItem key={player.id} color={player.color} onPress={() => incrementScore(player.id)}>
            <Score>{player.score}</Score>
            <Player>{player.name}</Player>
          </ScoreItem>
        ))}
      </ScoreGrid>
    </Container>
  );
}

export default Gameplay;