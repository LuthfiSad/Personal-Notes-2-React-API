import { Link } from "react-router-dom";
import { showFormattedDate } from "../../utils";
import PropTypes from "prop-types";
import { useInfo, useInfoDispatch } from "../../context";
import { ArchiveNote, UnarchiveNote, deleteNote } from "../../services/notes.service";
import Swal from "sweetalert2";

export default function CardNotes({ note }) {
  const { isDarkMode, locale } = useInfo();
  const dispatch = useInfoDispatch();
  const token = localStorage.getItem("token");

  const handleArchive = (id, archive) => {
    const text = locale === 'in' ? 
      archive ? "Membatalkan Pengarsipan" : "Arsipkan"
    : archive ? "Unarchive" : "Archive";
    Swal.fire({
      text: locale === 'in' ? `Apakah anda ingin ${text} ?` : `Are you sure want to ${text} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: archive ? "#ca8a04" : "#16a34a",
      confirmButtonText: locale === 'in' ? archive ? "Batalkan Arsip" : "Arsipkan" : archive ? "Unarchive" : "Archive",
    }).then((result) => {
      if (result.isConfirmed) {
        if(archive){
          UnarchiveNote(id, token, dispatch)
          .then(()=>{
            Swal.fire({
              text: locale === 'in' ? `Berhasil ${text}` : `Unarchive Success`,
              icon: "success",
            });
          })          
        } else {
          ArchiveNote(id, token, dispatch)
          .then(()=>{
            Swal.fire({
              text: locale === 'in' ? `Berhasil ${text}` : `Archive Success`,
              icon: "success",
            });
          })          
        }
      }
    });
  }

  const handleDelete = (id) => {
    Swal.fire({
      text: locale === 'in' ? "Apakah anda ingin menghapus catatan?" : "Are you sure to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: locale === 'in' ? "Hapus" : "Delete",
      cancelButtonText: locale === 'in' ? "Batal" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id, token, dispatch).then(() => {
          Swal.fire({
            text: locale === 'in' ? "Berhasil menghapus catatan" : "Delete Note Success",
            icon: "success",
          });
        })
      }
    });
  }

  return (
    <div
      className={`max-w-xs w-full p-3 flex justify-between flex-col gap-3 shadow-md duration-300 ${
        isDarkMode ? "border-white text-white" : "border-black"
      } border rounded`}
    >
      <div className="flex flex-col">
        <div>

        <Link to={`/notes/${note.id}`} className="text-xl break-words inline hover:text-blue-500 cursor-pointer font-bold">{note.title}</Link>
        </div>
        <p className="text-sm">{showFormattedDate(note.createdAt)}</p>
      </div>
      <p className="text-md h-full break-words">{note.body.substring(0, 100)} {note.body.length > 100 && '...'}</p>
      <div className="flex gap-1 justify-end">
        {note.archived && (
          <button
            onClick={() => handleArchive(note.id, true)}
            className="px-2 text-sm py-1 bg-green-600 rounded text-white"
          >
            {locale === 'in' ? 'Terarsip' : 'Archive'}
          </button>
        )}
        {!note.archived && (
          <button
            onClick={() => handleArchive(note.id, false)}
            className="px-2 text-sm py-1 bg-yellow-600 rounded text-white"
          >
            {locale === 'in' ? 'Tidak Arsip' : 'Unarchive'}
          </button>
        )}
        <button
          onClick={() => handleDelete(note.id)}
          className="px-2 text-sm py-1 bg-red-600 rounded text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

CardNotes.propTypes = {
  note: PropTypes.object.isRequired,
};
