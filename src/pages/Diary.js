import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import styled from "styled-components";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";

export default function Diary() {
  const [data, setData] = useState();
  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Soo 일기장 - ${id}번째 일기`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        // 일기 존재시
        setData(targetDiary);
      } else {
        // 일기 존재하지 않을 시
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <DiaryPage>불러오는 중입니다...</DiaryPage>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <DiaryPage>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <Article>
          <section>
            <h4>오늘의 감정</h4>
            <DiaryImgWrapper className={`Emotion_${data.emotion}`}>
              <img src={curEmotionData.emotion_img} />
              <EmotionDescript>
                {curEmotionData.emotion_descript}
              </EmotionDescript>
            </DiaryImgWrapper>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <DiaryContent>
              <p>{data.content}</p>
            </DiaryContent>
          </section>
        </Article>
      </DiaryPage>
    );
  }
}

const DiaryPage = styled.div`
  font-family: "HakgyoansimSantteutdotumL";
`;

const Article = styled.article`
  > section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    width: 100%;
    margin-bottom: 100px;
  }

  > h4 {
    font-size: 22px;
    font-weight: bold;
  }
`;

const DiaryImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: #ececec;
  width: 250px;
  height: 250px;
  border-radius: 5px;

  &.Emotion_1 {
    background-color: #64c964;
  }
  &.Emotion_2 {
    background-color: #9dd772;
  }
  &.Emotion_3 {
    background-color: #fdce17;
  }
  &.Emotion_4 {
    background-color: #fd8446;
  }
  &.Emotion_5 {
    background-color: #fd565f;
  }
`;

const EmotionDescript = styled.div`
  color: white;
  font-size: 25px;
`;

const DiaryContent = styled.div`
  width: 100%;
  background-color: #ececec;
  border-radius: 5px;
  word-break: keep-all;
  overflow-wrap: break-word;

  > p {
    padding: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 400;
    line-height: 2.5;
  }
`;
