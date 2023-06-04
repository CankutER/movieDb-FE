import { useEffect, useState } from "react";
import { MovieTable } from "./movieTable";
export const API_URL = "http://localhost:3000";

export function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const handleListMovies = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${API_URL}/audience/listMovies`);
      if (resp.ok) {
        const result = await resp.json();
        console.log(result);
        if (!result.length) {
          throw new Error("No Movies to show currently");
        } else {
          setMovies(result);
        }
      } else {
        const failedResult = await resp.text();
        throw new Error(failedResult);
      }
    } catch (err) {
      console.log(err.message);
      setWarning(err.message);
    }
    setIsLoading(false);
  };
  const clearMovies = () => setMovies([]);
  useEffect(() => {
    const warningTime = setTimeout(() => {
      setWarning("");
    }, 1500);
    return () => clearTimeout(warningTime);
  }, [warning]);
  return (
    <div className="mb-5">
      <h2 className="text-center">List All the Movies</h2>
      <div className="text-center warning-container text-danger">
        <span className="warning text-danger">{warning}</span>
      </div>
      <button
        className={`btn btn-primary d-block mx-auto`}
        disabled={isLoading}
        onClick={handleListMovies}
      >
        List All Movies
      </button>
      {movies.length > 0 && (
        <MovieTable
          tableHeaders={[
            "movie_id",
            "movie_name",
            "lastName",
            "platform_name",
            "theatre_id",
            "time_slot",
            "predecessors",
          ]}
          movies={movies}
        ></MovieTable>
      )}

      {movies.length > 0 && (
        <button
          className="btn btn-secondary mx-auto d-block"
          onClick={clearMovies}
        >
          Clear Movies
        </button>
      )}
    </div>
  );
}
