import { ResourceProps } from "@refinedev/core";
import { IntlShape } from "react-intl";

export default (intl: IntlShape): ResourceProps => ({
  name: "applications",
  list: "",
  edit: "/:id",
  create: "/create",
  meta: {
    label: intl.formatMessage({ defaultMessage: "Applications" }),
    canDelete: true,
  },
});
