import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import styled from "styled-components";
import EmotionItem from "./EmotionItem";

// 현재 날짜 가공해서 가져오기
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "행복함",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

export default function DiaryEditor() {
  const contentRef = useRef();

  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  // 5가지 감정 중 선택한 감정 체크
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const { onCreate } = useContext(DiaryDispatchContext);

  /** 일기 생성 함수 */
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
    // replace:true 뒤로가기로 화면돌아가기 금지
  };

  return (
    <Editor>
      <MyHeader
        headText={"새 일기 작성하기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <Section>
          <h4>오늘은 언제인가요?</h4>
          <DateWrapper>
            <DateInput
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </DateWrapper>
        </Section>
        <Section>
          <h4>오늘의 감정</h4>
          <ItemWrapper>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </ItemWrapper>
        </Section>
        <Section>
          <h4>오늘의 일기</h4>
          <InputWrapper>
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘은 어땠나요"
            />
          </InputWrapper>
        </Section>
        <Section>
          <ControlBox>
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </ControlBox>
        </Section>
      </div>
    </Editor>
  );
}

const Editor = styled.div`
  font-family: "HakgyoansimSantteutdotumL";
`;

const Section = styled.section`
  margin-bottom: 40px;
  > h4 {
    font-size: 22px;
  }
`;

const DateWrapper = styled.div``;

const InputWrapper = styled.div`
  > textarea {
    font-size: 20px;
    box-sizing: border-box;
    width: 100%;
    min-height: 200px;
    resize: vertical;

    border: none;
    border-radius: 5px;
    background-color: #ececec;

    padding: 20px;
  }
`;

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 2%;
`;

const DateInput = styled.input`
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 10px 20px;
  cursor: pointer;

  font-size: 20px;
  font-family: "HakgyoansimSantteutdotumL";
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
