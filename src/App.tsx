import React from "react";

import { Box, Typography } from "@mui/material";

import Form from "./Form";

function App() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1">Dish</Typography>
        <Form />
      </Box>
    </Box>
  );
}

export default App;
