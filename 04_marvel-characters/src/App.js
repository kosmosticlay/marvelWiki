import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/character/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
