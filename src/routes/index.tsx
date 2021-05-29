import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import CreateGame from '../pages/CreateGame';
import Gameplay from '../pages/Gameplay';
import GameList from '../pages/GameList';

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
      initialRouteName="Home"
    >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="CreateGame" component={CreateGame} />
      <App.Screen name="Gameplay" component={Gameplay} />
      <App.Screen name="GameList" component={GameList} />
    </App.Navigator>
  );
};

export default Routes;
