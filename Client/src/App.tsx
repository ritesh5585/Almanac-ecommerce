import React from "react";
import Home from "./features/Home";
import { BrowserRouter, Routes, Route } from "react-router";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App