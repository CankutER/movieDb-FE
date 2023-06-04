import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const API_URL = "http://localhost:3000";
export function LoginPage() {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    console.log("BBBB ", loginInfo);
    setIsLoading(true);
    try {
      const resp = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (resp.ok) {
        const result = await resp.text();
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            isLoggedIn: true,
            username: formState.username,
            role: formState.role,
          })
        );
        console.log(result);
        navigate(`/${formState.role}`);
      } else {
        const failedResult = await resp.text();
        throw new Error(failedResult);
      }
    } catch (err) {
      setWarning(err.message);
      console.log(err.message);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (loginInfo?.isLoggedIn) {
      navigate(`/${loginInfo.role}`);
    }
  }, []);
  useEffect(() => {
    const warningTime = setTimeout(() => {
      setWarning("");
    }, 1500);
    return () => clearTimeout(warningTime);
  }, [warning]);
  return (
    <>
      <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
        <div className="text-center warning-container text-danger">
          <span className="warning text-danger">{warning}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formState.username || ""}
              onChange={handleChange}
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
              value={formState.password || ""}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Login As:
            </label>
            <select
              type="role"
              id="role"
              name="role"
              className="form-select"
              value={formState.role || ""}
              onChange={handleChange}
              required={true}
            >
              <option value={""} hidden disabled></option>
              <option value="admin">Admin</option>
              <option value="director">Director</option>
              <option value="audience">Audience</option>
            </select>
          </div>
          <button
            className={`btn btn-primary d-block mx-auto`}
            disabled={isLoading}
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}
