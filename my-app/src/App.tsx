import React from "react";
// import Post from './Components/PostBoard';
import PostBoard from "./Components/PostBoard";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Find_id from "./Components/Find_id";
import Find_pw from "./Components/Find_pw";
import Create from "./Components/Create";

import PostBoard_Notice from "./Components/PostBoard_Notice";
import PostBoard_Complaint from "./Components/PostBoard_Complaint";
import PostBoard_Insert from "./Components/PostBoard_Insert";
import PostModal from "./Components/PostModal";
import PostBoard_Content from "./Components/PostBoard_Content";
import Main from "./Components/Main";

import Test_Page from "./Components/test/Test_page";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/postboard" element={<PostBoard />}></Route>
            <Route path="/find_id" element={<Find_id />}></Route>
            <Route path="/find_pw" element={<Find_pw />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/postmodal" element={<PostModal />}></Route>

            <Route path="/test_page" element={<Test_Page />}></Route>

            <Route
              path="/postboard_notice"
              element={<PostBoard_Notice />}
            ></Route>
            <Route
              path="/postboard_complaint"
              element={<PostBoard_Complaint />}
            ></Route>
            <Route
              path="/postboard_insert"
              element={<PostBoard_Insert />}
            ></Route>
            <Route
              path="/postboard_content"
              element={<PostBoard_Content />}
            ></Route>
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
};

export default App;
