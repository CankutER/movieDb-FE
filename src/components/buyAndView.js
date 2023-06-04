import { useEffect, useState } from "react";
import { MovieTable } from "./movieTable";
export const API_URL = "http://localhost:3000";

export function BuyAndViewTickets() {
  const [prevMovies, setPrevMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [formState, setFormState] = useState({});
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleViewMovies = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${API_URL}/audience/viewTickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: JSON.parse(localStorage.getItem("loginInfo")).username,
          sessionId: formState.sessionId,
        }),
      });
      if (resp.ok) {
        const result = await resp.json();
        console.log(result);
        if (!(result.previouslyWatched.length || result.currentMovie)) {
          throw new Error("No Movies to show");
        } else {
          setPrevMovies(result.previouslyWatched);
          setCurrentMovie(result.currentMovie);
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
  const buyTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await fetch(`${API_URL}/audience/buyTicket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: JSON.parse(localStorage.getItem("loginInfo")).username,
          sessionId: formState.sessionId,
        }),
      });
      if (resp.ok) {
        const result = await resp.text();
        console.log(result);
      } else {
        const failedResult = await resp.text();
        throw new Error(failedResult);
      }
    } catch (err) {
      if (err.message.toLowerCase().includes("duplicate"))
        err.message = "You already bought the session";
      console.log(err.message);
      setWarning(err.message);
    }
    setIsLoading(false);
  };
  const clearMovies = () => {
    setPrevMovies([]);
    setCurrentMovie();
  };
  useEffect(() => {
    const warningTime = setTimeout(() => {
      setWarning("");
    }, 1500);
    return () => clearTimeout(warningTime);
  }, [warning]);
  return (
    <div>
      <h2 className="text-center">View Your Tickets and Buy a New One</h2>
      <div className="text-center warning-container text-danger">
        <span className="warning text-danger">{warning}</span>
      </div>
      <form className="mb-3" onSubmit={buyTicket}>
        <div className="mb-3">
          <label htmlFor="sessionId-viewTickets" className="form-label">
            Session ID; View Movies button will also reveal the session if valid
          </label>
          <input
            type="text"
            id="sessionId-viewTickets"
            name="sessionId"
            className="form-control"
            value={formState.sessionId || ""}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="d-flex justify-content-center gap-2">
          <button
            className={`btn btn-primary`}
            disabled={isLoading}
            onClick={handleViewMovies}
            type="button"
          >
            View Movies
          </button>
          <button
            className={`btn btn-primary`}
            type="submit"
            disabled={isLoading}
          >
            Buy Ticket
          </button>
        </div>
      </form>
      {currentMovie && (
        <>
          <h4 className="text-center">You are currently buying</h4>
          <MovieTable
            tableHeaders={[
              "movie_id",
              "movie_name",
              "session_id",
              "rating",
              "overall_rating",
            ]}
            movies={[currentMovie]}
          ></MovieTable>
        </>
      )}
      {prevMovies.length > 0 && (
        <>
          <h4 className="text-center">Previously Watched</h4>
          <MovieTable
            tableHeaders={[
              "movie_id",
              "movie_name",
              "session_id",
              "rating",
              "overall_rating",
            ]}
            movies={prevMovies}
          ></MovieTable>
        </>
      )}

      {(prevMovies.length > 0 || currentMovie) && (
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
