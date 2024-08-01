export const fetchMaticToEuroRate = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=eur'
  );
  const data = await response.json();
  return data['matic-network'].eur;
};
