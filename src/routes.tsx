import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import ResultList from './pages/ResultList';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{headerShown: false}}>
    <App.Screen name="ResultList" component={ResultList} />
  </App.Navigator>
);

export default AppRoutes;
