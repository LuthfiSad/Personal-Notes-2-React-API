import SearchInput from "../Fragments/SearchInput";
import ToogleDarkMode from "../Fragments/ToogleDarkMode";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useInfo, useInfoDispatch } from "../../context";
import Button from "../Elements/Button";
import { logout } from "../../services/auth.service";
import Swal from "sweetalert2";
import Dropdown from "../Fragments/DropDown";

export default function Navbar({ disabled = true }) {
  const { username, isDarkMode, locale } = useInfo();
  const dispatch = useInfoDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      text: locale === "in" ? "Apakah anda yakin ingin keluar?" : "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: locale === "in" ? "Keluar" : "Logout",
      cancelButtonText: locale === "in" ? "Batal" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(dispatch).then(() => {
          Swal.fire({
            icon: "success",
            text: locale === "in" ? "Berhasil Logout" : "Logout Success",
          }).then(() => {
            navigate("/");
          })
        });
      }
    });
  }

  return (
    <header className={`flex md:justify-between justify-center md:flex-row flex-col z-10 gap-2 py-3 duration-300 sticky top-0 select-none ${isDarkMode ? "bg-gray-900 border-white" : "bg-gray-300 border-black"} border-b md:px-20 px-2 flex-wrap items-center`}>
      <h1 className={`text-2xl italic duration-300 ${isDarkMode && "text-white"} font-bold`}>
        {locale === "in" ? "AplikasiCatatan" : "NotesApp"}
      </h1>
      <div className="flex gap-2 flex-wrap justify-center">
        { disabled && <SearchInput />}
        <Dropdown />
        <ToogleDarkMode />
        {username && <Button className="bg-red-500 border-red-500 text-white" onclick={() => handleLogout()}>Logout</Button>}
      </div>
    </header>
  );
}

Navbar.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
