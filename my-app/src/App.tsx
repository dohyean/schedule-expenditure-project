import React from "react";
// import Post from './Components/PostBoard';
import PostBoard_Main from "./Components/PostBoard_Main";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Find_id from "./Components/Find_id";
import Find_pw from "./Components/Find_pw";
import Create from "./Components/Create";

import PostBoard_Insert from "./Components/PostBoard_Insert";
import PostModal from "./Components/PostModal";
import PostBoard_Content from "./Components/PostBoard_Content";
import Main from "./Components/Main";
import Main_Page from "./Components/Main_Page";
import Change_Page from "./Components/Change_Page";

// 테스트 페이지

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            {/* <Route path="/" element={<Test_Menu />}></Route> */}
            <Route path="/postboard_main" element={<PostBoard_Main />}></Route>
            <Route path="/find_id" element={<Find_id />}></Route>
            <Route path="/find_pw" element={<Find_pw />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/postmodal" element={<PostModal />}></Route>
            <Route path="/main_page" element={<Main_Page />}></Route>

            <Route
              path="/postboard_insert"
              element={<PostBoard_Insert />}
            ></Route>
            <Route
              path="/postboard_content"
              element={<PostBoard_Content />}
            ></Route>
            <Route path="/change_page" element={<Change_Page />}></Route>
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
};

export default App;
