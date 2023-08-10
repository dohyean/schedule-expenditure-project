import React from "react";
// import Post from './Components/PostBoard';
import Post from "./Components/test/Test_board";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Find_id from "./Components/Find_id";
import Find_pw from "./Components/Find_pw";
import Create from "./Components/Create";

import Test_Board from "./Components/test/Test_board";
import Test_login from "./Components/Login";
import Test_board_add from "./Components/test/Test_board_add";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Routes>
            {/* <Route path="/" element={<Post />}></Route> */}
            <Route path="/" element={<Test_login />}></Route>
            <Route path="/find_id" element={<Find_id />}></Route>
            <Route path="/find_pw" element={<Find_pw />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/test" element={<Test_Board />}></Route>
            <Route path="/test_add" element={<Test_board_add />}></Route>
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
};

export default App;
