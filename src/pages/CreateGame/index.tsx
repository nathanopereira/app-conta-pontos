import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
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

interface CreateGameProps {
  visible?: boolean;
  onClose: () => void;
}

const CreateGame: React.FC<CreateGameProps> = ({ visible, onClose }) => {
  const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false)

  const initialGame = { id: uuid(), players: [] as IPlayer[] } as IGame
  const intialPlayer = { score: 0, id: uuid() } as IPlayer

  const [game, setGame] = useState<IGame>(initialGame);
  const [newPlayer, setNewPlayer] = useState<IPlayer>(intialPlayer);

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

    onClose()
    navigation.navigate('Gameplay', { id: game.id })
  }, [game])

  const handleCancel = useCallback(
    () => {
      setGame(initialGame)
      setNewPlayer(intialPlayer)
      setIsAddingPlayer(false)
      onClose()
    },
    [],
  )

  useEffect(() => {
    if (!isAddingPlayer)
      setNewPlayer(intialPlayer)
  }, [isAddingPlayer])

  return (
    <Modal
      visible={visible}
      onRequestClose={handleCancel}
      animationType="slide"
    >
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
          <Button style={{ backgroundColor: '#d0d1ff' }} textColor="#000" onPress={handleCancel}>Cancelar</Button>
        </View>
      )}
    </Container>
    </Modal>
  );
}

export default CreateGame;
