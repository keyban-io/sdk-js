import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {KeybanEddsaProvider, useKeybanEddsa} from '@keyban/sdk-react-native';
import webApp from './src/keybanWebView';

function App() {
  return (
    <KeybanEddsaProvider
      webApp={webApp}
      storageProvider={{
        get: _ => Promise.resolve('1'),
        save: (_, _m) => Promise.resolve(true),
      }}>
      <Main />
    </KeybanEddsaProvider>
  );
}

const Main = () => {
  const {add, initialized} = useKeybanEddsa();
  const [sum, setSum] = useState<number | null>(0);
  useEffect(() => {
    const init = async () => {
      if (initialized) {
        const res = await add(3, 3).catch(e => {
          console.error(e);
        });
        setSum(res ?? 0);
      }
    };

    init();
  }, [initialized, add]);

  return (
    <>
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          Below is a sum for a 3 and 3 with @keyban/sdk-react-native based on
          WASM
        </Text>
        <View
          style={{
            borderStyle: 'solid',
            borderColor: 'purple',
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
          }}>
          <Text style={{textAlign: 'center'}}>{sum}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
    marginTop: 400,
    height: '100%',
  },
});

export default App;
