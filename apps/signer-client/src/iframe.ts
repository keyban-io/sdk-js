import { IExample, RpcServer } from "~/rpc";
import { KeybanSigner_ECDSA } from "~/signer/ecdsa";

class Example implements IExample {
  async greet(name: string) {
    console.log(`hello ${name}!`);
  }
  square(x: number) {
    return x ** 2;
  }
}

new RpcServer({
  ecdsa: new KeybanSigner_ECDSA(),
  example: new Example(),
});
