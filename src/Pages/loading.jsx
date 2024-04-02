import { useInfo } from "../context";
import useLogin from "../hooks/useLogin";
import PropTypes from "prop-types";

export default function LoadingPage({ opening = true, children }) {
  const { isDarkMode } = useInfo();
  if (opening) {
    useLogin(true);
  }
  return (
    <div
      className={`flex flex-col justify-center items-center select-none ${
        isDarkMode ? "bg-black text-white" : "bg-white"
      } h-screen`}
    >
      <div className={`flex space-x-2`}>
        <div
          className={`h-6 w-6 ${
            isDarkMode ? "bg-white" : "bg-black"
          } rounded-full animate-bounce [animation-delay:-0.3s]`}
        ></div>
        <div
          className={`h-6 w-6 ${
            isDarkMode ? "bg-white" : "bg-black"
          } rounded-full animate-bounce [animation-delay:-0.15s]`}
        ></div>
        <div
          className={`h-6 w-6 ${
            isDarkMode ? "bg-white" : "bg-black"
          } rounded-full animate-bounce`}
        ></div>
      </div>
      <p className="text-md font-bold">{children}</p>
    </div>
  );
}


LoadingPage.propTypes = {
  opening: PropTypes.bool,
  children: PropTypes.node.isRequired
}