import * as _ from "./wasm_exec.js";

async function run(wasmUrl) {
    if (wasmUrl === undefined) {
        wasmUrl = new URL('ecdsa.wasm', import.meta.url);
    }
    const go = new Go();
    const obj = await WebAssembly.instantiateStreaming(fetch(wasmUrl), go.importObject);
    await go.run(obj.instance);
}

export default run;
