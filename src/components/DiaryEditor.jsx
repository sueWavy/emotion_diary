import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import styled from "styled-components";
import EmotionItem from "./EmotionItem";

// 현재 날짜 가공해서 가져오기

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export default function DiaryEditor({ isEdit, originData }) {
  const contentRef = useRef();

  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  // 5가지 감정 중 선택한 감정 체크
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  /** 일기 생성 함수 */
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정하나요?" : "일기를 작성하나요?")) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
    // replace:true 뒤로가기로 화면돌아가기 금지
  };

  /** 일기 삭제 함수 */
  const handleRemove = () => {
    if (window.confirm("정말 삭제하겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <Editor>
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 작성하기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
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
