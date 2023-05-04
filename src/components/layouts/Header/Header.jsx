import React, { useEffect } from "react";
import { HeaderStyles } from "./styled";
import { Link } from "react-router-dom";

function Header({ btnNameLogin, btnNameSign, admin, setAdmin }) {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser) {
      setAdmin(loggedInUser);
    }
  }, []);

  const handleClick = () => {
    setAdmin(!admin);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <HeaderStyles>
      <div className="container">
        <div class="row align-items-center text-center">
          <div className="col-sm-6 col-lg-10 d-flex align-items-center justify-content-end">

            {(!admin && (
              <>
                <button type="button" class="btn btn-outline-light mx-4">
                  <Link to={"/sign_in/"}>{btnNameLogin}</Link>
                </button>
                <button type="button" class="btn btn-warning mx-4">
                  <Link to={"/sign_up"}>{btnNameSign}</Link>
                </button>
              </>
            )) || (
              <>
                <Link to={"/"}>
                  <button
                    type="button"
                    class="btn btn-warning mx-4"
                    onClick={handleClick}
                  >
                    Выйти
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
}

export default Header;
