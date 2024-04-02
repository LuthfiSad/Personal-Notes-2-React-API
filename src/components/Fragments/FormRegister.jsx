import { useState } from "react";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "../Elements/Button";
import { useInfo, useInfoDispatch } from "../../context";
import { register } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";

export default function FormRegister() {
  const dispatch = useInfoDispatch();
  const { isLoading, isDarkMode, locale } = useInfo();
  const [name, onChangeName, resetName] = useInput("");
  const [email, onChangeEmail, resetEmail] = useInput("");
  const [password, onChangePassword, resetPassword] = useInput("");
  const [confirmPassword, onChangeConfirmPassword, resetConfirmPassword] = useInput("");
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true)

    if (!name) {
      resetPassword();
      resetConfirmPassword();
      setDisabled(false)
      Swal.fire({
        icon: "error",
        text: locale === 'in' ? 'Nama tidak boleh kosong' : 'Name cannot be empty',
      });
      return;
    }

    if (!email) {
      resetPassword();
      resetConfirmPassword();
      setDisabled(false)
      Swal.fire({
        icon: "error",
        text: locale === 'in' ? 'Email tidak boleh kosong' : 'Email cannot be empty',
      });
      return;
    }

    if (!password) {
      resetPassword();
      resetConfirmPassword();
      setDisabled(false)
      Swal.fire({
        icon: "error",
        text: locale === 'in' ? 'Password tidak boleh kosong' : 'Password cannot be empty',
      });
      return;
    }

    if (password !== confirmPassword) {
      resetPassword();
      resetConfirmPassword();
      setDisabled(false)
      Swal.fire({
        icon: "error",
        text: locale === 'in' ? 'Password tidak cocok' : 'Password does not match',
      })
      return;
    }
    
    register(name, email, password, dispatch).then(() => {
      Swal.fire({
        icon: "success",
        text: locale === 'in' ? 'Register Berhasil' : 'Register Success',
      }).then(() => {
        resetEmail();
        resetName();
        navigate("/");
      });
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        text: err,
      });
    })
    .finally(() => {
      resetPassword();
      resetConfirmPassword();
      setDisabled(false)
    });
  };

  return (
    <form className={`duration-300 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`} onSubmit={handleSubmit}>
      <div className="flex flex-col mb-3">
        <label className="text-sm font-bold" htmlFor="name">
          {`${locale === "in" ? "Nama : " : "Name : "} `}
        </label>
        <input
          className={`text-sm border rounded w-full py-1 px-3 duration-300 ${isDarkMode ? "text-slate-300 bg-black" : "text-slate-600"} placeholder:opacity-50 focus:outline-slate-500 ${disabled && "cursor-not-allowed"}`}
          type="text"
          placeholder="John Doe"
          name="name"
          id="name"
          value={name}
          onChange={onChangeName}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-sm font-bold" htmlFor="email">
          Email :{" "}
        </label>
        <input
          className={`text-sm border rounded w-full py-1 px-3 duration-300 ${isDarkMode ? "text-slate-300 bg-black" : "text-slate-600"} placeholder:opacity-50 focus:outline-slate-500 ${disabled && "cursor-not-allowed"}`}
          type="text"
          placeholder="example@email.com"
          name="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-sm font-bold" htmlFor="password">
          Password :{" "}
        </label>
        <div className="relative flex items-center">
          <input
            className={`text-sm border rounded w-full py-1 pl-3 pr-10 duration-300 ${isDarkMode ? "text-slate-300 bg-black" : "text-slate-600"} placeholder:opacity-50 focus:outline-slate-500 ${disabled && "cursor-not-allowed"}`}
            type={typePassword}
            placeholder="*****"
            name="password"
            id="password"
            onChange={onChangePassword}
            value={password}
            disabled={disabled}
          />
          <button
            type="button"
            onClick={() =>
              setTypePassword(typePassword === "password" ? "text" : "password")
            }
            className="absolute right-0 px-2 py-1"
          >
            {typePassword === "password" ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </div>
      <div className="flex flex-col mb-10">
        <label
          className="text-sm font-bold"
          htmlFor="confirmPassword"
        >
          {`${locale === "in" ? "Konfirmasi Password : " : "Confirm Password : "} `}
        </label>
        <div className="relative flex items-center">
          <input
            className={`text-sm border rounded w-full py-1 pl-3 pr-10 duration-300 ${isDarkMode ? "text-slate-300 bg-black" : "text-slate-600"} placeholder:opacity-50 focus:outline-slate-500 ${disabled && "cursor-not-allowed"}`}
            type={typeConfirmPassword}
            placeholder="*****"
            disabled={disabled}
            name="confirmPassword"
            id="confirmPassword"
            onChange={onChangeConfirmPassword}
            value={confirmPassword}
          />
          <button
            type="button"
            onClick={() =>
              setTypeConfirmPassword(
                typeConfirmPassword === "password" ? "text" : "password"
              )
            }
            className="absolute right-0 px-2 py-1"
          >
            {typeConfirmPassword === "password" ? (
              <FaRegEyeSlash />
            ) : (
              <FaRegEye />
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          isLoading={isLoading}
          width="w-1/2 py-1 px-3"
          className="border-blue-600 hover:text-white bg-transparent hover:bg-blue-600 text-blue-600"
          animated=""
        >
          Register
        </Button>
      </div>
    </form>
  );
}
