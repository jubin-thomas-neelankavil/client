import "./App.css";
import Add from "./components/Add";
import NavBar from "./components/NavBar";
import All from "./components/All";
import CodeForInterview from "./components/CodeForInterview ";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<CodeForInterview />} />

          <Route path="/all" element={<All />} />

          <Route path="/add" element={<Add />} />

          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
