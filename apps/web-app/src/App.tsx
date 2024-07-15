import './App.css';
import { KeybanEcdsaProvider, KeybanEddsaProvider } from '@keyban/sdk-react';
import { EcdsaModule } from './modules/EcdsaModule';
import { EddsaModule } from './modules/EddsaModule';

function App() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <KeybanEddsaProvider>
        <div>
          <h1>EDDSA</h1>
          <EddsaModule />
        </div>
      </KeybanEddsaProvider>
      <KeybanEcdsaProvider>
        <div>
          <h1>ECDSA</h1>
          <EcdsaModule />
        </div>
      </KeybanEcdsaProvider>
    </div>
  );
}

export default App;
