import CustomFetchBaseProvider from "./CustomFetchBaseProvider";

class ClientShareProvider extends CustomFetchBaseProvider {
  constructor(appId: string) {
    super(`CLIENT-SHARE:${appId}`);
  }

  // Retrieving data (GET)
  async get() {
    return this.fetch("/api/clientShare", {
      method: "GET",
    });
  }

  // Sending/Saving data (POST or PUT)
  async set(clientShare: string) {
    return this.fetch("/api/clientShare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: clientShare,
    });
  }
}

export default ClientShareProvider;
