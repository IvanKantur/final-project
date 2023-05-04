import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import ForAuth from "../Report/ReportForAuth";
import ReportDetail from "./ReportDetail";
import { FormStyles, ButtonClose } from "globalStyles";
import { ListMessages } from "./styled";

function Messages({ approved, setApproved }) {
  const [cases, setCases] = useState([]);
  const [detail, setDetail] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDetail = () => {
    setDetail(!detail);
  };
  const allMessages = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/cases/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    setCases(result.data.data);
  };

  useEffect(() => {
    allMessages();
  }, [detail, newMessage]);

  return (
    <FormStyles>
      <h2>Все сообщения о кражах</h2>
      {(loading && (
        <p className="fw-bold fst-italic text-uppercase">
          данные загружаются...
        </p>
      )) ||
        (cases.length === 0 && <div></div>) ||
        (newMessage && (
          <ForAuth
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            approved={approved}
            setApproved={setApproved}
          />
        ))}
      <ListMessages>
        {cases.map((item) => (
          <li
            key={item._id}
            className="list-group-item list-group-item-warning p-2 mb-3"
          >
            <Link onClick={handleDetail} to={`/cases/${item._id}`}>
              <div className="text-start">
                <span
                  className="badge me-2"
                  style={{
                    backgroundColor:
                      (item.status === "new" && "green") ||
                      (item.status === "in_progress" && "rgb(209, 130, 19)") ||
                      (item.status === "done" && "red"),
                  }}
                >
                  {item.status}
                </span>
                {item.ownerFullName}
              </div>
            </Link>
          </li>
        ))}
      </ListMessages>
      <button
        className="btn btn-outline-light mt-3"
        onClick={() => setNewMessage(!newMessage)}
      >
        Добавить сообщение
      </button>
      <Link to={"/"}>
        <ButtonClose
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
        ></ButtonClose>
      </Link>
      {detail && (
        <ReportDetail
          cases={cases}
          detail={detail}
          setDetail={setDetail}
          approved={approved}
          setApproved={setApproved}
        />
      )}
    </FormStyles>
  );
}

export default Messages;
