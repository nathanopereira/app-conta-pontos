import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { string } from 'yup';

export const Container = styled.View`
  flex: 1;
`;

export const ScoreGrid = styled.View`
  flex: 1;
`

interface ScoreItemProps {
  color: string;
}

export const ScoreItem = styled(RectButton) <ScoreItemProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ color }) => color || '#ccc'};
`
export const Score = styled.Text`
  text-align: center;
  color: #fff;
  font-family: 'Inter-Bold';
  font-size: 150px;
  line-height: 148px;
`
export const Player = styled.Text`
  color: #fff;
  text-align: center;
  font-family: 'Inter-Regular';
  font-size: 18px;
  line-height: 18px;
`
