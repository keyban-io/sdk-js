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

      {nft.map(({ token, id, balance, imageUrl, metadata }) => (
        <fieldset
          key={`${token.address}:${id}`}
          data-test-id={`Nft:token:${token.address}:${id}`}
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
            <span>ID:</span>
            <SerializedValue
              value={id}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:id"
            />
          </Row>

          <Row>
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

          <Row>
            <span>Image URL:</span>
            <SerializedValue
              value={imageUrl}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:imageUrl"
            />
          </Row>

          <Row style={{ marginBlockStart: "1em" }}>
            <span>Name:</span>
            <SerializedValue
              value={metadata?.name}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:metadata:name"
            />
          </Row>

          <Row>
            <span>Description:</span>
            <SerializedValue
              value={metadata?.description}
              style={{ flexGrow: 1 }}
              data-test-id="Nft:metadata:description"
            />
          </Row>

          {metadata?.attributes?.map(({ traitType, value }, index) => (
            <fieldset
              key={index}
              data-test-id={`Nft:metadata:attributes:${index}`}
            >
              <legend data-test-id={`Nft:metadata:${index}:traitType`}>{traitType}</legend>

              <SerializedValue
                value={value}
                style={{ flexGrow: 1 }}
                data-test-id={`Nft:metadata:${index}:value`}
              />
            </fieldset>
          ))}

        </fieldset>
      ))}
    </fieldset>
  );
}
