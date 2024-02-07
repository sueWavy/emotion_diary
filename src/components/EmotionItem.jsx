import React from "react";
import styled from "styled-components";

export default function EmotionItem({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) {
  return (
    <Item
      onClick={() => onClick(emotion_id)}
      className={[
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  padding: 20px 0;
  cursor: pointer;

  > img {
    width: 50%;
    margin-bottom: 10px;
  }

  > span {
    font-size: 18px;
  }

  &.EmotionItem_off {
    background-color: #ececec;
  }

  &.EmotionItem_on_1 {
    background-color: #64c964;
    color: white;
  }

  &.EmotionItem_on_2 {
    background-color: #9dd772;
    color: white;
  }
  &.EmotionItem_on_3 {
    background-color: #fdce17;
    color: white;
  }
  &.EmotionItem_on_4 {
    background-color: #fd8446;
    color: white;
  }
  &.EmotionItem_on_5 {
    background-color: #fd565f;
    color: white;
  }
`;
