import { faker } from "@faker-js/faker";
import { useKeybanClient } from "@keyban/sdk-react";
import { EventSource } from "eventsource";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import TextareaAutosize from "react-textarea-autosize";

import RefreshButton from "~/components/atoms/RefreshButton";
import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";
import TextField from "~/components/molecules/TextField";

type JobProgress = {
  total: number;
  completed: number;
  errors: string[];
  results: {
    lineNumber: string;
    id: string;
    transactionHash: string;
  }[];
};

function randomTppMetadata() {
  return {
    name: faker.commerce.product(),
    image: faker.image.url(),
    attributes: [
      { trait_type: "Ean", value: faker.commerce.isbn({ separator: "" }) },
      { trait_type: "Serial number", value: faker.string.uuid() },
      { trait_type: "Product category", value: faker.commerce.department() },
      { trait_type: "Brand", value: faker.company.name() },
      { trait_type: "Model", value: faker.commerce.productName() },
      { trait_type: "Color", value: faker.color.human() },
    ],
    external_url: faker.internet.url(),
    creator: "Keyban | web-app",
    blockchain: "Starknet",
  };
}

export default function Tpp() {
  const { showBoundary } = useErrorBoundary();
  const client = useKeybanClient();

  const [apiKey, setApiKey] = React.useState("WEB-APP-API-KEY");
  const [jsonl, setJsonl] = React.useState(() =>
    JSON.stringify(randomTppMetadata()),
  );

  const [jobId, setJobId] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<JobProgress | null>(null);

  const handleCreateJob = React.useCallback(() => {
    setJobId(null);
    setProgress(null);

    const url = new URL(`/v1/tpp?network=${client.chain}`, client.apiUrl);

    const headers: HeadersInit = { "Content-Type": "application/jsonl" };
    if (apiKey) headers["X-Api-Key"] = apiKey;

    fetch(url, {
      method: "POST",
      headers,
      body: jsonl,
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) return json;
        throw new Error(json.title);
      })
      .then(({ jobId }) => jobId)
      .then(setJobId)
      .catch(showBoundary);
  }, [client, apiKey, jsonl, showBoundary]);

  const [jobStatus, setJobStatus] = React.useState<JobProgress | null>(null);
  const handleFetchStatus = React.useCallback(() => {
    const url = new URL(`/v1/tpp/${jobId}/status`, client.apiUrl);

    const headers: HeadersInit = {};
    if (apiKey) headers["X-Api-Key"] = apiKey;

    fetch(url, { headers })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) return json;
        throw new Error(json.title);
      })
      .then(setJobStatus)
      .catch(showBoundary);
  }, [client, apiKey, jobId, showBoundary]);

  React.useEffect(() => {
    if (!jobId) return;

    const url = new URL(`/v1/tpp/${jobId}/progress`, client.apiUrl);

    const eventSource = new EventSource(url, {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            "X-Api-Key": apiKey,
          },
        }),
    });

    eventSource.onmessage = (e) => {
      setProgress(JSON.parse(e.data));
    };

    return () => eventSource.close();
  }, [client, apiKey, jobId]);

  return (
    <fieldset data-test-id="Tpp">
      <legend>TPP</legend>

      <Row>
        <TextareaAutosize
          value={jsonl}
          maxRows={20}
          onChange={(e) => setJsonl(e.target.value)}
          data-test-id="Tpp:jsonl"
          style={{ flexGrow: 1 }}
        />

        <button onClick={() => setJsonl(JSON.stringify(randomTppMetadata()))}>
          Random
        </button>
      </Row>

      <Row>
        <TextField
          label="API Key"
          value={apiKey}
          onChange={setApiKey}
          data-test-id="Tpp:apiKey"
          style={{ flexGrow: 1 }}
        />

        <button onClick={handleCreateJob} data-test-id="Tpp:createJob">
          Create job
        </button>
      </Row>

      <TextField
        label="Job ID"
        type="number"
        value={jobId ?? ""}
        onChange={setJobId}
        data-test-id="Tpp:jobId"
      />

      {progress && (
        <fieldset>
          <legend>Job #{jobId}</legend>

          <Row>
            <span>
              <span data-test-id="Tpp:progress:completed">
                {progress.completed}
              </span>
              &nbsp;/&nbsp;
              <span data-test-id="Tpp:progress:total">{progress.total}</span>
            </span>

            <progress
              value={
                progress
                  ? progress.total > 0
                    ? progress.completed / progress.total
                    : 1
                  : undefined
              }
              style={{ flexGrow: 1 }}
              data-test-id="Tpp:progress"
            />
          </Row>

          <fieldset>
            <legend>Errors</legend>
            <SerializedValue
              value={progress?.errors ?? []}
              style={{ flexGrow: 1 }}
              data-test-id="Tpp:progress:errors"
            />
          </fieldset>

          <fieldset>
            <legend>Results</legend>
            <SerializedValue
              value={progress?.results ?? []}
              style={{ flexGrow: 1 }}
              data-test-id="Tpp:results"
            />
          </fieldset>
        </fieldset>
      )}

      {jobId && (
        <fieldset>
          <legend>
            Status
            <RefreshButton
              onClick={handleFetchStatus}
              style={{ marginInlineStart: "0.5ch" }}
              data-test-id="Tpp:status:fetch"
            />
          </legend>

          <SerializedValue value={jobStatus} data-test-id="Tpp:status" />
        </fieldset>
      )}
    </fieldset>
  );
}
