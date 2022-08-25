import React from "react";
import NavigationBar from "./NavigationBar";
import { Container } from "@mui/material";

export default function Wrapper({ children }) {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container maxWidth="md">{children}</Container>
    </React.Fragment>
  );
}
