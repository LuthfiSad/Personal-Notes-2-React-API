import FormNotes from "../components/Fragments/FormNotes";
import Footer from "../components/Layout/Footer";
import NotesLayout from "../components/Layout/NotesLayout";
import Navbar from "../components/Layout/Navbar";
import { useInfo } from "../context";

export default function NotesPage() {
  const { isDarkMode } = useInfo();

  return (
    <div className="flex flex-col">
      <Navbar disabled />
      <div className={`flex px-4 gap-10 py-10 flex-col items-center duration-300 ${isDarkMode && "bg-black"}`}>
        <FormNotes />
        <NotesLayout />
      </div>
      <Footer />
    </div>
  );
}

