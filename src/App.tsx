import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import OnlineUsers from "./pages/OnlineUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/online" element={<OnlineUsers />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
