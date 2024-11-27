import { RpcClient } from "~/rpc";

(async () => {
  const iframeUrl = new URL("/public/iframe", window.origin);
  const client = new RpcClient(iframeUrl);

  await client.call("signer", "greet", "Sam");

  const squared = await client.call("signer", "square", 3);
  console.log("SQUARE RESULT", squared);
})();
