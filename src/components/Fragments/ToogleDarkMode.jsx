import PropTypes from "prop-types"
import { useInfo, useInfoDispatch } from "../../context";
import { useEffect } from "react";

export default function ToogleDarkMode() {
  const {isDarkMode, locale} = useInfo();
  const dispatch = useInfoDispatch();

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode])

  return (
    <div className={`flex duration-300 ${isDarkMode && "text-white"} font-bold items-center`}>
      <span className="toggle-label">{locale === 'in' ? 'Terang' : 'Light'}</span>
      <input
        type="checkbox"
        onChange={() => dispatch({ type: "CHANGE_DARK_MODE", payload: !isDarkMode })}
        value={isDarkMode}
        id="dark-toggle"
        className="hidden"
      />
      <label htmlFor="dark-toggle" className={`w-[36px] h-5 flex px-[3px] items-center border duration-300 ${isDarkMode ? "border-white bg-black" : "border-black bg-white" } mx-1 rounded-2xl`}>
        <div className={`w-3 h-3 rounded-full duration-300 ${isDarkMode ? "bg-white translate-x-4" : "bg-black"}`}></div>
      </label>
      <span className="toggle-label">{locale === 'in' ? 'Gelap' : 'Dark'}</span>
    </div>
  );
}