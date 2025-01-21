import { ClientShareProvider } from "@keyban/sdk-react";

class MyClientShareProvider implements ClientShareProvider {
  private clientShareKey: string;

  constructor(appId: string) {
    // Concatenates the appId to form a unique storage key
    this.clientShareKey = `clientShare-${appId}`;
  }

  async get(): Promise<string | null> {
    try {
      return localStorage.getItem(this.clientShareKey);
    } catch (error) {
      console.error("Error retrieving the clientShare:", error);
      return null;
    }
  }

  async set(clientShare: string): Promise<void> {
    try {
      localStorage.setItem(this.clientShareKey, clientShare);
    } catch (error) {
      console.error("Error saving the clientShare:", error);
    }
  }
}

export default MyClientShareProvider;
