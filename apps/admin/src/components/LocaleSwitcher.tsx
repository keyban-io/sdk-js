import { MenuItem, Select } from "@mui/material";
import { useIntl } from "react-intl";

import { Locale, useLocaleSwitcher } from "~/lib/intl";

const FLAGS: { [L in Locale]: string } = {
  [Locale.enUS]: "🇺🇸",
  [Locale.frFR]: "🇫🇷",
};

const NAMES: { [L in Locale]: string } = {
  [Locale.enUS]: "English",
  [Locale.frFR]: "Français",
};

export default function LocaleSwitcher() {
  const intl = useIntl();
  const setLocale = useLocaleSwitcher();

  return (
    <Select
      variant="standard"
      value={intl.locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      renderValue={(value) => FLAGS[value as Locale]}
      sx={{
        alignSelf: "center",
        color: "inherit",
        "&::before": { display: "none" },
        "&::after": { display: "none" },
        ".MuiSelect-icon": { color: "currentColor" },
        ".MuiOutlinedInput-notchedOutline": { display: "none" },
      }}
    >
      {Object.values(Locale).map((locale) => (
        <MenuItem key={locale} value={locale}>
          {FLAGS[locale]}&nbsp;{NAMES[locale]}
        </MenuItem>
      ))}
    </Select>
  );
}
