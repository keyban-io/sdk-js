import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";

/**
 * A React component that renders a select dropdown for choosing the color mode.
 * It uses the `useColorScheme` hook to get the current mode and a function to set the mode.
 * If the mode is not available, it returns null.
 * @param props - The props to be passed to the Select component.
 * @returns The rendered Select component or null if the mode is not available.
 * @example
 * <ColorModeSelect />
 */
export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as "system" | "light" | "dark")
      }
      inputProps={{
        "data-screenshot": "toggle-mode",
      }}
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
