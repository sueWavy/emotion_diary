import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Edit() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  console.log("mode : ", mode);
  console.log("id : ", id);

  const navigate = useNavigate();

  return (
    <div>
      <p>여기는 EDIT</p>
      <button onClick={() => setSearchParams({ who: "soo" })}>QS 변경</button>
      <button onClick={() => navigate("/home")}>HOME</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}
