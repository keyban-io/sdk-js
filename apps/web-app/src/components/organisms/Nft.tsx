import React from "react";

import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import TextField from "@/components/molecules/TextField";
import { useKeybanAccount, useKeybanAccountNfts } from "@keyban/sdk-react";
import RefreshButton from "@/components/atoms/RefreshButton";

export default function Nft() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [pageSize, setPageSize] = React.useState("");

  const [nftBalances, nftsError, { fetchMore, refresh }] = useKeybanAccountNfts(
    account,
    { first: Number(pageSize) || undefined },
  );
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

      <table data-test-id="Nft:table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Token ID</th>
          </tr>
        </thead>
        <tbody>
          {nftBalances?.edges.map(
            ({ cursor, node }) =>
              node && (
                <tr
                  key={cursor}
                  data-test-id={`Nft:collection:${node.nft?.collection?.id}:${node.nft?.tokenId}`}
                >
                  <th data-test-id="Nft:collection:name">
                    {node.nft?.collection?.name}
                  </th>
                  <td data-test-id="Nft:collection:address">
                    <code>{node.nft?.collection?.id}</code>
                  </td>
                  <td data-test-id="Nft:collection:type">
                    <code>{node.nft?.collection?.type}</code>
                  </td>
                  <td data-test-id="Nft:nft:tokenId">
                    <code>{node.nft?.tokenId}</code>
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>

      <Row>
        <TextField
          label="Total"
          value={nftBalances?.totalCount}
          disabled
          data-test-id="Nft:totalCount"
        />

        <button
          onClick={fetchMore}
          disabled={!nftBalances?.pageInfo.hasNextPage}
          data-test-id="Nft:fetchMoreButton"
        >
          Fetch more
        </button>

        <div style={{ flexGrow: 1 }} />

        <TextField
          type="number"
          label="Items per page"
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          data-test-id="Nft:pageSizeInput"
        />
      </Row>

      <SerializedValue value={nftBalances?.edges} data-test-id="Nft:raw" />
    </fieldset>
  );
}
