import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ReportDetailStyles, LabelStyles, TextareaStyles } from "./styled";
import { ButtonClose } from "globalStyles";

function ReportDetail({ cases, setDetail, detail, approved, setApproved }) {
  const { id } = useParams();
  let report = cases.find(({ _id }) => _id === id);
  const [editMode, setEdit] = useState(false);
  const [status, setStatus] = useState(report.status);
  const [licenseNumber, setLicenseNumber] = useState(report.licenseNumber);
  const [ownerFullName, setOwnerFullName] = useState(report.ownerFullName);
  const [type, setType] = useState(report.type);
  const [color, setColor] = useState(report.color);
  const [date, setDate] = useState(report.date);
  const [description, setDescription] = useState(report.description);
  const [officer, setOfficer] = useState(report.officer);
  const [resolution, setResolution] = useState(report.resolution);

  let listOfApproved = approved.filter((officer) => officer.approved === true);

  const allWorkers = async () => {
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setApproved(result.data.officers);
  };

  useEffect(() => {
    allWorkers();
  }, [editMode]);

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const handleOfficer = (e) => {
    const chosenId = e.target.value;
    const chosenPerson = approved.filter((p) => p._id === chosenId)[0];
    setOfficer(chosenPerson._id);
  };

  useEffect(() => {
    console.log(officer);
  }, [officer]);
  useEffect(() => {
    console.log(type);
  }, [type]);
  useEffect(() => {
    console.log(status);
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(!editMode);

    axios
      .put(
        `https://sf-final-project-be.herokuapp.com/api/cases/${report._id}`,
        {
          status,
          licenseNumber,
          ownerFullName,
          type,
          color,
          date,
          description,
          officer,
          resolution,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаляем заявку
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://sf-final-project-be.herokuapp.com/api/cases/${report._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setDetail(!detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ReportDetailStyles>
      <h2 className="my-4">Детали кражи</h2>
      <Link to={`/cases/`}>
        <ButtonClose
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => setDetail(!detail)}
        ></ButtonClose>
      </Link>
      <div class="row">
        <div class="col-md-6 d-flex flex-column align-items-center">
          <LabelStyles>
            Номер заявки
            <input type="text" value={report._id} disabled />
          </LabelStyles>
          <LabelStyles>
            Создано
            <input type="text" value={report.createdAt} disabled />
          </LabelStyles>
          <LabelStyles>
            Обновлено
            <input type="text" value={report.updatedAt} disabled />
          </LabelStyles>
          <LabelStyles>
            Сотрудник
            <select
              value={officer}
              onChange={handleOfficer}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
              disabled={!editMode ? true : false}
            >
              <option value="">{officer}</option>
              {listOfApproved.map((officer) => (
                <option key={officer._id} value={officer._id}>
                  {officer.firstName} {officer.lastName}
                </option>
              ))}
            </select>
          </LabelStyles>
          <LabelStyles>
            Статус
            <select
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={"default"}
              value={status}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
              disabled={!editMode ? true : false}
            >
              <option value="new">new</option>
              <option value="in_progress">in_progress</option>
              <option value="done">done</option>
            </select>
          </LabelStyles>
        </div>
        <div class="col-md-6 d-flex flex-column align-items-center">
          <LabelStyles>
            Имя владельца
            <input
              type="text"
              onChange={(e) => setOwnerFullName(e.target.value)}
              value={ownerFullName}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
              disabled={!editMode ? true : false}
            />
          </LabelStyles>

          <LabelStyles>
            Дата кражи
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
              disabled={!editMode ? true : false}
            />
          </LabelStyles>
          <LabelStyles>
            Номер велосипеда
            <input
              type="text"
              onChange={(e) => setLicenseNumber(e.target.value)}
              value={licenseNumber}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
              disabled={!editMode ? true : false}
            />
          </LabelStyles>
          <LabelStyles>
            Тип
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
              disabled={!editMode ? true : false}
            >
              <option value="sport">sport</option>
              <option value="general">general</option>
            </select>
          </LabelStyles>
          <LabelStyles>
            Цвет
            <input
              type="text"
              onChange={(e) => setColor(e.target.value)}
              value={color}
              disabled={!editMode ? true : false}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
            />
          </LabelStyles>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <LabelStyles>
          Описание
          <TextareaStyles
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{
              color: editMode && "black",
              backgroundColor: editMode && "white",
            }}
            disabled={!editMode ? true : false}
          />
        </LabelStyles>
        {status === "done" && (
          <LabelStyles>
            Решение
            <TextareaStyles
              onChange={(e) => setResolution(e.target.value)}
              type="text"
              value={resolution}
              style={{
                color: editMode && "black",
                backgroundColor: editMode && "white",
              }}
              disabled={!editMode ? true : false}
              required
            />
          </LabelStyles>
        )}
      </div>
      <div className="d-flex justify-content-evenly w-100 my-4">
        {(!editMode && (
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setEdit(!editMode)}
          >
            Редактировать
          </button>
        )) || (
          <div onClick={handleSubmit} className="btn btn-warning" role="button">
            Сохранить
          </div>
        )}
        <Link to={`/cases/`}>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Удалить
          </button>
        </Link>
      </div>
    </ReportDetailStyles>
  );
}

export default ReportDetail;
