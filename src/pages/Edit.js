import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

export default function Edit() {
  const diaryList = useContext(DiaryStateContext);
  const [originData, setOriginData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  // 페이지 id에 맞는 다이어리 정보 받아오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
        // 없는 일기일 경우 홈화면 & 뒤로가기 불가능
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}
