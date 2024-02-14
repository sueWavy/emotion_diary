import React, { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

export default function New() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "Soo 일기장 - 새 일기쓰기";
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
}
