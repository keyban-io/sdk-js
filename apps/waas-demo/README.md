# README

## Steps to Run the Demo

1. **Build the project**

   At the root of the project, run the following Earthly command to build the WAAS demo:

   ```bash
   earthly ./tools+build-waas-demo
   ```

2. **Obtain your own `appId`**

   If you want to generate your own `appId`, use this `curl` command. Replace `{your app domain}` with your actual Auth0 domain:

   ```bash
   curl -s -X POST -H "Content-Type: application/json" -d '{"jwksUri":"https://{your app domain}.eu.auth0.com/.well-known/jwks.json"}' https://api.keyban.localtest.me/applications | jq .
   ```

   **Example:**

   ```bash
   curl -s -X POST -H "Content-Type: application/json" -d '{"jwksUri":"https://dev-dgn0003beuaahtmi.eu.auth0.com/.well-known/jwks.json"}' https://api.keyban.localtest.me/applications | jq .
   ```

   The command will return a JSON object containing the `appId`. 

3. **Copy and update the configuration file**

   Copy the `config.json.exemple` file and rename it to `config.json`. Then update the `appId` value in the file:

   ```json
   {
     "appId": "{your app id, check the auth0 dashboard}"
   }
   ```

4. **Run the demo**

   Finally, run the demo using the following command:

   ```bash
   pnpm run dev
   ```
