import { useSearchParams } from "react-router-dom";
import NotesList from "./NotesList";
import { useInfo } from "../../context";

export default function NotesLayout() {
  const { isDarkMode, locale } = useInfo();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "all";
  const search = searchParams.get("search") || "";

  return (
    <div className="sm:w-4/5 w-full flex-col gap-3 flex">
      <hr className="border-slate-500" />
      <h2
        className={`text-3xl font-bold duration-300 ${
          isDarkMode && "text-white"
        } text-center`}
      >
        {locale === "in" ? "Daftar Catatan" : "List Notes"}
      </h2>
      <div
        className={`flex py-1 relative font-medium duration-300 ${
          isDarkMode && "text-white"
        }`}
      >
        <button
          onClick={() => setSearchParams({ type: "all", search })}
          className={`px-3 flex-wrap hover:scale-105 text-center text-md ${
            type != "archive" && type != "unarchive" && "scale-105 font-bold"
          }`}
        >
          {locale === "in" ? "Semua" : "All"}
        </button>
        <button
          onClick={() => setSearchParams({ type: "archive", search })}
          className={`px-3 flex-wrap hover:scale-105 text-center text-md ${
            type == "archive" && "scale-105 font-bold"
          }`}
        >
          {locale === "in" ? "Terarsip" : "Archive"}
        </button>
        <button
          onClick={() => setSearchParams({ type: "unarchive", search })}
          className={`px-3 flex-wrap hover:scale-105 text-center text-md ${
            type == "unarchive" && "scale-105 font-bold"
          }`}
        >
          {locale === "in" ? "Tidak Arsip" : "Unarchive"}
        </button>
        <hr
          className={`${
            isDarkMode ? "border-white" : "border-black"
          } duration-500 absolute bottom-0 ${
            locale === "in"
              ? (type != "archive" && type != "unarchive" && "w-[78px]") ||
                (type == "archive" && "translate-x-[73px] w-[87px]") ||
                (type == "unarchive" && "translate-x-[153px] w-[114px]")
              : (type != "archive" && type != "unarchive" && "w-[46px]") ||
                (type == "archive" && "translate-x-[42px] w-[84px]") ||
                (type == "unarchive" && "translate-x-[120px] w-[104px]")
          }`}
        />
      </div>
      <div className="min-h-[500px]">
        <NotesList type={type} search={search} />
      </div>
    </div>
  );
}
