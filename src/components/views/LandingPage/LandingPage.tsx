import { useEffect, useRef, useState } from "react";
import { fetchPopularMovies } from "../../../services/movieService";
import { Box, Button, Grid2, Skeleton, Typography } from "@mui/material";
import { darkSlate, yellow } from "../../../shared/colors";
import { useNavigate } from "react-router-dom";

export function MovieCard({ movie, goToMovie }: any) {
  return (
    <Box
      sx={{
        width: "200px",
        height: "288px",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.2)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s ease",
        },
        "&:active": {
          filter: "brightness(130%)",
        },
      }}
      component={"img"}
      src={movie.poster ? URL.createObjectURL(movie.poster) : undefined}
      alt={"hi"}
      onClick={() => goToMovie(movie.id)}
    />
  );
}

export default function LandingPage({ resetSearch }: any) {
  const [popularMovies, setPopularMovies] = useState<any>([]);
  const [backgroundImage, setBackgroundImage] = useState<Blob>();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  let intervalId: NodeJS.Timeout;
  const navigate = useNavigate();

  const loadLandingPage = async () => {
    try {
      const popularMoviesResponse = await fetchPopularMovies();
      setPopularMovies(popularMoviesResponse);
      setBackgroundImage(
        popularMoviesResponse[Math.floor(Math.random() * 20)].backdrop
      );
    } catch (e) {
      throw new Error("Error fetching movies: " + e);
    }
  };

  const goToMovie = (movieId: number): void => {
    navigate(`/movie/${movieId}`);
  };

  const scrollAmount = 10;
  const scrollInterval = 10;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      intervalId = setInterval(scrollLeft, scrollInterval);
    } else if (direction === "right") {
      intervalId = setInterval(scrollRight, scrollInterval);
    }
    return () => clearInterval(intervalId);
  };

  const stopScrolling = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    loadLandingPage();
  }, []);

  useEffect(() => {
    resetSearch();
  }, []);

  return (
    <Grid2
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
      }}
    >
      <Grid2
        sx={{
          overflow: "hidden",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
        }}
      >
        <Grid2
          container={true}
          size={12}
          sx={{
            height: "80px",
            width: "100%",
            position: "absolute",
            zIndex: 2,
            alignContent: "center",
            paddingLeft: "40px",
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
              textShadow: "3px 3px 10px black",
            }}
          >
            Trending
          </Typography>
        </Grid2>
        <Grid2
          sx={{
            width: "100%",
            position: "absolute",
            height: "5px",
            paddingX: "40px",
            zIndex: 2,
            top: "80px",
          }}
        >
          <Grid2
            size={12}
            sx={{
              background: yellow,
              width: "100%",
              height: "5px",
              borderRadius: "2.5px",
              boxShadow: "3px 3px 10px black",
            }}
          />
        </Grid2>

        <Grid2
          component={"img"}
          src={
            backgroundImage ? URL.createObjectURL(backgroundImage) : undefined
          }
          sx={{
            zIndex: 1,
            width: "1200px",
            height: "600px",
            objectFit: "cover",
            objectPosition: "0% 50%",
            filter: "brightness(20%) blur(5px)",
          }}
        />

        <Grid2
          size={12}
          container={true}
          ref={carouselRef}
          sx={{
            position: "absolute",
            top: "40px",
            left: "0px",
            zIndex: 2,
            width: "100%",
            display: "flex",
            flexWrap: "nowrap",
            height: "350px",
            alignItems: "center",
            overflowX: "auto",
            marginTop: "50px",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {popularMovies.map((movie: any, i: number) => (
            <MovieCard key={i} movie={movie} goToMovie={goToMovie} />
          ))}
        </Grid2>
      </Grid2>
      <Button
        onMouseDown={() => handleScroll("left")}
        onMouseUp={() => stopScrolling()}
        sx={{
          position: "absolute",
          top: "265px",
          left: "0px",
          transform: "translateY(-50%)",
          borderLeft: `1px solid ${yellow}`,
          zIndex: 3,
          height: "288px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
          opacity: 0,
          "&:hover": {
            opacity: 1,
            transition: "opacity 0.3s ease",
          },
        }}
      >
        {"<"}
      </Button>
      <Button
        onMouseDown={() => handleScroll("right")}
        onMouseUp={() => stopScrolling()}
        sx={{
          position: "absolute",
          right: "0px",
          top: "265px",
          borderRight: `1px solid ${yellow}`,
          height: "288px",
          transform: "translateY(-50%)",
          zIndex: 3,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
          opacity: 0,
          "&:hover": {
            opacity: 1,
            transition: "opacity 0.3s ease",
          },
        }}
      >
        {">"}
      </Button>

      <Grid2
        size={12}
        sx={{
          width: "100%",
          height: "auto",
          minHeight: "730px",
          position: "absolute",
          zIndex: 3,
          top: "500px",
          left: "0px",
          background: yellow,
        }}
      >
        <Grid2
          container={true}
          size={12}
          sx={{
            height: "80px",
            width: "100%",
            zIndex: 2,
            alignContent: "center",
            paddingLeft: "20px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Helvetica",
              fontWeight: "light",
              fontSize: "30px",
              color: darkSlate,
              width: "50%",
            }}
          >
            Explore
          </Typography>
        </Grid2>
        <Grid2
          size={12}
          sx={{
            width: "100%",
            position: "absolute",
            height: "5px",
            paddingX: "20px",
            zIndex: 2,
            top: "70px",
          }}
        >
          <Grid2
            size={12}
            sx={{
              background: darkSlate,
              width: "100%",
              height: "5px",
              borderRadius: "2.5px",
            }}
          />
        </Grid2>
        <Grid2
          container={true}
          spacing={4}
          size={12}
          sx={{ justifyContent: "center", marginTop: "20px" }}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation={false}
              sx={{ width: "200px", height: "288px" }}
            />
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
