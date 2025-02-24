import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductEntry() {
  const [serialNumber, setSerialNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Serial:", serialNumber, "Order:", orderNumber);
    navigate("/dashboard");
  };

  const captureAndScan = useCallback(() => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        const image = new Image();
        image.src = screenshot;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setScanError("Erreur lors de la création du contexte du canvas");
            setScanning(false);
            return;
          }
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            const text = code.data;
            console.log("Scanned:", text);
            const [scannedSerial, scannedOrder] = text.split(",");
            setSerialNumber(scannedSerial || "");
            setOrderNumber(scannedOrder || "");
            setScanning(false);
          }
        };
      }
    }
  }, []);

  useEffect(() => {
    let interval: number;
    if (scanning) {
      interval = window.setInterval(() => {
        captureAndScan();
      }, 1000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [scanning, captureAndScan]);

  return (
    <Container disableGutters>
      <Card sx={{ mx: "auto", maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Ajouter un produit
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Numéro de série"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Numéro de commande"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Soumettre
              </Button>
            </form>
            {scanError && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {scanError}
              </Typography>
            )}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 3,
                mt: 2,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {scanning ? (
                <Box
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      setScanning(false);
                      setScanError(null);
                    }}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "rgba(255,255,255,0.7)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  onClick={() => {
                    setScanning(true);
                    setScanError(null);
                  }}
                  sx={{
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    minWidth: 0,
                  }}
                >
                  <CameraAltIcon fontSize="large" />
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
