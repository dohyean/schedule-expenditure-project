import React from 'react';
import Post from './Components/Post';
import { BrowserRouter } from 'react-router-dom';
import {  Route ,Routes } from 'react-router-dom';
import Find_id from './Components/Find_id';
import Find_pw from './Components/Find_pw';
import Create from './Components/Create';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Post />}></Route>
                        <Route path="/find_id" element={<Find_id />}></Route>
                        <Route path="/find_pw" element={<Find_pw />}></Route>
                        <Route path="/create" element={<Create />}></Route>
                    </Routes>
                </header>
            </BrowserRouter>
        </div>
    );
}

export default App;