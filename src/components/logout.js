import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("loginInfo");
    navigate("/");
  };
  return (
    <button
      onClick={logOut}
      className="btn btn-primary d-block position-absolute top-0 end-0 mt-6 me-3"
    >
      Logout
    </button>
  );
}
