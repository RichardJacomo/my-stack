import { Link, useNavigate } from "react-router-dom";
import { HeaderContent } from "../../../Styles/Header";

export const Header = () => {
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <HeaderContent>
        <h1 className="logo">MY STACK</h1>
        <Link
          onClick={() => clearLocalStorage()}
          className="button-logout"
          to="/"
        >
          Logout
        </Link>
      </HeaderContent>
    </>
  );
};
