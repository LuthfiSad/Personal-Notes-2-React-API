import { Link, useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Layout/Navbar";
import { IoIosClose } from "react-icons/io";
import { useInfo, useInfoDispatch } from "../context";
import { detailsNote } from "../services/notes.service";
import {
  ArchiveNote,
  UnarchiveNote,
  deleteNote,
} from "../services/notes.service";
import LoadingPage from "./loading";

export default function DetailNotesPage() {
  const { isDarkMode, locale } = useInfo();
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useInfoDispatch();

  useEffect(() => {
    detailsNote(id, token)
      .then((data) => setNote(data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: locale === "in" ? "Catatan tidak ditemukan" : "Note not found",
        }).then(() => {
          navigate("/notes");
        });
      });
  }, []);

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
            detailsNote(id, token).then((data) => {
              setNote(data);
              Swal.fire({
                text: locale === 'in' ? `Berhasil ${text}` : `Unarchive Success`,
                icon: "success",
              });
            })
          })          
        } else {
          ArchiveNote(id, token, dispatch)
          .then(()=>{
            detailsNote(id, token).then((data) => {
              setNote(data);
              Swal.fire({
                text: locale === 'in' ? `Berhasil ${text}` : `Archive Success`,
                icon: "success",
              });
            })
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
          }).then(() => {
            navigate("/notes");
          });
        })
      }
    });
  }

  return (
    <>
      {note ? (
        <div
          className={`flex min-h-screen flex-col ${isDarkMode && "bg-black"}`}
        >
          <Navbar
            disabled={false}
          />
          <div className="flex justify-center py-10">
            <div
              className={`max-w-xl w-full border p-4 relative mx-6 flex justify-between flex-col gap-3 shadow-md duration-300 ${
                isDarkMode ? "border-white text-white" : "border-black"
              } border rounded`}
            >
              <Link
                to={"/notes"}
                className="p-2 hover:scale-90 duration-300 bg-red-500 cursor-pointer absolute rounded-3xl text-xl -top-4 -left-4"
              >
                <IoIosClose />
              </Link>
              <div className="flex flex-col">
                <div>
                  <div className="text-2xl break-words inline font-bold">
                    {note.title}
                  </div>
                </div>
                <p className="text-sm">{showFormattedDate(note.createdAt)}</p>
              </div>
              <p className="text-md h-full break-words">{note.body}</p>
              <div className="flex gap-1 justify-end">
                {note.archived && (
                  <button
                    onClick={() => handleArchive(note.id, true)}
                    className="px-2 text-sm py-1 bg-green-600 rounded text-white"
                  >
                    Archive
                  </button>
                )}
                {!note.archived && (
                  <button
                    onClick={() => handleArchive(note.id, false)}
                    className="px-2 text-sm py-1 bg-yellow-600 rounded text-white"
                  >
                    Unarchive
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
          </div>
        </div>
      ) : (
        <LoadingPage opening={false}>
          Loading...
        </LoadingPage>
      )}
    </>
  );
}
