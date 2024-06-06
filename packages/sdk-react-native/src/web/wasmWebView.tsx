import { emit, useNativeMessage } from 'react-native-react-bridge/lib/web';

import type { WasmApi } from '@keyban/sdk-base';
import initWasm from 'eddsa-wasm-client';
import { useEffect, useState } from 'react';
import { WasmInvoker } from '~/wasmBridge';

/**
 * This is very important part of the library.
 *
 * @example
 * Create new file in your React Native app with the code below.
 * You will have to import it into KeybanEddsaProvider
 * ```
 * import {WebViewRoot} from '@keyban/sdk-react-native/dist/web';
 * import {webViewRender} from 'react-native-react-bridge/lib/web';
 *
 * export default webViewRender(<WebViewRoot />);
 * ```
 * */
export const WebViewRoot = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [instance, setInstance] = useState<any | null>(null);
  const [error] = useState<string[]>([]);

  // useNativeMessage hook receives message from React Native
  useNativeMessage(async (message) => {
    console.log('inner', message);
    if (!instance) return;

    switch (message.type as keyof WasmApi) {
      case 'add': {
        const result = await instance.add(message.data as string);
        emit({ type: 'add', data: result });
        break;
      }
      case 'dkg': {
        const result = await instance.dkg(message.data as string);
        emit({ type: 'dkg', data: result });
        break;
      }
      // case 'signMessage': {
      //   const result = await instance.signMessage(message.data as string);
      //   emit({ type: 'generateKeypair', data: result });
      //   break;
      // }
    }
  });

  useEffect(() => {
    const init = async () => {
      await initWasm();

      setInstance(new WasmInvoker({} as unknown as WasmApi));
      emit({ type: 'initialized', data: '' });
    };
    init();
  }, []);

  return (
    <div>
      {error.map((er, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <h1 key={index}>{er}</h1>
      ))}
    </div>
  );
};
