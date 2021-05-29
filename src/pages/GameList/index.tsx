import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';

// import { Container } from './styles';
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

  useEffect(() => {
    loadGames()
  }, [])

  return (
    <View>
      <Text>{games.length} jogos encontrados</Text>
      {games.map(game => (
        <Button onPress={() => navigation.navigate('Gameplay', { id: game.id })} key={game.id}>{game.title}</Button>
      ))}
    </View>
  );
}

export default GameList;
