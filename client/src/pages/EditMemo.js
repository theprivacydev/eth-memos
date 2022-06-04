import React, { useState } from "react";
import Memos from "../components/Memos/Memos";
import MemoField from "../components/MemoField/MemoField";
import { useLocation } from "react-router-dom";

function EditMemo() {
  const location = useLocation();
  const [currentMemoInfo, setCurrentMemoInfo] = useState({});
  return (
    <div style={{ display: "flex" }}>
      <Memos setCurrentMemoInfo={setCurrentMemoInfo} />
      <MemoField currentMemoInfo={currentMemoInfo} location={location} />
    </div>
  );
}

export default EditMemo;
