import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import SearchView from "./components/views/SearchView/SearchView";
import { Navbar } from "./components/shared/Navbar";
import MainArea from "./components/shared/MainArea";
import { useState } from "react";
import MovieDetails from "./components/views/MovieDetails/MovieDetails";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const resetSearch = () => {
    setSearchQuery("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar handleSearch={handleSearch} searchQuery={searchQuery} />
        <MainArea>
          <Routes>
            <Route
              path="/"
              element={<LandingPage resetSearch={resetSearch} />}
            />
            <Route
              path="/search"
              element={
                <SearchView
                  searchQuery={searchQuery}
                  resetSearch={resetSearch}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MainArea>
      </Box>
    </ThemeProvider>
  );
}

export default App;
