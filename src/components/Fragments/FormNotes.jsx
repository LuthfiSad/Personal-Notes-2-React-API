import { useState } from "react";
import Swal from "sweetalert2";
import { addNote } from "../../services/notes.service";
import { useInfo, useInfoDispatch } from "../../context";
import Button from "../Elements/Button";
import useInput from "../../hooks/useInput";

export default function FormNotes() {
  const [title, onChangeTitle, resetTitle] = useInput('');
  const [body, onChangeBody, resetBody] = useInput('');
  const token = localStorage.getItem("token");
  const [disabled, setDisabled] = useState(false);
  const dispatch = useInfoDispatch();
  const { isDarkMode, notes, locale } = useInfo();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      Swal.fire({
        icon: 'error',
        text: locale === 'in' ? 'Judul Tidak Boleh Kosong' : 'Title cannot be empty',
      });
      return;
    }

    if (!body) {
      Swal.fire({
        icon: 'error',
        text: locale === 'in' ? 'Isi Tidak Boleh Kosong' : 'Body cannot be empty',
      });
      return;
    }

    const sameTitle = notes.filter((note) => note.title.toLowerCase() === title.toLowerCase());
    if (sameTitle.length > 0) {
      Swal.fire({
        icon: 'error',
        text: locale === 'in' ? 'Judul Tidak Boleh Sama' : 'Title cannot be the same',
      });
      return;
    }
    setDisabled(true);
    addNote(title, body, token, dispatch).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: locale === 'in' ? 'Catatan Berhasil' : 'Note Added',
        showConfirmButton: false,
        timer: 1000,
      });
    }).then(() => {
      setDisabled(false);
      resetTitle();
      resetBody();
    })
  };

  const changeTitle = (e) => {
    if (e.target.value.length <= 50) {
      onChangeTitle(e)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: locale === 'in' ? 'Judul Tidak Boleh Lebih Dari 50 Karakter' : 'Title cannot be more than 50 characters',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div
      className={`max-w-[500px] w-full border duration-300 ${
        isDarkMode ? 'border-white' : 'border-black'
      } shadow-md rounded`}
    >
      <form onSubmit={(e) => handleSubmit(e)} className="flex gap-3 flex-col p-3">
        <h1
          className={`text-2xl text-center font-bold duration-300 ${
            isDarkMode && 'text-white'
          }`}
        >
          {locale === 'in' ? 'Buat Catatan Baru' : 'Create New Note'}
        </h1>
        <div className="flex gap-1 flex-col">
          <label
            htmlFor="title"
            className={`font-bold text-md duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {locale === 'in' ? 'Judul' : 'Title'}
          </label>
          <input
            type="text"
            onChange={(e) => changeTitle(e)}
            value={title}
            disabled={disabled}
            id="title"
            name="title"
            className={`border rounded py-1 px-2 duration-300 ${
              isDarkMode
                ? 'bg-black border-gray-300 text-gray-300'
                : 'border-gray-700 text-gray-700'
            }`}
            placeholder={locale === 'in' ? 'Masukan Judul' : 'Enter Title'}
          />
          <p className={`text-sm text-end ${title.length >= 40 ? 'text-red-500' : 'text-green-500'}`}>
            {locale === 'in' ? "Sisa Karakter" : 'Remaining Characters'} : {50 - title.length}
          </p>
        </div>
        <div className="flex gap-1 flex-col">
          <label
            htmlFor="blog"
            className={`font-bold text-md duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {locale === 'in' ? 'Isi' : 'Body'}
          </label>
          <textarea
            value={body}
            id="blog"
            disabled={disabled}
            onChange={onChangeBody}
            name="blog"
            className={`border h-20 rounded py-1 px-2 duration-300 ${
              isDarkMode
                ? 'bg-black border-gray-300 text-gray-300'
                : 'border-gray-700 text-gray-700'
            }`}
            placeholder={locale === 'in' ? 'Masukan Isi' : 'Enter Body'}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500" isLoading={disabled} width="py-1 px-4">
            {locale === 'in' ? 'Simpan' : 'Save'}
          </Button>
          {/* <button type="submit" isLoading={disabled} className="border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded py-1 px-4">
            Simpan
          </button> */}
        </div>
      </form>
    </div>
  );
}