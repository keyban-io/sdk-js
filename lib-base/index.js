// type WasmInstance = {
//     sign: () => Promise<Blob>
//     hexToString: (hex: string) => string
// }

class TestSigner {
  wasmInterface;
  constructor(wasmInstance) {
    this.wasmInterface = wasmInstance;
  }

  add({ num1, num2 }) {
    const sum = this.wasmInterface.add(num1, num2);
    console.log(`this is a sum of ${num1} and ${num2}: `, sum);
    return sum;
  }
}

export { TestSigner };
