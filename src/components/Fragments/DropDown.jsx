import { useInfo, useInfoDispatch } from "../../context";
import { useEffect } from "react";

export default function Dropdown() {
  const { locale, isDarkMode } = useInfo();
  const dispatch = useInfoDispatch();

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <select
      onChange={(e) =>
        dispatch({ type: "CHANGE_LOCALE", payload: e.target.value })
      }
      value={locale}
      className={`border text-sm rounded-lg px-2 duration-300 ${
        isDarkMode ? "bg-black border-white text-white" : "border-black"
      }`}
    >
      <option value="in">Indonesia</option>
      <option value="en"> English</option>
    </select>
  );
}
