import React from 'react';
import { PressableProps } from 'react-native';

import { Container, ButtonText } from './styles';

interface ButtoProps extends PressableProps {
  children: string | Element;
  fontSize?: number;
  textColor?: string;
}

const Button: React.FC<ButtoProps> = ({ children, fontSize, textColor, ...rest }) => {

  const styles = {}

  if (fontSize) Object.assign(styles, { fontSize })

  if (textColor) Object.assign(styles, { color: textColor })

  return (
    <Container {...rest}>
      <ButtonText style={styles}>{children}</ButtonText>
    </Container>
  );
};

export default Button;
