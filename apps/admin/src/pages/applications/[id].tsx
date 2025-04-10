import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

export default function ApplicationEditPage() {
  const intl = useIntl();

  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: intl.formatMessage({
              defaultMessage: "This field is required",
            }),
          })}
          error={!!errors?.name}
          helperText={errors?.name?.message as string}
          margin="normal"
          fullWidth
          type="text"
          label={<FormattedMessage defaultMessage="Name" />}
        />
      </Box>
    </Edit>
  );
}
