import React from "react";
import {
  FormStyles,
  LabelStyles,
  InputStyles,
  ButtonClose,
} from "globalStyles";
import { Link } from "react-router-dom";

function Auth({
  password,
  setPassword,
  email,
  setEmail,
  message,
  handleSubmit,
}) {
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <FormStyles>
            <h2>Авторизация</h2>
            <LabelStyles>E-mail</LabelStyles>
            <InputStyles
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
            />
            <LabelStyles>Password</LabelStyles>
            <InputStyles
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-warning mt-3">Авторизоваться</button>
            <Link to={"/"}>
              <ButtonClose
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
              ></ButtonClose>
            </Link>
            <p>{message}</p>
          </FormStyles>
        </form>
      </div>
    </>
  );
}

export default Auth;
