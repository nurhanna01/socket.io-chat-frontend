import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import OnlineUsers from "./pages/OnlineUsers";
import RoomChat from "./pages/RoomChat";
import MessagesNew from "./pages/MessagesNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/messages" element={<MessagesNew />}></Route>
        <Route path="/online" element={<OnlineUsers />}></Route>
        <Route path="/chat" element={<RoomChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
