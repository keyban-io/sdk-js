import RefreshButton from "@/components/atoms/RefreshButton";
import SerializedValue from "@/components/atoms/SerializedValue";
import { FallbackProps } from "react-error-boundary";

export default function AppError({ error, resetErrorBoundary }: FallbackProps) {
  console.error(error);

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
