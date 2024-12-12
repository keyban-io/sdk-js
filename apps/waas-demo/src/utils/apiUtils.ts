const symbolToIdMap: { [key: string]: string } = {
  pol: "polygon-ecosystem-token",
  eth: "ethereum",
};

interface CryptoPriceResponse {
  [key: string]: {
    eur: number;
  };
}

export const fetchCryptoToEuroRate = async (
  symbol: string,
): Promise<number> => {
  const cryptoId = symbolToIdMap[symbol.toLowerCase()];
  if (!cryptoId) {
    throw new Error(`No mapping found for symbol: ${symbol}`);
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=eur`,
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: CryptoPriceResponse = await response.json();

    if (!data[cryptoId] || typeof data[cryptoId].eur !== "number") {
      throw new Error(`Unexpected API response structure for ${cryptoId}`);
    }

    return data[cryptoId].eur;
  } catch (error) {
    console.error("Error fetching crypto to euro rate:", error);
    throw error;
  }
};
