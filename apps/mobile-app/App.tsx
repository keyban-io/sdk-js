import { KeybanEddsaProvider } from "@keyban/sdk-react-native";
import webApp from "./src/keybanWebView";
import { Main } from "./src/Main";
import { Providerr } from "./src/testProvider";

function App() {
  return (
    <Providerr>
      <KeybanEddsaProvider webApp={webApp}>
        <Main />
      </KeybanEddsaProvider>
    </Providerr>
  );
}

export default App;
