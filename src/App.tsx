import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';


declare const global: {HermesInternal: null | {}};

const App: React.FC = () => (
  <NavigationContainer>
      <Routes />
  </NavigationContainer>
);

export default App;
