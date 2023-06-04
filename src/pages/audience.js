import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListMovies } from "../components/listMovies";
import { BuyAndViewTickets } from "../components/buyAndView";
import { LogoutButton } from "../components/logout";
export function AudiencePage() {
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  useEffect(() => {
    if (!(loginInfo?.isLoggedIn && loginInfo?.role === "audience")) {
      navigate(`/`);
    }
  }, []);
  return (
    <section className="d-grid min-vh-100 vw-100 justify-content-center align-content-center">
      <ListMovies></ListMovies>
      <BuyAndViewTickets></BuyAndViewTickets>
      <LogoutButton></LogoutButton>
    </section>
  );
}
