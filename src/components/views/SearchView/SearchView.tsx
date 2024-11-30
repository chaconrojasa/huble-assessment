import { useEffect, useState } from "react";
import { searchMovie } from "../../../services/movieService";
import {
  Box,
  CircularProgress,
  Grid2,
  Pagination,
  Typography,
} from "@mui/material";
import { darkSlate, evenDarkerSlate, yellow } from "../../../shared/colors";
import { useNavigate } from "react-router-dom";
import LinkOffIcon from "@mui/icons-material/LinkOff";

export function MovieCard({ movie, goToMovie }: any) {
  return (
    <Grid2
      sx={{
        height: "300px",
        maxWidth: "180px",
        background: yellow,
        marginX: "10px",
        marginBottom: "20px",
        borderRadius: "10px",
        border: `1px solid ${yellow}`,
        "&:hover": {
          transform: "scale(1.2)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s ease",
        },
      }}
    >
      {movie.poster ? (
        <Box
          sx={{
            width: "180px",
            height: "238px",
            cursor: "pointer",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            "&:active": {
              filter: "brightness(130%)",
            },
          }}
          component={"img"}
          src={movie.poster ? URL.createObjectURL(movie.poster) : undefined}
          alt={"hi"}
          onClick={() => goToMovie(movie.id)}
        />
      ) : (
        <Grid2
          container={true}
          sx={{
            height: "238px",
            width: "100%",
            cursor: "pointer",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            background: darkSlate,
            "&:active": {
              filter: "brightness(130%)",
            },
          }}
          onClick={() => goToMovie(movie.id)}
        >
          <LinkOffIcon
            sx={{ color: yellow, height: "50px", width: "50px" }}
          ></LinkOffIcon>
        </Grid2>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "180px",
          height: "60px",
          paddingX: "10px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: darkSlate,
              lineHeight: "1em",
              maxHeight: "2em",
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontFamily: "Helvetica",
              fontWeight: "bold",
            }}
          >
            {movie.title}
          </Typography>
        </Box>
      </Box>
    </Grid2>
  );
}

export default function SearchView({ searchQuery, resetSearch }: any) {
  const [movieSearchResult, setMovieSearchResult] = useState<any>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<{
    currentPage: number;
    totalPages: number;
  }>({ currentPage: 1, totalPages: 0 });
  const navigate = useNavigate();

  const goToMovie = (movieId: number): void => {
    navigate(`/movie/${movieId}`);
  };

  const performSearch = async () => {
    searchMovie(debouncedQuery, null, pageInfo.currentPage).then((response) => {
      if (response) {
        setMovieSearchResult(response);
        setPageInfo((previousPageInfo) => ({
          ...previousPageInfo,
          totalPages: response.totalPages,
        }));
        setLoading(false);
      }
    });
  };

  const handlePageChange = (event: any, page: number) => {
    setPageInfo((previousPageInfo) => ({
      ...previousPageInfo,
      currentPage: page,
    }));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 350);

    if (searchQuery === "") {
      setMovieSearchResult([]);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      performSearch();
    }
  }, [debouncedQuery]);

  useEffect(() => {
    setLoading(true);
    searchMovie(debouncedQuery, null, pageInfo.currentPage).then((response) => {
      if (response) {
        setMovieSearchResult(response);
        setLoading(false);
      }
    });
  }, [pageInfo.currentPage]);

  useEffect(() => {
    resetSearch();
  }, []);

  return (
    <Grid2
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      <Grid2
        container={true}
        size={12}
        sx={{
          height: "80px",
          width: "100%",
          paddingTop: "20px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Helvetica",
            fontWeight: "light",
            fontSize: "40px",
            color: yellow,
            width: "50%",
            textShadow: "3px 3px 10px 0px black",
          }}
        >
          Results for: {debouncedQuery}
        </Typography>
      </Grid2>
      <Grid2
        size={12}
        sx={{
          background: yellow,
          width: "100%",
          height: "5px",
          borderRadius: "2.5px",
        }}
      />
      {loading ? (
        <Grid2
          sx={{
            width: "100px",
            margin: "0 auto",
            marginY: "49%",
          }}
        >
          <CircularProgress />
        </Grid2>
      ) : (
        <Grid2
          sx={{
            backgroundColor: evenDarkerSlate,
            paddingTop: "20px",
          }}
        >
          <Grid2
            container={true}
            size={12}
            sx={{
              width: "100%",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {movieSearchResult.movies?.map((movie: any, i: number) => (
              <MovieCard key={i} movie={movie} goToMovie={goToMovie} />
            ))}
          </Grid2>
          <Grid2
            sx={{
              width: "100%",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {movieSearchResult && movieSearchResult.totalPages > 1 && (
              <Pagination
                count={pageInfo.totalPages}
                color="primary"
                variant="outlined"
                page={pageInfo.currentPage}
                onChange={handlePageChange}
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: yellow,
                  },
                }}
              />
            )}
          </Grid2>
          <Box />
        </Grid2>
      )}
    </Grid2>
  );
}
