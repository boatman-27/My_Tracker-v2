import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import logo from "../../src/assets/ao-logo6.png";

function Myfooter() {
  return (
    <Footer container className="bg-transparent footer">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              src={logo}
              alt="Flowbite Logo"
              style={{ height: "50px" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-4 sm:gap-6">
            <Link to="/todo">
              <Footer.Link className="text-white text-base no-bullet">
                ToDo List
              </Footer.Link>
            </Link>
            <Link to="/travel">
              <Footer.Link className="text-white text-base no-bullet">
                Travel
              </Footer.Link>
            </Link>
            <Link to="/expense">
              <Footer.Link className="text-white text-base no-bullet">
                Expense
              </Footer.Link>
            </Link>
            <Link to="/jobs">
              <Footer.Link className="text-white text-base no-bullet">
                Jobs
              </Footer.Link>
            </Link>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <h2 className="text-white">Trying my Best 🐧</h2>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              className="text-white"
              href="https://www.instagram.com/boatman_08/"
              icon={BsInstagram}
            />
            <Footer.Icon
              className="text-white"
              href="https://twitter.com/demzaya1bs"
              icon={BsTwitter}
            />
            <Footer.Icon
              className="text-white"
              href="https://github.com/boatman-27"
              icon={BsGithub}
            />
            <Footer.Icon
              className="text-white"
              href="https://www.linkedin.com/in/adham-osman-/"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Myfooter;
