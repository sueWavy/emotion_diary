import React from "react";
import styled from "styled-components";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = React.memo(({ id, content, emotion, date }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <DiaryCard>
      <EmotionImg className={`Emotion_${emotion}`} onClick={goDetail}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </EmotionImg>
      <Info onClick={goDetail}>
        <DiaryDate>{strDate}</DiaryDate>
        <DiaryPreview>{content.slice(0, 25)}</DiaryPreview>
      </Info>
      <EditBtnWrapper>
        <MyButton text={"수정하기"} onClick={goEdit} />
      </EditBtnWrapper>
    </DiaryCard>
  );
});

const Info = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  font-family: "HakgyoansimSantteutdotumL";
  cursor: pointer;
`;

const DiaryDate = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
`;

const DiaryPreview = styled.div`
  font-size: 18px;
`;

const EditBtnWrapper = styled.div`
  min-width: 70px;
`;

const DiaryCard = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid #e2e2e2;
  padding: 15px 0;
`;

const EmotionImg = styled.div`
  display: flex;
  justify-content: center;

  height: 80px;
  min-width: 120px;
  border-radius: 5px;
  cursor: pointer;

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

  > img {
    width: 50%;
  }
`;

export default DiaryItem;
