import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import Crud from "./pages/Crud";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Services from "./pages/Services";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected Comp={Crud} />} />
          <Route path="/service" element={<Protected Comp={Services} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
