import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import useLogin from "../../hooks/useLogin";
import { useInfo } from "../../context";
import PropTypes from "prop-types";

export default function AuthLayout({ children, type }) {
  const { isDarkMode, locale } = useInfo();
  useLogin(false);

  return (
    <div
      className={`flex w-full flex-col duration-300 ${
        isDarkMode ? "bg-slate-700" : "bg-slate-100"
      } min-h-screen`}
    >
      <Navbar disabled={false} />
      <div className="flex justify-center py-5">
        <div
          className={`max-w-sm mx-2 rounded-lg shadow-md w-full duration-300 ${
            isDarkMode ? "bg-black" : "bg-white"
          } py-6 px-6`}
        >
          <div className={`text-center mb-6 ${isDarkMode && "text-white"}`}>
            <h1 className="text-3xl font-bold">{type.toUpperCase()}</h1>
            <p className="text-sm">
              {locale === "in"
                ? type === "login"
                  ? "Yuk, login untuk menggunakan aplikasi."
                  : "Isi form untuk mendaftar akun."
                : type == "login"
                ? "Login to use app, please."
                : "Fill the form to register account."}
            </p>
          </div>
          {children}
          <p
            className={`text-xs text-center mt-1 duration-300 ${
              isDarkMode && "text-white"
            }`}
          >
            {locale === "in"
              ? type == "login"
                ? "Belum punya akun? "
                : "Sudah punya akun? "
              : type == "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            {type == "login" && (
              <Link
                to="/register"
                className="hover:text-blue-600 border-red-600"
              >
                Register
              </Link>
            )}
            {type == "register" && (
              <Link to="/" className="hover:text-blue-600 border-red-600">
                Login
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
}