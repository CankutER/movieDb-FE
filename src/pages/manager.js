import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogoutButton } from "../components/logout";
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
  const [isClicked, setIsClicked] = useState({});

  useEffect(() => {
    if (!loginInfo?.isLoggedIn) {
      navigate(`/`);
    } else if (loginInfo?.role !== "admin") {
      navigate(`/${loginInfo.role}`);
    }
  }, []);

  useEffect(() => {
    const warningTime = setTimeout(() => {
      setWarning("");
    }, 2000);
    return () => clearTimeout(warningTime);
  }, [warning]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleShowAddAudience = () => {
    setShowAddAudience(!showAddAudience);
    setFormState({});
    setIsClicked({ ...isClicked, addAudience: !isClicked.addAudience });
  };

  const handleShowDeleteAudience = () => {
    setShowDeleteAudience(!showDeleteAudience);
    setFormState({});
    setIsClicked({ ...isClicked, deleteAudience: !isClicked.deleteAudience });
  };

  const handleShowPlatform = () => {
    setShowUpdatePlatform(!showUpdatePlatform);
    setFormState({});
    setIsClicked({ ...isClicked, updatePlatform: !isClicked.updatePlatform });
  };

  const handleShowRatingsOfAudience = () => {
    setShowRatingsOfAudience(!showRatingsOfAudience);
    setRatingsOfAudience([]);
    setFormState({});
    setIsClicked({
      ...isClicked,
      ratingsOfAudienceButton: !isClicked.ratingsOfAudienceButton,
    });
  };

  const handleShowMoviesOfDirector = () => {
    setShowMoviesOfDirector(!showMoviesOfDirector);
    setIsClicked({
      ...isClicked,
      moviesOfDirector: !isClicked.moviesOfDirector,
    });
    setMoviesOfDirector([]);
    setFormState({});
  };

  const handleShowAverageRatingOfMovie = () => {
    setShowAverageRatingOfMovie(!showAverageRatingOfMovie);
    setFormState({});
    setIsClicked({
      ...isClicked,
      averageRatingOfMovieButton: !isClicked.averageRatingOfMovieButton,
    });
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
        .then((response) => {
          setWarning(response.data);
        })
        .catch((response) => {
          throw new Error(response.response.data);
        });

      setFormState({});
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setFormState({});
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleDeleteAudience = async (e) => {
    try {
      e.preventDefault();
      const id = formState.username;
      setIsLoading(true);
      const response = await axios
        .delete(`${API_URL}/deleteAudience/${id}`)
        .then((response) => {
          setWarning(response.data);
        })
        .catch((response) => {
          throw new Error(response.response.data);
        });
      setFormState({});
      setIsLoading(false);
    } catch (err) {
      setFormState({});
      setIsLoading(false);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleUpdatePlatformId = async (e) => {
    try {
      e.preventDefault();
      const id = formState.username;
      const platformId = formState.platformId;
      setIsLoading(true);
      const response = await axios
        .put(`${API_URL}/updatePlatform/${id}`, {
          platformId: platformId,
        })
        .then((response) => {
          setWarning(response.data);
        })
        .catch((response) => {
          throw new Error(response.response.data);
        });
      setFormState({});
      setIsLoading(false);
    } catch (err) {
      setFormState({});
      setIsLoading(false);
      setWarning(err.message);
      console.log(err.message);
    }
  };

  const handleFetchDirectors = async () => {
    try {
      setIsClicked({
        ...isClicked,
        showDirectorsButton: !isClicked.showDirectorsButton,
      });
      setIsLoading(true);
      const response = await axios
        .get(`${API_URL}/showDirectors`)
        .catch((response) => {
          throw new Error(response.response.data);
        });
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
      setFormState({});
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setFormState({});
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
      console.log("id", id);
      const response = await axios
        .get(`${API_URL}/showMovies?username=${id}`)
        .catch((response) => {
          throw new Error(response.response.data);
        });
      console.log("response bastirmaca ", response);
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
        <div>
          <button
            className={
              !isClicked.addAudience
                ? "btn btn-primary mx-auto"
                : "btn btn-secondary mx-auto"
            }
            onClick={handleShowAddAudience}
          >
            Add Audience
          </button>
          <button
            className={
              !isClicked.deleteAudience
                ? "btn btn-primary mx-auto"
                : "btn btn-secondary mx-auto"
            }
            onClick={handleShowDeleteAudience}
          >
            Delete Audience
          </button>
          <button
            className={
              !isClicked.updatePlatform
                ? "btn btn-primary mx-auto"
                : "btn btn-secondary mx-auto"
            }
            onClick={handleShowPlatform}
          >
            Update Platform Id
          </button>

          <button
            className={
              !isClicked.showDirectorsButton
                ? "btn btn-primary mx-auto"
                : "btn btn-secondary mx-auto"
            }
            onClick={handleFetchDirectors}
          >
            Show Directors
          </button>
          <button
            className={
              !isClicked.ratingsOfAudienceButton
                ? "btn btn-primary mx-auto"
                : "btn btn-secondary mx-auto"
            }
            onClick={handleShowRatingsOfAudience}
          >
            Show Ratings of a Audience
          </button>
          <button
            className={
              !isClicked.moviesOfDirector
                ? "btn btn-primary mx-auto"
                : "btn btn-secondary mx-auto"
            }
            onClick={handleShowMoviesOfDirector}
          >
            Show Movies of a Director
          </button>
          <button
            className={
              !isClicked.averageRatingOfMovieButton
                ? "btn btn-primary mx-auto"
                : "btn btn-secondary mx-auto"
            }
            onClick={handleShowAverageRatingOfMovie}
          >
            Show Average Rating of a Movie
          </button>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
      {showAddAudience && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>
            <h3>Add Audience</h3>
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
            <h3>Delete Audience</h3>
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
            <h3>Update Platform Id</h3>
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
          <>
            <h3>Show Directors</h3>
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
          </>
        ))}
      {showRatingsOfAudience && (
        <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
          <div>
            <div className="text-center warning-container text-danger">
              <span className="warning text-danger">{warning}</span>
            </div>
            <h3>Show Ratings of an Audience</h3>
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
            <h3>Show Movies of a Director</h3>
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
                    <p className="card-text">
                      <b>Movie Id: </b> {movie.movie_id}
                    </p>

                    <p className="card-text">
                      <b>Movie Name: </b>
                      {movie.movie_name}
                    </p>
                    <p className="card-text">
                      <b>Overall Rating: </b>
                      {movie.movie_overall_rating
                        ? movie.movie_overall_rating
                        : "no rating yet"}
                    </p>
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
            <h3>Show Average Rating of a Movie</h3>
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
                <p className="card-text">
                  <b>Movie Id: </b>
                  {averaRatingOfMovie.movie_id}
                </p>
                <p className="card-text">
                  <b>Movie Name: </b>
                  {averaRatingOfMovie.movie_name}
                </p>
                <p className="card-text">
                  <b>Average Rating: </b>
                  {averaRatingOfMovie.overall_rating
                    ? averaRatingOfMovie.overall_rating
                    : "This movie hasn't been rated yet"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
