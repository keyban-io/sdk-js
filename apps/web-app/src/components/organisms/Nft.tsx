import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import {
  useKeybanAccount,
  useKeybanAccountNft,
} from "@keyban/sdk-react";

export default function Nft() {
  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const [nft, nftError, { refresh }] =
    useKeybanAccountNft(account, { suspense: true });
  if (nftError) throw nftError;

  return (
    <fieldset>
      <legend>
        NFT
        <RefreshButton
          onClick={refresh}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="Nft:refresh"
        />
      </legend>

      {nft.map(({ token, id, balance, imageUrl }) => (
        <fieldset
          key={token.address}
          data-test-id={`Nft:token:${token.address}`}
        >
          <legend>{token.name}</legend>

          <Row>
            <span>Address:</span>
            <SerializedValue
              value={token.address}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:address"
            />
          </Row>

          <Row>
            <span>Name:</span>
            <SerializedValue
              value={token.name}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:name"
            />
          </Row>

          <Row>
            <span>ID:</span>
            <SerializedValue
              value={id}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:id"
            />
          </Row>

          <Row>
            <span>Image URL:</span>
            <SerializedValue
              value={imageUrl}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:imageUrl"
            />
          </Row>

          <Row style={{ marginBlockStart: "1em" }}>
            <span>Balance:</span>

            <SerializedValue
              value={balance}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:value"
            />

            <SerializedValue
              value={token.symbol}
              data-test-id="Nft:symbol"
            />
          </Row>
        </fieldset>
      ))}
    </fieldset>
  );
}
