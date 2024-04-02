import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useInfo } from "../../context";

export default function SearchInput() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "all";
  const search = searchParams.get("search") || "";
  const { isDarkMode, locale } = useInfo();

  return (
    <div
      className={`flex rounded-3xl border ${
        isDarkMode
          ? "border-white bg-black text-white"
          : "border-black bg-white"
      } items-center`}
    >
      <input
        type="input"
        onChange={(e) => setSearchParams({ type, search: e.target.value })}
        placeholder={locale === "in" ? "Cari..." : "Search..."}
        className={`focus:outline-0 placeholder:text-sm duration-500 text-sm ${
          searchActive ? "w-[180px] ml-5 mr-2" : "w-0"
        } ${isDarkMode && "bg-black"}`}
        value={search}
      />
      <div className="flex text-xl">
        {search.length > 0 && searchActive ? (
          <div
            className="py-1 cursor-pointer"
            onClick={() => setSearchParams({ type, search: "" })}
          >
            <IoIosClose />
          </div>
        ) : (
          searchActive && <div className="w-[20px]"></div>
        )}
        <div
          className={`py-1 px-2 duration-500 cursor-pointer ${
            searchActive && "rotate-[720deg]"
          }`}
          onClick={() => setSearchActive(!searchActive)}
        >
          <IoSearch />
        </div>
      </div>
    </div>
  );
}
