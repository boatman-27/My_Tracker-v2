import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Myfooter from "./Components/MyFooter";
import Expense from "./Components/Expense/Expense";
import ToDo from "./Components/Todo/ToDo";
import Travel from "./Components/Travel/Travel";
import Jobs from "./Components/Jobs/Jobs";
import Home from "./Components/Home";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
      <Myfooter />
    </Router>
  );
};

export default App;
