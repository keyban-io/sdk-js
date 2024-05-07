/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Add, Substract} from '@keyban/sdk-react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        Below is a sum for a 3 and 3 with @keyban/sdk-react-native
      </Text>
      <View
        style={{
          borderStyle: 'solid',
          borderColor: 'purple',
          borderWidth: 1,
          padding: 10,
        }}>
        <Add a={3} b={3} />
      </View>

      <Text style={{textAlign: 'center'}}>
        Below is a subtraction of a 10 and 8 with @keyban/sdk-react-native
      </Text>
      <View
        style={{
          borderStyle: 'solid',
          borderColor: 'purple',
          borderWidth: 1,
          padding: 10,
        }}>
        <Substract a={10} b={8} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 250,
    justifyContent: 'space-between',
    height: 200,
  },
});

export default App;
