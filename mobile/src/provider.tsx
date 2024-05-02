import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import WebView from 'react-native-webview';
import {useWebViewMessage} from 'react-native-react-bridge';
import webApp from './webInstance';

class TestSigner {
  wasmInterface;
  constructor(wasmInstance: any) {
    this.wasmInterface = wasmInstance;
  }

  async add({num1, num2}: {num1: number; num2: number}) {
    const sum = await this.wasmInterface.add(num1, num2);
    return sum;
  }
}

type PromiseResolveFn = (data: string) => void;

class NativeWasm {
  promiseMap = new Map<string, PromiseResolveFn>();
  emitFn: ((params: {type: string; data: string}) => void) | null = null;
  constructor(emitFn: (params: {type: string; data: string}) => void) {
    this.promiseMap = new Map<string, PromiseResolveFn>();
    this.emitFn = emitFn;
  }

  receiveMessage(messageString: string) {
    const {id} = JSON.parse(messageString);
    const resFn = this.promiseMap.get(id);

    if (!resFn) return;
    this.promiseMap.delete(id);

    resFn(messageString);
  }

  promisifyMessage(callback: () => void, callId: string): Promise<string> {
    return new Promise((res, rej) => {
      callback();
      this.promiseMap.set(callId, res);

      // timeout after 10seconds
      setTimeout(rej, 10_000);
    });
  }

  async add(num1: number, num2: number) {
    if (!this.emitFn) return;
    console.log('wa');
    const callId = '1'; // this should be random uuid
    const stringPayload = JSON.stringify({
      id: callId,
      params: {
        num1: num1,
        num2: num2,
      },
    });

    const resultString = await this.promisifyMessage(() => {
      this.emitFn!({
        type: 'add',
        data: stringPayload,
      });
    }, callId);

    console.log('NativeWasm received: ', resultString);

    return JSON.parse(resultString).result;
  }
}

const KeybanContext = createContext<{
  sdk: TestSigner | null;
  initialized: boolean;
} | null>(null);

export const KeybanProvider = ({children}: {children: ReactNode}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const nativeWasmRef = useRef<NativeWasm | null>(null);
  const sdkRef = useRef<TestSigner | null>(null);

  const {ref, onMessage, emit} = useWebViewMessage(message => {
    if (message.type === 'initialized') {
      console.log('WebAssembly initialized inside WebView');
      nativeWasmRef.current = new NativeWasm(emit);
      sdkRef.current = new TestSigner(nativeWasmRef.current);
      setIsInitialized(true);
      return;
    }

    nativeWasmRef.current?.receiveMessage(message.data as string);
  });

  useEffect(() => {
    if (isInitialized) {
      console.log(
        'Client: Sending sum request to WebAssembly with numbers 3 and 4',
      );
      sdkRef.current
        ?.add({
          num1: 300,
          num2: 44,
        })
        .then(res => {
          console.log('Client: Receiving sum response: ', res);
        });
    }
  }, [isInitialized]);

  return (
    <KeybanContext.Provider
      value={{
        sdk: sdkRef.current,
        initialized: isInitialized,
      }}>
      <WebView
        ref={ref}
        style={{display: 'none'}}
        webviewDebuggingEnabled
        source={{html: webApp}}
        onMessage={onMessage}
      />
      {children}
    </KeybanContext.Provider>
  );
};

export const useKeybanSdk = () => {
  const context = useContext(KeybanContext);

  if (!context) {
    throw 'useKeybanSdk has to be used inside KeybanProvider';
  }

  return context;
};
