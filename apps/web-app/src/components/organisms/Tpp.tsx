import { useKeybanClient } from "@keyban/sdk-react";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";
import TextField from "~/components/molecules/TextField";

export default function Tpp() {
  const client = useKeybanClient();

  const [apiKey, setApiKey] = React.useState("WEB-APP-API-KEY");
  const [jsonl, setJsonl] = React.useState(
    [{ id: "foo" }, { id: "bar" }, { id: "baz" }, { id: "qux" }]
      .map((data) => JSON.stringify(data))
      .join("\n"),
  );

  const [jobId, setJobId] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<{
    total: number;
    completed: number;
    errors: string[];
  } | null>(null);

  const handleCreateJob = React.useCallback(() => {
    setJobId(null);
    setProgress(null);

    const url = new URL("/tpp", client.apiUrl);

    fetch(url, {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: jsonl,
    })
      .then((res) => res.json())
      .then(({ jobId }) => jobId)
      .then(setJobId);
  }, [client, apiKey, jsonl]);

  React.useEffect(() => {
    if (!jobId) return;

    const url = new URL(`/tpp/${jobId}/progress`, client.apiUrl);

    const eventSource = new EventSource(url);

    eventSource.onmessage = (e) => {
      setProgress(JSON.parse(e.data));
    };

    return () => eventSource.close();
  }, [client, jobId]);

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

      {jobId && (
        <fieldset data-test-id="Tpp:jobDetails">
          <legend>Job #{jobId}</legend>

          <Row>
            <span>
              {progress?.completed} / {progress?.total}
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
              value={progress?.errors}
              style={{ flexGrow: 1 }}
              data-test-id="Tpp:errors"
            />
          </fieldset>
        </fieldset>
      )}
    </fieldset>
  );
}
