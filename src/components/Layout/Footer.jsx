import { useInfo } from "../../context";

export default function Footer() {
  const { isDarkMode } = useInfo();
  return(
      <div className={`text-center py-5 flex justify-center items-center duration-300 select-none border-t ${isDarkMode ? "bg-gray-900 border-white text-white" : "bg-gray-300 border-black"}`}>
          <p className="text-sm font-bold">Muhamad Luthfi Sadli &copy; 2023  </p>
      </div>
  )
}