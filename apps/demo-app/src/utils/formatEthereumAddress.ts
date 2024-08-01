export const formatEthereumAddress = (address: string): string => {
  if (address.length !== 42) return address; // Ethereum addresses have 42 characters
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
