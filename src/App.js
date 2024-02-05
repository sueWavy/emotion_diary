import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

// Components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={<MyButton text={"<"} onClick={() => alert("왼쪽")} />}
          rightChild={<MyButton text={">"} onClick={() => alert("오른쪽")} />}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
