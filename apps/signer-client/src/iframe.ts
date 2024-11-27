import { ISigner, IYolo, RpcServer } from "~/rpc";

class Signer implements ISigner {
  async greet(name: string) {
    console.log(`hello ${name}!`);
  }
  square(x: number) {
    return x ** 2;
  }
}

class Yolo implements IYolo {
  async yolo() {
    console.log("YOLO");
  }
}

new RpcServer(new Signer(), new Yolo());
