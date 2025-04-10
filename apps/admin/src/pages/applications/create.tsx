import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

export default function ApplicationsCreatePage() {
  const intl = useIntl();

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
    </Create>
  );
}
