import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  KeybanEddsaProvider,
  useKeybanEddsa,
  KeybanAsyncStorage,
} from "@keyban/sdk-react-native";
import webApp from "./src/keybanWebView";

function App() {
  return (
    <KeybanEddsaProvider webApp={webApp}>
      <Main />
    </KeybanEddsaProvider>
  );
}

const keybanAsyncStorage = new KeybanAsyncStorage();

const Main = () => {
  const {
    initialized,
    createAccount,
    knownAccounts,
    getSaveAccounts,
    clientStatus,
  } = useKeybanEddsa();
  const [sum, setSum] = useState<number | null>(0);

  useEffect(() => {
    const init = async () => {
      if (initialized) {
        const accounts = await getSaveAccounts(keybanAsyncStorage);
        if (accounts.length) {
          const res = await accounts[0]?.add(3, 3).catch((e: unknown) => {
            console.error(e);
          });
          setSum(res ?? 0);
        } else {
          const account = await createAccount(keybanAsyncStorage);
          const res = await account.add(3, 3).catch((e: unknown) => {
            console.error(e);
          });
          setSum(res ?? 0);
        }
      }
    };

    init();
  }, [initialized, getSaveAccounts, createAccount]);

  return (
    <>
      <View style={styles.container}>
        {clientStatus ? (
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              Client health check was performed
            </Text>
            <Text
              testID="client-health"
              style={{
                borderStyle: "solid",
                borderColor: "purple",
                borderWidth: 1,
                padding: 10,
                marginTop: 20,
                marginBottom: 50,
                textAlign: "center",
              }}
            >
              {clientStatus}
            </Text>
          </View>
        ) : null}

        <Text style={{ textAlign: "center" }}>
          Below is a sum for 3 and 3 with @keyban/sdk-react-native based on WASM
        </Text>
        <Text style={{ textAlign: "center", marginTop: 5 }}>
          Account address: {knownAccounts[0]?.address ?? "N/A"}
        </Text>
        <View
          style={{
            borderStyle: "solid",
            borderColor: "purple",
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
          }}
        >
          <Text testID="wasm-sum" style={{ textAlign: "center" }}>
            {sum}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    marginTop: 300,
    height: "100%",
  },
});

export default App;
