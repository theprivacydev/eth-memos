import React from "react";
import Memos from "../components/Memos/Memos";
import MemoField from "../components/MemoField/MemoField";
import {useLocation} from "react-router-dom"


function EditMemo({ memos }) {
    const location = useLocation();
  return (
    <div style={{ display: "flex" }}>
      <Memos memos={memos}/>
      <MemoField memos={memos} location={location} />
    </div>
  );
}

export default EditMemo;