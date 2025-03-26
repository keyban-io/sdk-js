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
  CircularProgress,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useKeybanAccount, useKeybanAccountNfts } from "@keyban/sdk-react";

// Ajout de la fonction de hachage sha256
async function hashSHA256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function ProductEntry() {
  const [account, accountError] = useKeybanAccount();
  const [nfts, nftsError] = useKeybanAccountNfts(account!, { first: 5 });

  const [serialNumber, setSerialNumber] = useState("");
  const [ean, setEan] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);

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
            const [scannedEan, scannedSerial] = text.split(",");
            setEan(scannedEan || "");
            setSerialNumber(scannedSerial || "");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Concaténer l'ean et le numéro de série pour créer le tppId
    const concatenated = ean + serialNumber;
    const tppId = await hashSHA256(concatenated);

    try {
      if (!account)
        throw new Error("You need to be logged in to claim this TPP");

      const { transactionHash } = await account.tppClaim(tppId);
      console.log("Transaction hash:", transactionHash);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de tppClaim", error);
      // ...gestion d'erreur éventuelle...
    }
  };

  let content;
  if (accountError) {
    content = <div>Error fetching account: {accountError.message}</div>;
  } else if (nftsError) {
    content = <div>Error fetching NFTs: {nftsError.message}</div>;
  } else if (!nfts) {
    content = (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  } else {
    content = (
      <Container disableGutters>
        {/* Définition des animations pour le scan */}
        <style>
          {`
            @keyframes pulse {
              0% { border-color: #3f51b5; }
              50% { border-color: #f50057; }
              100% { border-color: #3f51b5; }
            }
            @keyframes scanLine {
              0% { top: -50px; }
              100% { top: calc(100%); }
            }
          `}
        </style>
        <Card sx={{ mx: "auto", maxWidth: 600 }}>
          <CardContent>
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Ajouter un produit
              </Typography>
              {/* Message d'accueil et instructions pour la première utilisation */}
              {nfts.nodes.length === 0 && (
                <Typography variant="body1" gutterBottom>
                  Bienvenue sur votre espace produit. Vous n'avez pas encore de
                  produit associé à votre compte.
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                Pour ajouter un produit, vous pouvez soit remplir les
                informations manuellement ci-dessous, soit utiliser la caméra
                pour scanner le code QR de votre produit.
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="EAN"
                  value={ean}
                  onChange={(e) => setEan(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Numéro de série"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
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
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "environment" }}
                      mirrored={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Overlay du balayage vertical avec message d'instruction */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        width: "100%",
                        height: "50px",
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
                        animation: "scanLine 2s linear infinite",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        position: "absolute",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      Placez le code QR dans le cadre
                    </Typography>
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
                      aria-label="Arrêter le scan"
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
                    aria-label="Activer la caméra pour scanner le produit"
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

  return content;
}
