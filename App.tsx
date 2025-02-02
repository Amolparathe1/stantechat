import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import StackNavigator from './src/navigation/StackNavigator';
import { createTable } from './src/database/databaseCURD';
import { initDatabase } from './src/database/databaseSync';
import { syncOfflineData } from './src/actions/apiServiceSync';

const App = () => {
  useEffect(() => {
    createTable(); // Ensure database table exists on startup
    initDatabase()// Ensure sync table exists on startup
    syncOfflineData() // sync offline data to server and remove from database
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
