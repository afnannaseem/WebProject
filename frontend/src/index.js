import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ProvideAuth } from "./Hooks/AuthContext";
import Accept from "./Pages/Accept";
import Dashboard from "./Pages/Dashboard";
import Pending from "./Pages/Pending";
import Fail from "./Pages/fail";
import Home from "./Pages/home";
import Success from "./Pages/success";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
// const socket = io("http://localhost:3330");
// socket.on("newNotification", (data) => {
//   console.log("New Notification:", data);
// });
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProvideAuth>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/fail" element={<Fail />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/home" element={<Home />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/accept" element={<Accept />} />
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
