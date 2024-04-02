import { useInfo } from "../../context";
import CardNotes from "../Fragments/CardNotes";
import PropTypes from "prop-types";

export default function NotesList({ type, search }) {
  const { isDarkMode, notes, locale } = useInfo();
  if (type === "archive") {
    const notesarc = notes.filter(
      (note) => note.archived && note.title.toLowerCase().includes(search)
    );
    if (notesarc.length === 0) {
      return (
        <div className="font-bold text-sm text-red-500 text-center">
          {locale === "in" ? "Tidak Ada Catatan Yang Arsip" : "No Archive Notes"}
        </div>
      );
    }
    return (
      <div className="flex gap-3 flex-wrap mt-3">
        {notesarc.map((note) => (
          <CardNotes key={note.id} isDarkMode={isDarkMode} note={note} />
        ))}
      </div>
    );
  } else if (type === "unarchive") {
    const notesunarc = notes.filter(
      (note) => !note.archived && note.title.toLowerCase().includes(search)
    );
    if (notesunarc.length === 0) {
      return (
        <div className="font-bold text-sm text-red-500 text-center">
          {locale === "in" ? "Tidak Ada Catatan Yang Tidak Arsip" : "No Unarchive Notes"}
        </div>
      );
    }
    return (
      <div className="flex gap-3 flex-wrap mt-3">
        {notesunarc.map((note) => (
          <CardNotes key={note.id} isDarkMode={isDarkMode} note={note} />
        ))}
      </div>
    );
  } else {
    const notesall = notes.filter((note) =>
      note.title.toLowerCase().includes(search)
    );
    if (notesall.length === 0) {
      return <div className="font-bold text-sm text-red-500 text-center">{locale === "in" ? "Tidak Ada Catatan" : "No Notes"}</div>;
    }
    return (
      <div className="flex gap-3 flex-wrap mt-3">
        {notesall.map((note) => (
          <CardNotes key={note.id} isDarkMode={isDarkMode} note={note} />
        ))}
      </div>
    );
  }
}

NotesList.propTypes = {
  type: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
}