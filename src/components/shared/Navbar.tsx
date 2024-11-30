import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { darkSlate, yellow } from "../../shared/colors";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  handleSearch: (query: string) => void;
  searchQuery: string;
}

export function Navbar({ handleSearch, searchQuery }: NavbarProps) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleSearchChange = (event: any) => {
    handleSearch(event.target.value);
  };

  return (
    <Grid2
      container={true}
      sx={{
        width: "100%",
        height: "96px",
        backgroundColor: darkSlate,
        justifyContent: "center",
      }}
    >
      <Grid2 container={true} sx={{ width: "1200px" }}>
        <Typography
          onClick={() => {
            navigate("/");
          }}
          sx={{
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: "60px",
            color: yellow,
            width: "35%",
            cursor: "pointer",
          }}
        >
          HubleMovies
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "65%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            variant="standard"
            placeholder="Search for movies"
            color="primary"
            value={searchQuery}
            autoComplete="off"
            focused
            autoFocus={true}
            onClick={handleSearchClick}
            onChange={handleSearchChange}
            sx={{ width: "100%", input: { color: yellow } }}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
}
