import {
  webViewRender,
  emit,
  useNativeMessage,
} from "react-native-react-bridge/lib/web";

import { useEffect, useState } from "react";
import type { WasmApi } from "@keyban/sdk-base";
import { getWasmBuffer } from "@keyban/sdk-base";
import { WasmInvoker } from "./wasmInvoker";

const Root = () => {
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

  return <div>load end here</div>;
};

// This statement is detected by babelTransformer as an entry point
// All dependencies are resolved, compressed and stringified into one file
export default webViewRender(<Root />);
