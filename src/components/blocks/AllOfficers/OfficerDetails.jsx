import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { OfficerDetailStyles } from "./styled";
import { InputStyles, ButtonClose, LabelStyles } from "globalStyles";

function OfficerDetails({ detail, setDetail, info, allWorkers }) {
  const { id } = useParams();
  let officer = info.find(({ _id }) => _id === id);
  const [editMode, setEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setName] = useState(officer.firstName);
  const [lastName, setSurname] = useState(officer.lastName);
  const [approved, setApproved] = useState(officer.approved);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!editMode);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(!editMode);

    axios
      .put(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officer._id}`,
        {
          firstName: firstName,
          lastName: lastName,
          approved: approved,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        allWorkers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаляем сотрудника
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officer._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        allWorkers();
        setDetail(!detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <OfficerDetailStyles>
      <Link to={`/officers/`}>
        <ButtonClose
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => setDetail(!detail)}
        ></ButtonClose>
      </Link>

      <LabelStyles htmlFor="">Имя:</LabelStyles>
      <InputStyles
        onChange={(e) => setName(e.target.value)}
        disabled={!editMode ? true : false}
        type="text"
        value={firstName}
      />
      <LabelStyles htmlFor="">Фамилия:</LabelStyles>
      <InputStyles
        onChange={(e) => setSurname(e.target.value)}
        type="text"
        value={lastName}
        disabled={!editMode ? true : false}
      />
      <LabelStyles>Эл.почта:</LabelStyles>
      <InputStyles type="text" value={officer.email} disabled />
      <LabelStyles>Пароль:</LabelStyles>
      <InputStyles
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        disabled
      />
      <LabelStyles>Идент.номер:</LabelStyles>
      <InputStyles type="text" value={officer._id} disabled />
      <div>
        <LabelStyles>Одобрен</LabelStyles>
        <InputStyles
          type="checkbox"
          value={approved}
          disabled={!editMode ? true : false}
          checked={approved}
          onChange={() => setApproved(!approved)}
        />
      </div>
      <div className="d-flex justify-content-between">
        {(!editMode && (
          <button className="btn btn-light me-2" onClick={handleEdit}>
            редактировать
          </button>
        )) || (
          <button className="btn btn-light me-2" onClick={handleSubmit}>
            сохранить
          </button>
        )}
        <button className="btn btn-light" onClick={handleDelete}>
          удалить
        </button>
      </div>
    </OfficerDetailStyles>
  );
}

export default OfficerDetails;
