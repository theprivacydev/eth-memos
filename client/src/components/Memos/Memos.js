import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import API from "../../utils/API";
import { useNavigate, useLocation } from "react-router-dom";
import "./Memos.css";
import ReactSpinner from "../ReactSpinner/ReactSpinner";

function Memos({ setCurrentMemoInfo }) {
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    API.Get("/api/memos").then((response) => {
      setMemos(response.data.reverse());
      setIsLoading(false);
    });
  }, []);

  const memoList = memos.map((memo, index) => {
    return (
      <ListGroupItem
        onClick={() => {
          if (location.pathname === "/edit") {
            setCurrentMemoInfo({
              id: memo["_id"],
              title: memo.title,
              content: memo.content
            });
          }
          if (location.pathname === "/") {
            navigate("/edit", {
              state: {
                id: memo["_id"],
                content: memo.content,
                title: memo.title
              }
            });
          }
        }}
        key={index}
        className="text-light bg-dark border-info"
      >
        <strong>{memo.title}</strong>
        <div>
          <div>
            <small>Unique Id: {memo["_id"]}</small>
          </div>
          <div>
            <small>
              Last Updated: {new Date(memo.updatedAt).toLocaleString()}
            </small>
          </div>
        </div>
      </ListGroupItem>
    );
  });
  return (
    <aside
      style={{ height: "110vh", width: "35vw" }}
      className="border border-info"
    >
      {isLoading ? (
        <ReactSpinner />
      ) : (
        <ListGroup>
          {memos.length !== 0 ? (
            memoList
          ) : (
            <ListGroupItem className="text-light bg-dark">
              Create a memo to get started!
            </ListGroupItem>
          )}
        </ListGroup>
      )}
    </aside>
  );
}

export default Memos;
