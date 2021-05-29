import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

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
      initialRouteName="GameList"
    >
      <App.Screen name="Gameplay" component={Gameplay} />
      <App.Screen name="GameList" component={GameList} />
    </App.Navigator>
  );
};

export default Routes;
