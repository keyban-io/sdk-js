import { FallbackProps } from "react-error-boundary";

import RefreshButton from "~/components/atoms/RefreshButton";
import SerializedValue from "~/components/atoms/SerializedValue";

export default function AppError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <fieldset data-test-id="AppError">
      <legend>
        <span data-test-id="AppError:message">{error.message}</span>
        <RefreshButton
          onClick={resetErrorBoundary}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="AppError:retry"
        />
      </legend>
      <pre data-test-id="AppError:stack">{error.stack}</pre>
      <SerializedValue value={error} data-test-id="AppError:object" />
    </fieldset>
  );
}
