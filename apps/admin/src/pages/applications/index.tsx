import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import React from "react";
import { useIntl } from "react-intl";

interface IApplication {
  id: string;
  name?: string;
}

export default function ApplicationsPage() {
  const intl = useIntl();

  const { dataGridProps } = useDataGrid<IApplication>({
    resource: "applications",
  });

  const columns = React.useMemo(
    (): GridColDef<IApplication>[] => [
      {
        field: "id",
        headerName: intl.formatMessage({ defaultMessage: "ID" }),
        type: "string",
        flex: 1,
        renderCell: ({ row }) => <code>{row.id}</code>,
      },
      {
        field: "name",
        headerName: intl.formatMessage({ defaultMessage: "Name" }),
        type: "string",
        flex: 1,
        editable: true,
      },
      {
        field: "actions",
        headerName: intl.formatMessage({ defaultMessage: "Actions" }),
        align: "right",
        headerAlign: "right",
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    [intl],
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        density="compact"
        disableColumnResize
        sx={{ ".MuiDataGrid-columnSeparator--sideRight": { right: -6 } }}
        columns={columns}
      />
    </List>
  );
}
