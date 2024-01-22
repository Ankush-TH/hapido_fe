import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Companies from "./components/CompanyRow";
import CompanyDetails from "./components/CompanyDetails";
import Requests from "./components/Requests";
import Protected from "./components/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected Component={Dashboard} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/companies"
          element={<Protected Component={Companies} />}
        ></Route>
        <Route
          path="/requests"
          element={<Protected Component={Requests} />}
        ></Route>
        <Route
          path="/companyDetails"
          element={<Protected Component={CompanyDetails} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
