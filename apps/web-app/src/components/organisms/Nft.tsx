import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import { useKeybanAccount, useKeybanAccountNfts } from "@keyban/sdk-react";

export default function Nft() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [nfts, nftsError, { refresh }] = useKeybanAccountNfts(account);
  if (nftsError) throw nftsError;

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

      <Row>
        <span>Count:</span>
        <SerializedValue
          value={nfts.length}
          style={{ flexGrow: 1 }}
          data-test-id="Nft:count"
        />
      </Row>

      {nfts.map(
        (nft) =>
          nft && (
            <fieldset
              key={nft.token?.id}
              data-test-id={`Nft:token:${nft.token?.id}:${nft.nftId}`}
            >
              <legend>{nft.token?.name}</legend>

              <Row>
                <span>Address:</span>
                <SerializedValue
                  value={nft.token?.id}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:token:address"
                />
              </Row>

              <Row>
                <span>Type:</span>
                <SerializedValue
                  value={nft.token?.type}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:token:type"
                />
              </Row>

              <Row>
                <span>ID:</span>
                <SerializedValue
                  value={nft.nftId}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:token:id"
                />
              </Row>

              <SerializedValue value={nft} data-test-id="Nft:raw" />
            </fieldset>
          ),
      )}
    </fieldset>
  );
}
