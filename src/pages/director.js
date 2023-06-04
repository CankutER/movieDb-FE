import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const API_URL = "http://localhost:3000/director";

export function DirectorPage() {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [formState, setFormState] = useState({});

  useEffect(() => {
    console.log("AAA ", loginInfo);
    if (!loginInfo?.isLoggedIn) {
      navigate(`/`);
    } else if (loginInfo?.role !== "director") {
      navigate(`/${loginInfo.role}`);
    }
  }, []);

  useEffect(() => {
    const warningTime = setTimeout(() => {
      setWarning("");
    }, 1500);
    return () => clearTimeout(warningTime);
  }, [warning]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleAddMovie = async (e) => {
    try {
      e.preventDefault();
      console.log("BBBBBB ", formState);
      setIsLoading(true);
      const response = await axios
        .post(`${API_URL}/addMovie`, {
          username: loginInfo.username,
          movieId: formState.movie_id,
          movieName: formState.movie_name,
          theatreId: formState.theatre_id,
          timeSlot: formState.time_slot,
          duration: formState.duration,
          date: formState.date,
        })
        .catch((response) => {
          throw new Error(response.response.data);
        });
      console.log("add movie ", response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  return (
    <div>
      <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
        <div>
          <div className="text-center warning-container text-danger">
            <span className="warning text-danger">{warning}</span>
          </div>

          <form onSubmit={handleAddMovie}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Movie Id
              </label>
              <input
                type="text"
                id="movie_id"
                name="movie_id"
                className="form-control"
                onChange={handleChange}
                value={formState.movie_id || ""}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Movie Name
              </label>
              <input
                type="text"
                id="movie_name"
                name="movie_name"
                className="form-control"
                onChange={handleChange}
                value={formState.movie_name || ""}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Theatre Id
              </label>
              <input
                type="text"
                id="theatre_id"
                name="theatre_id"
                className="form-control"
                onChange={handleChange}
                value={formState.theatre_id || ""}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Time Slot
              </label>
              <input
                type="text"
                id="time_slot"
                name="time_slot"
                className="form-control"
                onChange={handleChange}
                value={formState.time_slot || ""}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                className="form-control"
                onChange={handleChange}
                value={formState.duration || ""}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                onChange={handleChange}
                value={formState.date || ""}
                required={true}
              />
            </div>
            <button
              className={`btn btn-primary d-block mx-auto`}
              disabled={isLoading}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
