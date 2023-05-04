import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OfficerDetails from "./OfficerDetails";
import { OfficerDetailStyles, ListOfficer } from "./styled";
import {
  InputStyles,
  LabelStyles,
  FormStyles,
  ButtonClose,
} from "globalStyles";

function AllOfficers({ setApproved }) {
  //состояния для регистрации нового сотрудника
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [info, setInfo] = useState([]);
  const [newWorker, setNewWorker] = useState(false);
  const [detail, setDetail] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //загружаем список всех сотрудников
  const allWorkers = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    setInfo(result.data.officers);
    setApproved(result.data.officers);
  };

  useEffect(() => {
    allWorkers();
  }, [newWorker]);

  //добавляем нового сотрудника
  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeSurname = (e) => {
    setSurname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/officers",
        { email, password, firstName, lastName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setName("");
        setPassword("");
        setEmail("");
        setSurname("");
        setMessage("Сотрудник успешно зарегистрирован");
        allWorkers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdd = () => {
    setNewWorker(!newWorker);
  };
  const handleClose = () => {
    setNewWorker(!newWorker);
    setMessage("");
  };

  return (
    <FormStyles>
      <h2>Зарегистрированные сотрудники</h2>
      <Link to={"/"}>
        <ButtonClose
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
        ></ButtonClose>
      </Link>
      <div>
        <ListOfficer>
          {(loading && (
            <p className="fw-bold fst-italic text-uppercase">
              данные загружаются...
            </p>
          )) ||
            info.map((worker) => (
              <div key={worker._id}>
                <Link
                  onClick={() => setDetail(!detail)}
                  className="link"
                  to={`/officers/${worker._id}`}
                >
                  <li className="list-group-item list-group-item-warning p-2 mt-1">
                    {worker.email}
                  </li>
                </Link>
              </div>
            ))}
        </ListOfficer>
        {(info.length === 0 && <div></div>) || (
          <button className="btn btn-outline-light" onClick={handleAdd}>
            Добавить сотрудника
          </button>
        )}
        {(newWorker && (
          <OfficerDetailStyles>
            <h2>Добавить сотрудника</h2>
            <form method="post" onSubmit={handleSubmit}>
              <div>
                <span
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {message}
                </span>
                <LabelStyles>E-mail </LabelStyles>
                <InputStyles
                  onChange={changeMail}
                  type="text"
                  name="email"
                  value={email}
                  required
                />

                <LabelStyles>Пароль</LabelStyles>
                <InputStyles
                  onChange={changePassword}
                  type="password"
                  name="пароль"
                  value={password}
                  required
                />

                <LabelStyles>Имя</LabelStyles>
                <InputStyles
                  onChange={changeName}
                  type="text"
                  name="имя"
                  value={firstName}
                />

                <LabelStyles>Фамилия</LabelStyles>
                <InputStyles
                  onChange={changeSurname}
                  type="text"
                  name="фамилия"
                  value={lastName}
                />
                <Link to={`/officers/`}>
                  <ButtonClose
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={handleClose}
                  ></ButtonClose>
                </Link>

                <button className="btn btn-outline-light d-block m-auto mt-3">
                  Добавить
                </button>
              </div>
            </form>
          </OfficerDetailStyles>
        )) ||
          (detail && (
            <OfficerDetails
              detail={detail}
              setDetail={setDetail}
              info={info}
              allWorkers={allWorkers}
            />
          )) ||
          null}
      </div>
    </FormStyles>
  );
}

export default AllOfficers;
