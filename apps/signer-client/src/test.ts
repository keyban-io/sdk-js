// Leaving the two ways to call the rpc for now caus i can't decide which one
// is best suited; both are properly typed all the way

// USING RPC CLIENT CALL METHOD

/*
import { RpcClient } from "~/rpc";

(async () => {
  const client = new RpcClient();

  await client.call("signer", "greet", "Sam");

  const squared = await client.call("signer", "square", 3);
  console.log("SQUARE RESULT", squared);
})();
*/

// USING PROXY

import { createRpcClient } from "~/rpc";

(async () => {
  const client = createRpcClient(new URL("/public/iframe", window.origin));

  await client.signer.greet("Sam");

  const squared = await client.signer.square(3);
  console.log("SQUARE RESULT", squared);
})();
