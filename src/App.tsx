import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import OnlineUsers from "./pages/OnlineUsers";
import RoomChat from "./pages/RoomChat";
import MessagesNew from "./pages/MessagesNew";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MessagesNew />}></Route>
          <Route path="/online" element={<OnlineUsers />}></Route>
          <Route path="/chat" element={<RoomChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
