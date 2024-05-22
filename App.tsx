import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import { AppBaseProvider } from './src/context/AppBaseContext';


const App = () => {
  
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <AppBaseProvider>
        <AppNavigation/>
        </AppBaseProvider>
      </View>
    </>
  );
};

export default App;
