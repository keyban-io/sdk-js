import { emit, useNativeMessage } from "react-native-react-bridge/lib/web";

import { type WasmApi, initWasm } from "@keyban/sdk-base";
import { useEffect, useState } from "react";
import { WasmInvoker } from "~/eddsa/wasmBridge";

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
  const [instance, setInstance] = useState<WasmInvoker | null>(null);

  // useNativeMessage hook receives message from React Native
  useNativeMessage(async (message) => {
    if (!instance) return;

    switch (message.type as keyof WasmApi) {
      case "add": {
        const result = await instance.add(message.data as string);
        emit({ type: "add", data: result });
        break;
      }
      case "generateKeypair": {
        const result = await instance.generateKeypair(message.data as string);
        emit({ type: "generateKeypair", data: result });
        break;
      }
      case "signMessage": {
        const result = await instance.signMessage(message.data as string);
        emit({ type: "generateKeypair", data: result });
        break;
      }
    }
  });

  useEffect(() => {
    const init = async () => {
      const wasmApi = await initWasm();

      // const module = await WebAssembly.instantiate(bufferSrc);

      setInstance(new WasmInvoker(wasmApi as unknown as WasmApi));
      emit({ type: "initialized", data: "" });
    };
    init();
  }, []);

  return <div />;
};
