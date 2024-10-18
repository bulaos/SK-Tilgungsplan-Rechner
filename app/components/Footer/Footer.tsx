"use client";
import { Box, Link, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#292929",
        padding: "20px 0",
        textAlign: "center",
        mt: 4,
      }}
    >
      <Typography variant="h6" component="div" color="white" gutterBottom>
        Services
      </Typography>
      <Box>
        <Link href="/loans" color="primary" underline="hover" sx={{ mx: 2 }}>
          Home
        </Link>
        <Link
          href="/repayment-plan"
          color="primary"
          underline="hover"
          sx={{ mx: 2 }}
        >
          Tilgungsplanrechner
        </Link>
        <Link
          href="/investment"
          color="primary"
          underline="hover"
          sx={{ mx: 2 }}
        >
          Sparplan
        </Link>
      </Box>
      <Typography variant="body2" color="white" sx={{ mt: 3 }}>
        &copy; {new Date().getFullYear()} Sparkasse.de
      </Typography>
    </Box>
  );
};
