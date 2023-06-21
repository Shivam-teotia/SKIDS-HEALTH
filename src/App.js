import "./App.css";
import Home from "./component/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddUser from "./component/AddUser";
function App() {
  return (
    <div className="app">
      <div className="heading-div">
        <h2 className="heading">User Info App</h2>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
