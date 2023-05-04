import React from "react";
import { Link } from "react-router-dom";
import { NotFoundStyles } from "./styled";

function NotFound() {
  return (
    <>
      <NotFoundStyles>
        <p className="fs-1">Извините, такой страницы не существует</p>
        <Link to={"/"}>
          <div className="btn btn-warning mt-5">
            Вернуться на главную страницу
          </div>
        </Link>
      </NotFoundStyles>
    </>
  );
}

export default NotFound;
