import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';

import { Container, Title, Author } from './styles';

const Home: React.FC = ({ navigation }) => {
  // const clear = useCallback(async () => await AsyncStorage.removeItem('@contapontos'), []); useEffect(() => clear(), [])
  return (
    <Container>
      <Title>Conta Pontos</Title>
      <Author>por <Text style={{ fontWeight: 'bold', color: '#333' }}>@nathanopereira</Text></Author>
      <Button onPress={() => navigation.navigate('CreateGame')} style={{ backgroundColor: '#06f' }}>Criar Jogo</Button>
      <Button onPress={() => navigation.navigate('GameList')}>Ver Jogos</Button>
    </Container>
  );
};

export default Home;
