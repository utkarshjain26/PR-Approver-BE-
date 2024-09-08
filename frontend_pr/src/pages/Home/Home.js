import React from "react";
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
const Home = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ width: "100%", height: "90vh", backgroundColor: "#24292e" }}>
      <Box
        sx={{
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" component="h2" color="white">
          Welcome to
        </Typography>
        <Typography variant="h1" component="h1" color="white">
          PR Approver
        </Typography>
        <Button
          disableElevation
          onClick={toggleDrawer(true)}
          variant="contained"
          sx={{
            padding:'10px 30px',
            marginTop: "2rem",
            borderRadius: "20px",
            backgroundColor: "#238636",
          }}
        >
          Open Drawer
        </Button>
      </Box>
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ height: 500, backgroundColor: "#24292e" }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" component="h4" color="white">
              About the Application
            </Typography>
            <Divider color="white" />
            <Box sx={{ padding: "4rem" }}>
              Content of the app to be provided Content of the app to be
              provided Content of the app to be provided Content of the app to
              be providedContent of the app to be providedContent of the app to
              be providedContent of the app to be providedContent of the app to
              be providedContent of the app to be providedContent of the app to
              be provided Content of the app to be providedContent of the app to
              be providedContent of the app to be provided Content of the app to
              be provided Content of the app to be providedvContent of the app
              to be providedContent of the app to be provided v v vvv v Content
              of the app to be provided Content of the app to be provided
              Content of the app to be providedContent of the app to be
              providedContent of the app to be providedContent of the app to be
              provided Content of the app to be provided Content of the app to
              be provided Content of the app to be providedvContent of the app
              to be providedContent of the app to be providedContent of the app
              to be providedContent of the app to be provided
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Home;
