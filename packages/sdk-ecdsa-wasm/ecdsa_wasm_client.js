import * as _ from "./wasm_exec.js";

async function run(wasmUrl = new URL("ecdsa.wasm", import.meta.url)) {
  const go = new Go();

  const obj = await WebAssembly.instantiateStreaming(
    fetch(wasmUrl),
    go.importObject
  );

  // Go program will stall waiting on an never ending channel; don't wait for the program promise to resolve ever
  go.run(obj.instance).catch(console.error);
}

export default run;
