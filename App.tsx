import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { MenuProvider } from './src//context/MenuContext';

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;