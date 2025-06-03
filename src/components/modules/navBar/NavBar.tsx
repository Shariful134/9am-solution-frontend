import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <div className="container mx-auto  sticky top-0 z-10">
      <div className=" bg-base-100 shadow-sm py-4">
        <div>
          <ul className="flex justify-center items-center px-1 gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold  border-black underline text-lg dark:text-gray-300"
                  : "hover:text-black hover:underline text-lg"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold  border-black underline text-lg dark:text-gray-300"
                  : "hover:text-black hover:underline text-lg"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold  border-black underline text-lg dark:text-gray-300"
                  : "hover:text-black hover:underline text-lg"
              }
            >
              Register
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
