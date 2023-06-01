import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    setIsLoading(true);
    const resp = await fetch("");
    setIsLoading(false);
  };
  return (
    <>
      <div className="text-center warning-container">
        <span className="warning">{warning}</span>
      </div>
      <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
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
              <option value="manager">Manager</option>
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
