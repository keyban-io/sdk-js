class FetchBaseProvider {
  #key: string;

  constructor(key: string) {
    this.#key = key;
  }

  async fetch(_url: string, options: RequestInit = {}) {
    const method = options.method?.toUpperCase() || "GET";
    if (method === "GET") {
      const data = localStorage.getItem(this.#key);
      if (!data) {
        return null;
      }
      return JSON.parse(data);
    } else if (method === "POST" || method === "PUT") {
      if (options.body) {
        const parsedBody = options.body;
        localStorage.setItem(this.#key, JSON.stringify(parsedBody));
        return parsedBody;
      } else {
        throw new Error("No body provided for POST/PUT request");
      }
    } else {
      throw new Error(`Unsupported method: ${method}`);
    }
  }
}
export default FetchBaseProvider;
