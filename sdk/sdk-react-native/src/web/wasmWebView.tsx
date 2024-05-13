import { emit, useNativeMessage } from "react-native-react-bridge/lib/web";

import { useEffect, useState, useCallback } from "react";
import type { WasmApi } from "@keyban/sdk-base";
import { getWasmBuffer } from "@keyban/sdk-base";
import { WasmInvoker } from "../eddsa/wasmBridge/wasmInvoker";

const WebViewRoot = () => {
  const [instance, setInstance] = useState<WasmInvoker | null>(null);
  const [logs, setLogs] = useState<[string, Date][]>([]);
  const addLog = useCallback(
    (log: string) => setLogs((prev) => [...prev, [log, new Date()]]),
    []
  );
  // useNativeMessage hook receives message from React Native
  useNativeMessage(async (message) => {
    if (!instance) return;

    if (message.type === "add") {
      addLog("received add");
      const result = await instance.add(message.data as string);
      emit({ type: "add", data: result });
    }
  });

  useEffect(() => {
    const init = async () => {
      const bufferSrc = await getWasmBuffer();
      const module = await WebAssembly.instantiate(bufferSrc);

      setInstance(new WasmInvoker(module.instance.exports as WasmApi));
      addLog("after buffer");
      emit({ type: "initialized", data: "" });
    };
    init();
  }, [addLog]);

  return (
    <div>
      shut
      {logs.map(([log, time]) => (
        <div key={time.getTime()} style={{ display: "flex", gap: 6 }}>
          <p>{time.toLocaleDateString()}</p>
          <p>{log}</p>
        </div>
      ))}
    </div>
  );
};

export { WebViewRoot };
