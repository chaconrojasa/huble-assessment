import { Box, Grid2 } from "@mui/material";
import { darkSlate, evenDarkerSlate } from "../../shared/colors";
import { heightAfterNavbar } from "../../styles/constants";

export default function MainArea(props: any) {
  return (
    <Box
      sx={{
        width: "100dvw",
        minHeight: heightAfterNavbar,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        backgroundColor: darkSlate,
      }}
    >
      <Grid2
        sx={{
          maxWidth: "100dvw",
          minHeight: heightAfterNavbar,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid2
          sx={{
            width: "1200px",
            height: "100%",
            justifyContent: "center",
            backgroundColor: evenDarkerSlate,
            bosizehadow: "0px 0px 10px 0px slategray",
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            flexGrow: 1,
          }}
        >
          {props.children}
        </Grid2>
      </Grid2>
    </Box>
  );
}
