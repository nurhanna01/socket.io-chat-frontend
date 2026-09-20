# Socket.IO Chat App — Frontend

Frontend for a real-time chat app. Built with React (Vite), TypeScript, and Socket.IO client.

Backend: https://github.com/nurhanna01/socket.io-chat-backend

## Stack

- React (Vite)
- TypeScript
- SCSS Modules
- Axios
- Socket.IO client
- React Router
- React Hot Toast

## Getting Started

```bash
npm install
cp .env.example .env
# fill in VITE_API_BASE_URL and VITE_SOCKET_URL

npm run dev
```

## Structure

```
src/api        - axios instance, auth/chat API calls
src/context    - AuthContext, SocketContext, ChatContext
src/components - Input, Button, ChatItem, Sidebar, etc.
src/pages      - Login, Register, MessagesNew
```

## Auth

Token + profile persisted in localStorage, restored on app load. Socket reconnects automatically using the stored token.
