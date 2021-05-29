import styled, { css } from 'styled-components/native';
import Button from '../../components/Button';

interface TitleProps {
  isBig?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 15px 20px;
`;

export const Title = styled.Text<TitleProps>`
  font-family: 'Inter-Bold';
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
export const Author = styled.Text<TitleProps>`
  margin-bottom: 20px;
  font-family: 'Inter-Regular';

  ${({isBig}) => isBig && css`
    text-align: center;
  `}
`
export const Header = styled.View`
  flex-direction: row;
`

export const ButtonCreateGame = styled(Button)`

`
