import * as _ from "./wasm_exec.js";

async function run(wasmUrl) {
  if (wasmUrl === undefined) {
    wasmUrl = new URL("ecdsa.wasm", import.meta.url);
  }

  const go = new Go();

  const obj = await WebAssembly.instantiateStreaming(
    fetch(wasmUrl),
    go.importObject
  );

  // Timeout mechanism to detect blocking
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout during go.run()")), 500)
  );

  await Promise.race([go.run(obj.instance), timeoutPromise]).catch((e) =>
    console.error("Error during go.run:", e)
  );
}

export default run;
