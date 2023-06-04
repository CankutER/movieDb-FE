import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const API_URL = "http://localhost:3000/manager";

export function ManagerPage() {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [formState, setFormState] = useState({});
  const [showAddAudience, setShowAddAudience] = useState(false);
  const [showDeleteAudience, setShowDeleteAudience] = useState(false);
  const [showUpdatePlatform, setShowUpdatePlatform] = useState(false);
  const [showDirectors, setShowDirectors] = useState(false);
  const [allDirectors, setAllDirectors] = useState([]);
  const [ratingsOfAudience, setRatingsOfAudience] = useState([]);
  const [showRatingsOfAudience, setShowRatingsOfAudience] = useState(false);
  const [moviesOfDirector, setMoviesOfDirector] = useState([]);
  const [showMoviesOfDirector, setShowMoviesOfDirector] = useState(false);
  const [averaRatingOfMovie, setAveraRatingOfMovie] = useState({});
  const [showAverageRatingOfMovie, setShowAverageRatingOfMovie] =
    useState(false);

  useEffect(() => {
    console.log("AAA ", loginInfo);
    if (!loginInfo?.isLoggedIn) {
      navigate(`/`);
    } else if (loginInfo?.role !== "admin") {
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

  const handleShowAddAudience = () => {
    setShowAddAudience(!showAddAudience);
  };

  const handleShowDeleteAudience = () => {
    setShowDeleteAudience(!showDeleteAudience);
  };

  const handleShowPlatform = () => {
    setShowUpdatePlatform(!showUpdatePlatform);
  };

  const handleShowRatingsOfAudience = () => {
    setShowRatingsOfAudience(!showRatingsOfAudience);
  };

  const handleShowMoviesOfDirector = () => {
    setShowMoviesOfDirector(!showMoviesOfDirector);
  };

  const handleShowAverageRatingOfMovie = () => {
    setShowAverageRatingOfMovie(!showAverageRatingOfMovie);
  };
  const handleAddAudience = async (e) => {
    try {
      e.preventDefault();
      console.log("BBBBBB ", formState);
      setIsLoading(true);
      const response = await axios
        .post(`${API_URL}/addAudience`, {
          username: formState.username,
          passwrd: formState.password,
          fName: formState.firstName,
          lName: formState.lastName,
        })
        .catch((response) => {
          throw new Error(response.response.data);
        });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleDeleteAudience = async (e) => {
    try {
      e.preventDefault();
      console.log("BBBBBB ", formState.username);
      const id = formState.username;
      setIsLoading(true);
      const response = await axios
        .delete(`${API_URL}/deleteAudience/${id}`)
        .catch((response) => {
          throw new Error(response.response.data);
        });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleUpdatePlatformId = async (e) => {
    try {
      e.preventDefault();
      console.log("BBBBBB ", formState.username);
      const id = formState.username;
      const platformId = formState.platformId;
      setIsLoading(true);
      const response = await axios
        .put(`${API_URL}/updatePlatform/${id}`, {
          platformId: platformId,
        })
        .catch((response) => {
          throw new Error(response.response.data);
        });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleFetchDirectors = async () => {
    try {
      setIsLoading(true);
      const response = await axios
        .get(`${API_URL}/showDirectors`)
        .catch((response) => {
          throw new Error(response.response.data);
        });
      console.log("direktorlerr ", response.data);
      setAllDirectors(response.data);
      setIsLoading(false);
      setShowDirectors(!showDirectors);
    } catch (err) {
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleRatingsOfAudience = async (e) => {
    try {
      e.preventDefault();
      const id = formState.username;
      setIsLoading(true);
      const response = await axios
        .get(`${API_URL}/showRatings?username=${id}`)
        .catch((response) => {
          throw new Error(response.response.data);
        });

      setRatingsOfAudience(response.data);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setRatingsOfAudience([]);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleMoviesOfDirector = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const id = formState.username;
      const response = await axios
        .get(`${API_URL}/showMovies?username=${id}`)
        .catch((response) => {
          throw new Error(response.response.data);
        });

      setMoviesOfDirector(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setMoviesOfDirector([]);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleAverageRatingOfMovie = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const id = formState.movieId;
      const response = await axios
        .get(`${API_URL}/showAvgRating?movieId=${id}`)
        .catch((response) => {
          throw new Error(response.response.data);
        });
      setAveraRatingOfMovie(response.data);
      console.log("average rating", response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setAveraRatingOfMovie({});
      setWarning(err.message);
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className={`d-flex`}>
        <button
          className={`btn btn-primary mx-auto`}
          onClick={handleShowAddAudience}
        >
          Add Audience
        </button>
        <button
          className={`btn btn-primary mx-auto`}
          onClick={handleShowDeleteAudience}
        >
          Delete Audience
        </button>
        <button
          className={`btn btn-primary mx-auto`}
          onClick={handleShowPlatform}
        >
          Update Platform Id
        </button>
        <button
          className={`btn btn-primary mx-auto`}
          onClick={handleFetchDirectors}
        >
          Show Directors
        </button>
        <button
          className={`btn btn-primary mx-auto`}
          onClick={handleShowRatingsOfAudience}
        >
          Show Ratings of a Audience
        </button>
        <button
          className={`btn btn-primary mx-auto`}
          onClick={handleShowMoviesOfDirector}
        >
          Show Movies of a Director
        </button>
        <button
          className={`btn btn-primary mx-auto`}
          onClick={handleShowAverageRatingOfMovie}
        >
          Show Average Rating of a Movie
        </button>
      </div>
      {showAddAudience && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>

            <form onSubmit={handleAddAudience}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.username || ""}
                  required={true}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.password || ""}
                  required={true}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="firstName"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.firstName || ""}
                  required={true}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="lastName"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.lastName || ""}
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
      )}
      {showDeleteAudience && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>

            <form onSubmit={handleDeleteAudience}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Audience username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.username || ""}
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
      )}
      {showUpdatePlatform && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>

            <form onSubmit={handleUpdatePlatformId}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Director username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.username || ""}
                  required={true}
                />
                <label htmlFor="username" className="form-label">
                  Platform Id
                </label>
                <input
                  type="text"
                  id="platfornId"
                  name="platformId"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.platformId || ""}
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
      )}
      {showDirectors &&
        allDirectors?.map((director, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">username: {director.username}</h5>
              <p className="card-text">
                name: {director.firstName} {director.lastName}
              </p>
              <p className="card-text">nation: {director.nation}</p>
              <p className="card-text">platform Id: {director.platform_id}</p>
            </div>
          </div>
        ))}
      {showRatingsOfAudience && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>

            <form onSubmit={handleRatingsOfAudience}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Audience username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.username || ""}
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
            <div>
              {ratingsOfAudience?.map((rating, index) => (
                <div className="card" key={index}>
                  <div className="card-body">
                    <p className="card-text">{rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {showMoviesOfDirector && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>

            <form onSubmit={handleMoviesOfDirector}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Director username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.username || ""}
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
            <div>
              {moviesOfDirector?.map((movie, index) => (
                <div className="card" key={index}>
                  <div className="card-body">
                    <p className="card-text">{movie.id}</p>
                    <p className="card-text">{movie.name}</p>
                    <p className="card-text">{movie.overall_rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {showAverageRatingOfMovie && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>

            <form onSubmit={handleAverageRatingOfMovie}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Movie Id
                </label>
                <input
                  type="text"
                  id="movieId"
                  name="movieId"
                  className="form-control"
                  onChange={handleChange}
                  value={formState.movieId || ""}
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

            <div className="card">
              <div className="card-body">
                <p className="card-text">{averaRatingOfMovie.movie_id}</p>
                <p className="card-text">{averaRatingOfMovie.movie_name}</p>
                <p className="card-text">{averaRatingOfMovie.overall_rating}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
