import React from "react";
import { Paper, Typography, Box, Avatar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    period: "20/01/2025 14:47:50",
    productLot: "Black chelsea boot",
    partner: "UPS",
    partnerLogo: "https://logo.clearbit.com/ups.com",
    owner: "Primary",
    nbProduct: 100,
    operation: "Data access",
    revenue: "1 000€",
  },
  {
    id: 2,
    period: "20/01/2025 10:08:32",
    productLot: "Catarpa derby",
    partner: "Heschung",
    partnerLogo: "",
    owner: "Primary",
    nbProduct: 100,
    operation: "Data access",
    revenue: "1 000€",
  },
  {
    id: 3,
    period: "19/01/2025 11:50:55",
    productLot: "Strap heeled sandal",
    partner: "Vinted",
    partnerLogo: "https://logo.clearbit.com/vinted.com",
    owner: "Secondary",
    nbProduct: 70,
    operation: "Ownership transfer",
    revenue: "700€",
  },
  {
    id: 4,
    period: "18/01/2025 09:31:08",
    productLot: "Nike Air Max",
    partner: "Courir",
    partnerLogo: "",
    owner: "Service provider",
    nbProduct: 30,
    operation: "Data update",
    revenue: "300€",
  },
  {
    id: 5,
    period: "18/01/2025 13:20:02",
    productLot: "Basic lace-up sneakers",
    partner: "Shoes Repair",
    partnerLogo: "",
    owner: "Secondary",
    nbProduct: 50,
    operation: "Data update",
    revenue: "500€",
  },
  {
    id: 6,
    period: "17/01/2025 12:05:11",
    productLot: "Brown oxford shoes",
    partner: "Kiwiiz",
    partnerLogo: "https://logo.clearbit.com/kiwiiz.fr",
    owner: "Occasional",
    nbProduct: 20,
    operation: "Ownership transfer",
    revenue: "200€",
  },
];

const columns: GridColDef[] = [
  { field: "period", headerName: "Period", width: 160 },
  { field: "productLot", headerName: "Product lot", flex: 1 },
  {
    field: "partner",
    headerName: "Partner",
    flex: 1,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        {params.row.partnerLogo && (
          <Avatar
            src={params.row.partnerLogo}
            alt={params.value}
            sx={{ mr: 1, width: 24, height: 24 }}
          />
        )}
        <Typography variant="body2">{params.value}</Typography>
      </Box>
    ),
  },
  { field: "owner", headerName: "Owner", width: 140 },
  { field: "nbProduct", headerName: "Nb Product", width: 110, type: "number" },
  { field: "operation", headerName: "Operation", width: 160 },
  {
    field: "revenue",
    headerName: "Revenue",
    width: 100,
    align: "right",
    headerAlign: "right",
  },
];

export const DetailedReport: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, maxWidth: "100%" }}>
      <Box sx={{ width: "100%", overflow: "auto", maxHeight: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          hideFooterPagination
          hideFooter
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              backgroundColor: "rgba(250, 250, 250, 1)",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(245, 245, 245, 0.5)",
            },
          }}
        />
      </Box>
    </Paper>
  );
};
