import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

/** 정렬 타입 데이터 정의 */
const sortOptionList = [
  { value: "lastest", name: "최신순" },
  {
    value: "oldest",
    name: "오래된 순",
  },
];

const filterOptionList = [
  { value: "all", name: "전체" },
  { value: "good", name: "긍정적" },
  { value: "bad", name: "부정적" },
];

/** 컨트롤바 분리 작성 */
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <ControlBar value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </ControlBar>
  );
});

export default function DiaryList({ diaryList }) {
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  /** 날짜순 정렬 기능 */
  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    /** 감정순 필터 기능 */
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // 얇은 복사 ( 원본에 영향 X )
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filterdList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    // 날짜순 정렬 += 감정 필터 목록
    const sortedList = filterdList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <Menubar>
        <Left_col>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </Left_col>
        <Right_col>
          <MyButton
            text={"새 일기 작성하기"}
            type={"positive"}
            onClick={() => navigate("/new")}
          />
        </Right_col>
      </Menubar>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
}

const Menubar = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const Right_col = styled.div`
  flex-grow: 1;
  & > button {
    width: 100%;
  }
`;

const Left_col = styled.div``;

const ControlBar = styled.select`
  border: none;
  background-color: #ececec;

  margin-right: 10px;
  border-radius: 5px;
  padding: 10px 20px;

  cursor: pointer;
  font-family: "HakgyoansimSantteutdotumL";
  font-size: 18px;
`;
