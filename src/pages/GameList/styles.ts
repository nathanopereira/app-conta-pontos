import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import Button from '../../components/Button';

interface TitleProps {
  isBig?: boolean;
}

export const TextInterRegular = styled.Text`
  font-family: 'Inter-Regular';
`

export const TextInterBold = styled.Text`
  font-family: 'Inter-Bold';
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px 15px 20px;
`;

export const Title = styled(TextInterBold)<TitleProps>`
  color: #000;

  letter-spacing: -2px;
  font-size: 40px;
  line-height: 40px;

  ${({isBig}) => isBig && css`
    letter-spacing: -3px;
    font-size: 90px;
    line-height: 88px;
    text-align: center;
  `}
`
export const Author = styled(TextInterRegular)<TitleProps>`
  ${({isBig}) => isBig && css`
    margin-bottom: 20px;
    text-align: center;
  `}
`
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
`

export const ButtonCreateGame = styled(Button)`
  border-radius: 50px;
  padding: 5px;
  width: 50px;
  height: 50px;
  margin: 0;
`
export const GameCard = styled(RectButton)`
  background-color: #ebebeb;
  margin-bottom: 10px;
  border-radius: 4px;
  align-items: flex-start;
  padding: 10px;
`

export const GameTitle = styled(TextInterBold)`
  font-weight: bold;
  font-size: 18px;
`
export const GamePlayers = styled(TextInterRegular)`
  font-size: 12px;
`


