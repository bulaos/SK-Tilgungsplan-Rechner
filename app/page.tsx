import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import heroImage from "./heroImage.jpg";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: "2rem",
        }}
      >
        {/* Image */}
        <Image
          src={heroImage}
          alt="Group of young people working and laughing"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            textAlign: "center",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Der neue Tilgungsplanrechner
          </Typography>
          <Link href="/repayment-plan" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 8 }}
            >
              Mehr erfahren
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography
          fontWeight="bold"
          variant="h5"
          component="h2"
          color="textPrimary"
          gutterBottom
        >
          Der Tilgungsplanrechner der Sparkasse
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "800px", margin: "0 auto" }}
          color="textPrimary"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          facilisis, purus vitae vehicula vehicula, libero mauris auctor nisi,
          et vehicula dui lectus ut nulla. Vestibulum pharetra urna sit amet mi
          ultricies, eget fringilla purus vulputate. Tristique cursus vulputate
          viverra tempus cursus et vel torquent. Nec vel porttitor ex dapibus
          nisi. Metus inceptos praesent quam sagittis justo iaculis. Penatibus
          nullam pulvinar potenti sapien montes blandit rutrum. Habitant dictum
          fusce nulla gravida mattis congue. Ridiculus scelerisque suspendisse
          quis nunc tempor volutpat. Ridiculus dictum et quis sollicitudin
          tempor fusce etiam primis.
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "4rem" }}
      >
        <Link href="/repayment-plan">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 8 }}
            aria-label="Jetzt Berechnen"
          >
            Jetzt Berechnen
          </Button>
        </Link>
      </Box>
    </>
  );
}
