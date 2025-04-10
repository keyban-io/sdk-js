import { FormattedMessage } from "react-intl";

export default function IndexPage() {
  return (
    <div>
      <FormattedMessage
        defaultMessage="Hello {name}!"
        values={{ name: "IndexPage" }}
      />
    </div>
  );
}
