import { Box, Grid2, Typography } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import { RepaymentForm } from "../components/RepaymentForm/RepaymentForm";
import familyImage from "./assets/surface-OaD5um45Cik-unsplash.jpg";

export const metadata: Metadata = {
  title: "Tilgungsplan-Rechner",
};

export default function RepaymentPlan() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ px: { xs: 2, md: 0 } }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
          pt={2}
        >
          Tilgungsplanrechner
        </Typography>
        <Typography
          component="p"
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ maxWidth: "800px", margin: "0 auto", marginBottom: 4 }}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Typography>
        <Grid2
          container
          spacing={4}
          alignItems="center"
          sx={{ marginBottom: 4, maxWidth: "1200px" }}
        >
          <Image
            src={familyImage}
            alt="Mann mit seinen Kindern vor einem Tablet"
            width={500}
            height={300}
            style={{ width: "100%", height: "auto" }}
          />

          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
            sx={{ maxWidth: "90%", margin: "0 auto" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta.
          </Typography>
        </Grid2>
        <RepaymentForm />
      </Box>
    </>
  );
}
