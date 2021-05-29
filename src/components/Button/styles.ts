import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #8338ec;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const ButtonText = styled.Text`
  font-family: 'Inter-Bold';
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
`;
