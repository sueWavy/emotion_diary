import React from "react";
import styled from "styled-components";

export default function MyButton({ text, type, onClick }) {
  /** 정해진 타입이 아닌 경우 default로 설정하기 */
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <Button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

MyButton.defaultProps = {
  type: "default",
};

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding: 10px 20px;

  font-size: 18px;
  white-space: nowrap;
  font-family: "HakgyoansimSantteutdotumL";

  /* Default Styles */
  background-color: #ececec;
  color: black;

  /* Positive Styles */
  &.MyButton_positive {
    background-color: #64c964;
    color: white;
  }

  /* Negative Styles */
  &.MyButton_negative {
    background-color: #fd565f;
    color: white;
  }
`;
