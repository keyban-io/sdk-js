import {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {eddsa} from '@keyban/sdk-react-native';
import webApp from './src/keybanWebView';
const {useKeybanEddsa, KeybanEddsaProvider} = eddsa;
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
    console.log('hyto', initialized);
    const init = async () => {
      if (initialized) {
        console.log('hegaxd');
        const res = await add(3, 3).catch(e => {
          console.error(e);
        });
        console.log('reh', res);
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
