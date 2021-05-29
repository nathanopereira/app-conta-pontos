import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 30px;
  margin-bottom: 20px;
`;

export const Subtitle = styled.Text`
  font-family: 'Inter-Regular';
`;

export const Label = styled.Text`
  font-family: 'Inter-Regular';
`;

export const TextInput = styled.TextInput`
  font-family: 'Inter-Regular';
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 2px;
  border-color: #ccc;

  flex-direction: row;
  align-items: center;

  font-size: 16px;
`;

export const ButtonAddPlayer = styled.Pressable`
  width: 100%;
  background: #06f;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const TextButtonAddPlayer = styled.Text`
  font-family: 'Inter-Bold';
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
`;

export const ColorSelector = styled.View`
  flex-direction: row;
  margin-bottom: 18px;
`;

interface ColorItemProps {
  color: string;
  selected?: boolean;
  dirty?: boolean;
}

export const ColorItem = styled(TouchableOpacity)<ColorItemProps>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 5px;
  background: ${({ color }) => color};
  border-width: ${({ selected }) => (selected ? 2 : 8)}px;
  border-color: #000;
`;

export const PlayerList = styled.View``;

export const Player = styled.View``;

export const PlayerName = styled.Text``;

interface PlayerColorProps {
  color: string;
}

export const PlayerColor = styled.View<PlayerColorProps>``;
