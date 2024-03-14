import React from 'react';
import Todos from './src/screens/Todos';
import { View } from 'react-native';

const App = () => {
  return (
    
    <View style={{flex:1,backgroundColor: '#1B1A17', }}>
     <Todos/> 
    </View>
    
  );
};

export default App;

