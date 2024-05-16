import { emit, useNativeMessage } from "react-native-react-bridge/lib/web";

import { useEffect, useState } from "react";
import type { WasmApi } from "@keyban/sdk-base";
import { getWasmBuffer } from "@keyban/sdk-base";
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

    if (message.type === "add") {
      const result = await instance.add(message.data as string);
      emit({ type: "add", data: result });
    }
  });

  useEffect(() => {
    const init = async () => {
      const bufferSrc = await getWasmBuffer();
      const module = await WebAssembly.instantiate(bufferSrc);

      setInstance(new WasmInvoker(module.instance.exports as WasmApi));
      emit({ type: "initialized", data: "" });
    };
    init();
  }, []);

  return <div />;
};
