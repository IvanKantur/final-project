import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  FormStyles,
  LabelStyles,
  InputStyles,
  ButtonClose,
} from "globalStyles";
import { TextareaStyles } from "./styled";
import { Link } from "react-router-dom";

function Report() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleNumber = (e) => {
    setLicenseNumber(e.target.value);
  };
  const handleName = (e) => {
    setOwnerFullName(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleInfo = (e) => {
    setDescription(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://sf-final-project-be.herokuapp.com/api/public/report", {
        ownerFullName: ownerFullName,
        licenseNumber: licenseNumber,
        type: type,
        clientId: "65e80042-ad01-49a9-8424-c76102d545e6",
        color: color,
        date: date,
        description: description,
      })
      .then((res) => {
        setLicenseNumber("");
        setOwnerFullName("");
        setColor("");
        setType("");
        setDate("");
        setDescription("");
        setMessage("Заявка отправлена");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <FormStyles>
            <p>{message}</p>
            <h2>Сообщить о краже</h2>
            <LabelStyles>Номер лицензии* </LabelStyles>
            <InputStyles
              onChange={handleNumber}
              value={licenseNumber}
              type="text"
              required
            />
            <LabelStyles>ФИО клиента* </LabelStyles>
            <InputStyles
              onChange={handleName}
              value={ownerFullName}
              type="text"
              required
            />
            <LabelStyles>Цвет велосипеда </LabelStyles>
            <InputStyles onChange={handleColor} value={color} type="text" />
            <LabelStyles>Дата кражи</LabelStyles>
            <InputStyles onChange={handleDate} value={date} type="date" />
            <LabelStyles>Дополнительная информация</LabelStyles>
            <TextareaStyles
              onChange={handleInfo}
              value={description}
              type="text"
            />
            <LabelStyles>Тип велосипеда*</LabelStyles>
            <select onChange={handleType} value={type} required>
              <option value="">Выберите тип велосипеда</option>
              <option value="general">general</option>
              <option value="sport">sport</option>
            </select>

            <button className="btn btn-warning mt-3">Отправить</button>
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

export default Report;
