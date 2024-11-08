import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
