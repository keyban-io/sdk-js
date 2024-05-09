export * from "./math/math";
export * from "./eddsa";

// import {
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     useColorScheme,
//     View,
// } from 'react-native';
//
// import {KeybanEddsaProvider, useKeybanEddsa} from '@keyban/sdk-react-native';
// import {useEffect, useMemo, useState} from 'react';
//
// console.log(useKeybanEddsa, KeybanEddsaProvider);
// function App(): React.JSX.Element {
//     return (
//         <KeybanEddsaProvider
//             storageProvider={{
//         get: _ => Promise.resolve('1'),
//             save: (_, _m) => Promise.resolve(true),
//     }}>
//     <Main />
//     </KeybanEddsaProvider>
// );
// }
//
// const Main = () => {
//     const {add, initialized} = useKeybanEddsa();
//     const [sum, setSum] = useState<number | null>(null);
//
//     useEffect(() => {
//         const init = async () => {
//             if (initialized) {
//                 const res = await add(3, 3);
//                 setSum(res);
//             }
//         };
//
//         init();
//     }, [initialized, add]);
//
//     return (
//         <>
//             <View style={styles.container}>
//         <Text style={{textAlign: 'center'}}>
//     Below is a sum for a 3 and 3 with @keyban/sdk-react-native based on
//     WASM
//     </Text>
//     <View
//     style={{
//         borderStyle: 'solid',
//             borderColor: 'purple',
//             borderWidth: 1,
//             padding: 10,
//     }}>
//     <Text style={{textAlign: 'center'}}>{sum}</Text>
//     </View>
//     </View>
//     </>
// );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: 250,
//         justifyContent: 'space-between',
//         height: 200,
//     },
// });
//
// export default App;
