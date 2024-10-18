"use client";

import { ArrowUpward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const BackToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const oldScrollYRef = useRef(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const footer = document.querySelector("footer");
    const footerHeight = footer?.clientHeight || 0;

    const controlDirection = () => {
      const almostBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - (footerHeight + 200);

      if (document.body.offsetHeight < 2000) {
        setShowScrollButton(false);
      } else if (almostBottom) {
        setShowScrollButton(true);
      } else if (
        window.scrollY > 200 &&
        window.scrollY < oldScrollYRef.current
      ) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }

      oldScrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", controlDirection);
    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        display: showScrollButton ? "block" : "none",
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={scrollToTop}
        sx={{
          backgroundColor: "#f5f5f5",
          "&:hover": { backgroundColor: "#e0e0e0" },
          boxShadow: 2,
        }}
      >
        <ArrowUpward fontSize="medium" />
      </IconButton>
    </Box>
  );
};
