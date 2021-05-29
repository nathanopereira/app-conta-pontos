import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { v4 as uuid } from 'uuid';
import Button from '../../components/Button';
import { ButtonAddPlayer, ColorItem, ColorSelector, Container, Label, Player, PlayerColor, PlayerList, PlayerName, TextButtonAddPlayer, TextInput, Title } from './styles';

const colors = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#8338ec', '#4361ee'];

interface IPlayer {
  name?: string;
  color: string;
  score: number;
  id: string;
}

interface IGame {
  id: string;
  title: string;
  players: IPlayer[];
}

const CreateGame: React.FC = () => {
  const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false)

  const [game, setGame] = useState<IGame>({ id: uuid(), players: [] as IPlayer[] } as IGame);
  const [newPlayer, setNewPlayer] = useState<IPlayer>({ score: 0, id: uuid() } as IPlayer);

  const navigation = useNavigation()

  const getNewColor = useCallback(() => {
    const playersColors: string[] = game.players.map(p => p.color)
    const restColors = colors.filter(c => !playersColors.find(playerColor => playerColor === c))

    return restColors[Math.floor(Math.random() * restColors.length)];
  }, [game])

  const addPlayer = useCallback(
    (player) => {
      Object.assign(player, {
        color: getNewColor()
      })
      setGame(game => ({ ...game, players: [...game.players, player] }))
      setIsAddingPlayer(false)
    },
    [],
  )

  const createGame = useCallback(async () => {
    const storage = await AsyncStorage.getItem('@contapontos')
    const parsedStorage = storage ? JSON.parse(storage) : [];

    Object.assign(game, {
      created_at: new Date()
    })

    parsedStorage.push(game)
    await AsyncStorage.setItem('@contapontos', JSON.stringify(parsedStorage))

    navigation.navigate('Gameplay', { id: game.id })
  }, [game])

  useEffect(() => {
    if (!isAddingPlayer)
      setNewPlayer({ score: 0, id: uuid() } as IPlayer)
  }, [isAddingPlayer])

  return (
    <Container>
      <Title>Criando jogo</Title>

      <Label>Nome do jogo</Label>
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#ccc"
        placeholder="Ex.: Truco, Banco Imobiliário..."
        defaultValue={game.title}
        onChangeText={value => {
          setGame({ ...game, title: value })
        }}
      />

      <ButtonAddPlayer onPress={() => setIsAddingPlayer(!isAddingPlayer)}>
        <TextButtonAddPlayer>
          {isAddingPlayer ? 'Cancelar' : 'Adicionar jogadores'}
        </TextButtonAddPlayer>
      </ButtonAddPlayer>

      <PlayerList>
        {game.players.map(player => (
          <Player>
            <PlayerName>{player.name}</PlayerName>
            <PlayerColor color={player.color} />
          </Player>
        ))}
      </PlayerList>

      {isAddingPlayer && (
        <>
          <Label>Nome</Label>
          <TextInput
            keyboardAppearance="dark"
            placeholder="Ex.: Henrique"
            placeholderTextColor="#ccc"
            defaultValue={newPlayer.name}
            onChangeText={value => {
              setNewPlayer({ ...newPlayer, name: value })
            }}
          />

          <Button textColor="#fff" onPress={() => addPlayer(newPlayer)}>Ok</Button>
          {/* <Label>Cor</Label>
          <ColorSelector>
            {colors.map(color => (
              <ColorItem
                dirty={true}
                selected={newPlayer.color === color}
                color={color}
                onPress={() => {
                  setNewPlayer({ ...newPlayer, color })
                  addPlayer()
                }} />
            ))}
          </ColorSelector> */}
        </>
      )}

      {!isAddingPlayer && (
        <View style={{ marginTop: 30 }}>
          <Button textColor="#fff" onPress={() => createGame()}>Criar Jogo</Button>
          <Button style={{ backgroundColor: '#d0d1ff' }} textColor="#000" onPress={() => navigation.navigate('Home')}>Cancelar</Button>
        </View>
      )}
    </Container>
  );
}

export default CreateGame;
