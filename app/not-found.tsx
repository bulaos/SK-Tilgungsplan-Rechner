import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        fontWeight="bold"
        color="textPrimary"
      >
        Ups!
      </Typography>
      <Typography variant="body1" mt={2} color="textPrimary">
        Diese Seite wurde leider nicht gefunden. Falls Sie diese in Zukunft
        finden möchten, dann können Sie das ändern.
      </Typography>
      <Box pt={1} display="flex" flexDirection="column" gap={2}>
        <Link href="https://www.linkedin.com/in/oseebulayumi/">
          <Button variant="contained" sx={{ borderRadius: 8 }}>
            Jetzt ändern
          </Button>
        </Link>
        <Link href="/repayment-plan">
          <Button variant="outlined" sx={{ borderRadius: 8 }}>
            Zum Tilgungsrechner
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
