import { useState } from "react";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { login } from "../../services/auth.service";
import Button from "../Elements/Button";
import { useInfo, useInfoDispatch } from "../../context";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";

export default function FormLogin() {
  const dispatch = useInfoDispatch();
  const { isLoading, isDarkMode, locale } = useInfo();
  const [email, onChangeEmail, resetEmail] = useInput("");
  const [password, onChangePassword, resetPassword] = useInput("");
  const [typePassword, setTypePassword] = useState("password");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);

    if (!email) {
      resetPassword();
      setDisabled(false);
      Swal.fire({
        icon: "error",
        text:
          locale === "in"
            ? "Email tidak boleh kosong"
            : "Email cannot be empty",
      });
      return;
    }

    if (!password) {
      resetEmail();
      setDisabled(false);
      Swal.fire({
        icon: "error",
        text:
          locale === "in"
            ? "Password tidak boleh kosong"
            : "Password cannot be empty",
      });
      return;
    }

    login(email, password, dispatch)
      .then(() => {
        Swal.fire({
          icon: "success",
          text: locale === "in" ? "Login Berhasil" : "Login Success",
        }).then(() => {
          navigate("/notes");
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text:
            locale === "in"
              ? "Email atau Password salah"
              : "Wrong email or password",
        });
      })
      .finally(() => {
        resetEmail();
        resetPassword();
        setDisabled(false);
      });
  };

  return (
    <form
      className={`duration-300 ${
        isDarkMode ? "text-slate-300" : "text-slate-600"
      }`}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col mb-3">
        <label className="text-sm font-bold" htmlFor="email">
          Email :{" "}
        </label>
        <input
          className={`text-sm border rounded w-full py-1 px-3 duration-300 ${
            isDarkMode ? "text-slate-300 bg-black" : "text-slate-600"
          } placeholder:opacity-50 focus:outline-slate-500 ${
            disabled && "cursor-not-allowed"
          }`}
          type="text"
          placeholder="example@email.com"
          disabled={disabled}
          name="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="flex flex-col mb-10">
        <label className="text-sm font-bold" htmlFor="password">
          Password :{" "}
        </label>
        <div className="relative flex items-center">
          <input
            className={`text-sm border rounded w-full py-1 pl-3 pr-10 duration-300 ${
              isDarkMode ? "text-slate-300 bg-black" : "text-slate-600"
            } placeholder:opacity-50 focus:outline-slate-500 ${
              disabled && "cursor-not-allowed"
            }`}
            type={typePassword}
            placeholder="*****"
            disabled={disabled}
            name="password"
            id="password"
            onChange={onChangePassword}
            value={password}
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
      <div className="flex justify-center">
        <Button
          type="submit"
          isLoading={isLoading}
          width="w-1/2 py-1 px-3"
          className="border-blue-600 hover:text-white bg-transparent hover:bg-blue-600 text-blue-600"
        >
          Login
        </Button>
      </div>
    </form>
  );
}
