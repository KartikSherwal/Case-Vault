import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">

      <h1 className="text-3xl font-bold">
        CaseVault
      </h1>

      <div className="flex gap-6 items-center">

        <Link
          to="/"
          className="hover:text-blue-400"
        >
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              className="hover:text-blue-400"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-blue-400"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/upload"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Upload
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;