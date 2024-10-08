import { KeybanChain } from "@keyban/sdk-react";

// Type pour représenter les clés du mapping
type HostChainKey = `${string}_${KeybanChain}`;

// Mapping des combinaisons hostname + chain vers les indexeurs
const indexerUrlMapping: Record<HostChainKey, string> = {
  // KeybanTestnet mappings
  localhost_KeybanTestnet: "https://blockscout.keyban.localtest.me",
  "waas-demo.keyban.localtest.me_KeybanTestnet":
    "https://blockscout.keyban.localtest.me",
  "waas-demo.testing.keyban.io_KeybanTestnet":
    "https://blockscout.testing.keyban.io",

  // Sepolia mappings (même indexeur pour tous les domaines)
  localhost_Sepolia: "https://sepolia.etherscan.io",
  "waas-demo.keyban.localtest.me_Sepolia": "https://sepolia.etherscan.io",
  "waas-demo.testing.keyban.io_Sepolia": "https://sepolia.etherscan.io",
  "waas-demo.demo.keyban.io_Sepolia": "https://sepolia.etherscan.io",
};

export const getIndexerUrl = (chain: KeybanChain, txHash: string): string => {
  const hostname = window.location.hostname;

  // Générer la clé pour le mapping
  const key = `${hostname}_${chain}` as HostChainKey;

  // Vérifier si la chaîne KeybanTestnet est disponible sur le domaine actuel
  if (
    chain === KeybanChain.KeybanTestnet &&
    hostname === "waas-demo.demo.keyban.io"
  ) {
    throw new Error(
      "KeybanTestnet n'est pas disponible sur l'environnement de démonstration",
    );
  }

  const indexerUrl = indexerUrlMapping[key];

  if (indexerUrl) {
    return `${indexerUrl}/tx/${txHash}`;
  }
  throw new Error(
    `Indexeur non défini pour le domaine "${hostname}" avec la chaîne "${chain}"`,
  );
};
