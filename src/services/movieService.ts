import { tmdbConfig, tmdbToken } from "../config/tmdbConfig";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  poster: Blob | undefined;
  backdrop: Blob | undefined;
};

async function fetchMovieImages(movies: Movie[]): Promise<Movie[]> {
  const posterRequests = movies.map((movie) =>
    movie.poster_path
      ? fetch(
          `${tmdbConfig.images.base_url}${tmdbConfig.images.poster_sizes[3]}${movie.poster_path}`
        ).then((response) => response.blob().catch(() => undefined))
      : Promise.resolve(undefined)
  );

  const backdropRequests = movies.map((movie) =>
    movie.backdrop_path
      ? fetch(
          `${tmdbConfig.images.base_url}${tmdbConfig.images.backdrop_sizes[2]}${movie.backdrop_path}`
        ).then((response) => response.blob().catch(() => undefined))
      : Promise.resolve(undefined)
  );

  const parsedImages = await Promise.all(posterRequests);
  const parsedBackdrops = await Promise.all(backdropRequests);

  return movies.map((movie, index) => ({
    ...movie,
    poster: parsedImages[index],
    backdrop: parsedBackdrops[index],
  }));
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const url: string =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbToken}`,
    },
  };

  try {
    const response: Response = await fetch(url, options);
    const popularMovies: { results: Movie[] } = await response.json();

    const moviesWithPostersAndBackdrops = await fetchMovieImages(
      popularMovies.results
    );

    return moviesWithPostersAndBackdrops;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export async function searchMovie(
  query: string | null,
  id?: string | null,
  page?: number | null
): Promise<{ movies: Movie[]; totalPages: number }> {
  if (query === "") {
    return { movies: [], totalPages: 0 };
  }

  const url: string = `https://api.themoviedb.org/3/${
    query ? "search/movie?query=" + query + `&page=${page}` : "movie/" + id
  }`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbToken}`,
    },
  };

  try {
    const response: Response = await fetch(url, options);
    let searchResults = await response.json();

    const { total_pages: totalPages } = searchResults;

    searchResults = searchResults.results
      ? searchResults.results
      : [searchResults];

    const moviesWithPostersAndBackdrops = await fetchMovieImages(searchResults);
    return {
      movies: moviesWithPostersAndBackdrops,
      totalPages,
    };
  } catch (error) {
    throw error;
  }
}
