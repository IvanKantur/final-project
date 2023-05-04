import React from "react";
import { useState } from "react";
import {
  FormStyles,
  LabelStyles,
  InputStyles,
  ButtonClose,
} from "globalStyles";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "65e80042-ad01-49a9-8424-c76102d545e6") {
      setMessage("Введите валидный Id Client");
    }
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/auth/sign_up",
        { email, password, firstName, lastName, clientId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setClientId("");
          setMessage("Поздравлем! Вы зарегистрированы!");

          setTimeout(() => {
            window.location.replace("/sign_in/");
          }, 2000);
        },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      )
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setFirstName(e.target.value);
  };
  const changeSurname = (e) => {
    setLastName(e.target.value);
  };
  const changeId = (e) => {
    setClientId(e.target.value);
  };
  return (
    <>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <FormStyles>
            <h2>Регистрация</h2>
            <LabelStyles>
              E-mail*
              <InputStyles
                onChange={changeMail}
                type="text"
                name="email"
                value={email}
                required
              />
            </LabelStyles>
            <LabelStyles>
              Пароль*
              <InputStyles
                onChange={changePassword}
                type="password"
                name="пароль"
                value={password}
                required
              />
            </LabelStyles>
            <LabelStyles>
              Имя
              <InputStyles
                onChange={changeName}
                type="text"
                name="имя"
                value={firstName}
              />
            </LabelStyles>
            <LabelStyles>
              Фамилия
              <InputStyles
                onChange={changeSurname}
                type="text"
                name="фамилия"
                value={lastName}
              />
            </LabelStyles>
            <LabelStyles>
              Client ID*
              <InputStyles
                onChange={changeId}
                type="text"
                placeholder="65e80042-ad01-49a9-8424-c76102d545e6"
                name="client id"
                value={clientId}
                required
              />
            </LabelStyles>
            <button className="btn btn-warning mt-3">Зарегистрироваться</button>
            <p>{message}</p>
            <Link to={"/"}>
              <ButtonClose
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
              ></ButtonClose>
            </Link>
          </FormStyles>
        </form>
      </div>
    </>
  );
}

export default SignUp;
