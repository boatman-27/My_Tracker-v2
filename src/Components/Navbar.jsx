import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/ao-logo6.png";

const NavBar = () => {
  return (
    <Navbar fluid rounded className="bg-transparent">
      <Navbar.Brand>
        <Link to="/">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="AO Logo"
            style={{ height: "50px" }}
          />
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link to="https://adhamosman.vercel.app/projects" target="_blank">
          <Button>Add Projects</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/todo">
          <Navbar.Link className="text-white text-base">ToDo List</Navbar.Link>
        </Link>
        <Link to="/travel">
          <Navbar.Link className="text-white text-base">Travel</Navbar.Link>
        </Link>
        <Link to="/expense">
          <Navbar.Link className="text-white text-base">Expense</Navbar.Link>
        </Link>
        <Link to="/jobs">
          <Navbar.Link className="text-white text-base">Jobs</Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
