/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {KeybanProvider, useKeybanSdk} from './src/provider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <KeybanProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <TestComponent />
      </SafeAreaView>
    </KeybanProvider>
  );
};

const TestComponent = () => {
  const {sdk, initialized} = useKeybanSdk();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [res, setRes] = useState(0);

  const onClick = async () => {
    if (initialized && sdk) {
      const result = await sdk.add({num1, num2});
      setRes(result);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={text => setNum1(+text)}
          value={String(num1)}
          maxLength={10} //setting limit of input
        />
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={text => setNum2(+text)}
          value={String(num2)}
          maxLength={10} //setting limit of input
        />
      </View>
      <TouchableOpacity onPress={() => onClick()} style={styles.button}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>

      <Text style={{marginTop: 20}}>Result: {res}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200EE', // Material Design purple
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  textInput: {
    borderBottomWidth: 2,
    backgroundColor: 'lightgray',
    borderBottomColor: '#007AFF',
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  container: {
    height: '100%',
    padding: 20,
  },
  flex: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10,
  },
});

export default App;
