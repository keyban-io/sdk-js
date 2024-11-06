import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import {
  useKeybanAccount,
  useKeybanAccountNfts,
} from "@keyban/sdk-react";

export default function Nft() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [nftBalances, nftsError, { refresh }] = useKeybanAccountNfts(account);
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
          value={nftBalances.length}
          style={{ flexGrow: 1 }}
          data-test-id="Nft:count"
        />
      </Row>

      {nftBalances.map(
        (nftBalance) =>
          nftBalance && (
            <fieldset
              key={nftBalance.nft?.collection?.id}
              data-test-id={`Nft:collection:${nftBalance.nft?.collection?.id}:${nftBalance.nft?.tokenId}`}
            >
              <legend>{nftBalance.nft?.collection?.name}</legend>

              <Row>
                <span>Address:</span>
                <SerializedValue
                  value={nftBalance.nft?.collection?.id}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:collection:address"
                />
              </Row>

              <Row>
                <span>Type:</span>
                <SerializedValue
                  value={nftBalance.nft?.collection?.type}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:collection:type"
                />
              </Row>

              <Row>
                <span>ID:</span>
                <SerializedValue
                  value={nftBalance.nft?.tokenId}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:nft:id"
                />
              </Row>

              <SerializedValue value={nftBalance} data-test-id="Nft:raw" />
            </fieldset>
          ),
      )}
    </fieldset>
  );
}
