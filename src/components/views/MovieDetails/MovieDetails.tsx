import { useEffect, useState } from "react";
import { searchMovie } from "../../../services/movieService";
import {
  Box,
  CircularProgress,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import { darkSlate, tonedDownYellow, yellow } from "../../../shared/colors";
import { useNavigate, useParams } from "react-router-dom";

export function MovieCard({ movie, goToMovie }: any) {
  return (
    <Grid2
      sx={{
        height: "300px",
        maxWidth: "180px",
        background: darkSlate,
        marginX: "10px",
        marginBottom: "20px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        border: `1px solid ${tonedDownYellow}`,
        "&:hover": {
          transform: "scale(1.2)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s ease",
        },
      }}
    >
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: yellow,
              lineHeight: "1em",
              maxHeight: "2em",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {movie.title ?? ""}
          </Typography>
        </Box>
      </Box>
    </Grid2>
  );
}

export default function MovieDetails() {
  const [movie, setMovie] = useState<any>([]);
  const [backgroundImage, setBackgroundImage] = useState<Blob>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const goToMovie = (movieId: number): void => {
    navigate(`/movie/${movieId}`);
  };

  const fetchMovieDetails = async () => {
    const response = await searchMovie(null, id);
    if (response) {
      setMovie(response.movies[0]);
      setBackgroundImage(response.movies[0].backdrop);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
    <Grid2
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
      }}
    >
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
        <Grid2>
          <Grid2
            component={"img"}
            src={
              backgroundImage ? URL.createObjectURL(backgroundImage) : undefined
            }
            sx={{
              zIndex: 1,
              width: "1200px",
              height: "400px",
              objectFit: "cover",
              objectPosition: "0% 50%",
              filter: "brightness(40%) blur(30px)",
              display: backgroundImage ? "block" : "none",
            }}
          />
          <Grid2
            container={true}
            sx={{
              zIndex: 2,
              position: "absolute",
              height: "400px",
              width: "100%",
              top: "40px",
              left: "40px",
            }}
          >
            <Box
              sx={{
                width: "280px",
                height: "400px",
                cursor: "pointer",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
              }}
              component={"img"}
              src={
                movie?.poster ? URL.createObjectURL(movie.poster) : undefined
              }
            />
          </Grid2>
          <Grid2
            sx={{
              zIndex: 3,
              position: "absolute",
              height: "400px",
              width: "760px",
              top: "40px",
              left: "400px",
            }}
          >
            <Grid2 size={12}>
              <Typography
                sx={{
                  color: yellow,
                  fontFamily: "Helvetica",
                  fontSize: "40px",
                  fontWeight: "bold",
                  textShadow: "1px 1px 5px black",
                }}
              >
                {movie?.title ?? ""}
              </Typography>
            </Grid2>
            <Grid2
              size={12}
              sx={{
                background: yellow,
                width: "100%",
                height: "5px",
                borderRadius: "2.5px",
                boxShadow: "1px 1px 5px black",
              }}
            />
            <Grid2 size={12} sx={{ marginTop: "20px" }}>
              <Typography
                sx={{
                  color: yellow,
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica",
                }}
              >
                {"Release date: " + movie?.release_date}
              </Typography>
            </Grid2>
            <Grid2 container={true} spacing={2} size={12}>
              <Typography
                sx={{
                  color: yellow,
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica",
                }}
              >
                {"Average rating:"}
              </Typography>
              <Rating
                name="read-only"
                precision={0.5}
                value={movie?.vote_average / 2}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: yellow,
                  },
                }}
              />
            </Grid2>
          </Grid2>
          <Grid2
            sx={{
              width: "100%",
              height: "calc(100dvh - 500px)",
              minHeight: "500px",
              zIndex: 3,
              background: yellow,
              paddingTop: "40px",
              paddingX: "40px",
            }}
          >
            <Grid2
              size={12}
              container={true}
              sx={{ width: "100%", justifyContent: "end" }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: "30px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica",
                }}
              >
                {movie?.tagline ? `"${movie?.tagline}"` : ""}
              </Typography>
            </Grid2>
            <Grid2
              size={12}
              sx={{
                background: "black",
                width: "100%",
                height: "5px",
                borderRadius: "2.5px",
              }}
            />
            <Grid2
              size={6}
              container={true}
              sx={{ width: "50%", marginTop: "30px", textAlign: "justify" }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica",
                }}
              >
                {movie?.overview ?? ""}
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
}
