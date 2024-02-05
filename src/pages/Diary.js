import React from "react";
import { useParams } from "react-router-dom";

export default function Diary() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <p>여기는 DIARY</p>
    </div>
  );
}
