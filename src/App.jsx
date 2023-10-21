import React from "react";
import JoinForm from "./Components/JoinForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meeting from "./Components/Meeting";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinForm />} />
        <Route path="/meeting" element={<Meeting />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
