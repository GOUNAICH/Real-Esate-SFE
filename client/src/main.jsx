import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <DarkModeProvider>
          <ToastContainer />
          <App />
        </DarkModeProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
