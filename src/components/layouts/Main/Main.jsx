import React, { useEffect } from "react";
import { MainStyles, Title, SubTitle, BtnTitle } from "./styled";
import { Link } from "react-router-dom";

function Main({
  title,
  subtitle,
  btntext,
  setAdmin,
  admin,
  btnNameOfficers,
  btnNameCases,
}) {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser) {
      setAdmin(loggedInUser);
    }
  }, []);
  return (
    <MainStyles>
      <div className="container">
        <Title>{title}</Title>
        <SubTitle>Мы поможем найти ваш велосипед</SubTitle>

        {!admin && (
          <>
            <button
              type="button"
              className="btn btn-warning d-block m-auto mt-5"
            >
              <Link to={"/report/"}>
                <BtnTitle>{btntext}</BtnTitle>
              </Link>
            </button>
          </>
        )}

        {admin && (
          <div className="d-flex justify-content-center mt-5">
            <button type="button" className="btn btn-danger mx-4">
              <Link to={"/officers/"}>{btnNameOfficers}</Link>
            </button>
            <button type="button" className="btn btn-danger mx-4">
              <Link to={"/cases/"}>{btnNameCases}</Link>
            </button>
          </div>
        )}
      </div>
    </MainStyles>
  );
}

export default Main;
