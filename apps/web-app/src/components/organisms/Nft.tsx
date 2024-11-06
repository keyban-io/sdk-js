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
          value={nftBalances?.totalCount}
          style={{ flexGrow: 1 }}
          data-test-id="Nft:count"
        />
      </Row>

      {nftBalances?.edges.map(
        ({ cursor, node }) =>
          node && (
            <fieldset
              key={cursor}
              data-test-id={`Nft:collection:${node.nft?.collection?.id}:${node.nft?.tokenId}`}
            >
              <legend>{node.nft?.collection?.name}</legend>

              <Row>
                <span>Address:</span>
                <SerializedValue
                  value={node.nft?.collection?.id}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:collection:address"
                />
              </Row>

              <Row>
                <span>Type:</span>
                <SerializedValue
                  value={node.nft?.collection?.type}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:collection:type"
                />
              </Row>

              <Row>
                <span>ID:</span>
                <SerializedValue
                  value={node.nft?.tokenId}
                  style={{ flexGrow: 1 }}
                  data-test-id="Nft:nft:id"
                />
              </Row>

              <SerializedValue value={node} data-test-id="Nft:raw" />
            </fieldset>
          ),
      )}
    </fieldset>
  );
}
