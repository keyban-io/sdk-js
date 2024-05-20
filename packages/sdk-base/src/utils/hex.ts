export const hexToU8a = (hex: string) => {
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }
  const arrayLength = hex.length / 2;
  const uint8Array = new Uint8Array(arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    const byte = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    uint8Array[i] = byte;
  }
  return uint8Array;
};

export const u8aToHex = (uint8Array: Uint8Array) => {
  return uint8Array.reduce(
    (acc, byte) => acc + byte.toString(16).padStart(2, "0"),
    ""
  );
};
