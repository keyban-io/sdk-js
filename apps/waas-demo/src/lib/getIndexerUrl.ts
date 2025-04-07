import { KeybanNetwork } from "@keyban/sdk-react";

// Type pour représenter les clés du mapping
type HostChainKey = `${string}_${KeybanNetwork}`;

// Mapping des combinaisons hostname + chain vers les indexeurs
const indexerUrlMapping: Record<HostChainKey, string> = {
  // EthereumAnvil mappings
  localhost_EthereumAnvil: "https://blockscout.keyban.localtest.me",
  "waas-demo.marc.lvh.me_EthereumAnvil":
    "https://blockscout.keyban.localtest.me",
  "waas-demo.testing.keyban.fr_EthereumAnvil":
    "https://blockscout.testing.keyban.io",

  // Sepolia mappings (même indexeur pour tous les domaines)
  localhost_PolygonAmoy: "https://rpc-amoy.polygon.technology",
  "waas-demo.marc.lvh.me_PolygonAmoy": "https://rpc-amoy.polygon.technology",
  "waas-demo.testing.keyban.fr_PolygonAmoy":
    "https://rpc-amoy.polygon.technology",
  "waas-demo.staging.keyban.fr_PolygonAmoy": "https://rpc-amoy.polygon.technology",
};

export const getIndexerUrl = (
  network: KeybanNetwork,
  txHash: string,
): string => {
  const hostname = window.location.hostname;

  // Générer la clé pour le mapping
  const key = `${hostname}_${network}` as HostChainKey;

  // Vérifier si la chaîne EthereumAnvil est disponible sur le domaine actuel
  if (
    network === KeybanNetwork.EthereumAnvil &&
    hostname === "waas-demo.staging.keyban.fr"
  ) {
    throw new Error(
      "EthereumAnvil n'est pas disponible sur l'environnement de démonstration",
    );
  }

  const indexerUrl = indexerUrlMapping[key];

  if (indexerUrl) {
    return `${indexerUrl}/tx/${txHash}`;
  }
  throw new Error(
    `Indexeur non défini pour le domaine "${hostname}" avec la chaîne "${network}"`,
  );
};
