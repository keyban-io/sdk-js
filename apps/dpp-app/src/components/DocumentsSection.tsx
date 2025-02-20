import React from "react";
import { Box, Typography, Link } from "@mui/material";

interface DocumentsSectionProps {
  documents: Array<{ title: string; url: string }>;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => (
  <Box sx={{ mt: 2, width: "100%" }}>
    {documents.map((doc, idx) => (
      <Box
        key={idx}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {doc.title}
        </Typography>
        <Link href={doc.url} target="_blank" rel="noopener" variant="body2">
          Ouvrir
        </Link>
      </Box>
    ))}
  </Box>
);

export default DocumentsSection;
