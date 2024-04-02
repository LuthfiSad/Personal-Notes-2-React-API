import { useEffect } from "react";
import { getUsername } from "../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useInfoDispatch } from "../context";
import PropTypes from "prop-types";

export default function useLogin(status) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const dispatch = useInfoDispatch();

  window.addEventListener("offline", () => {
    if(!navigator.onLine){
      window.location.reload();
    }
  });
  window.addEventListener("online", () => {
    if(navigator.onLine){
      window.location.reload();
    }
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "token" && e.newValue) {
      window.location.reload();
    }
  });

  useEffect(() => {
    if (!token && status) {
      Swal.fire({
        icon: "error",
        text: "Please login first",
      }).then(() => {
        navigate("/");
      });
      return;
    }
    if (token) {
      getUsername(token, dispatch)
        .then(() => {
          if (!status) {
            Swal.fire({
              icon: "error",
              text: "Already logged in",
            }).then(() => {
              navigate("/notes");
            });
          }
        })
        .catch((err) => {
          if(err){
            console.log(err);
          } else if (status) {
            Swal.fire({
              icon: "error",
              text: "Please login first",
            }).then(() => {
              navigate("/");
            });
          }
          dispatch({ type: "CHANGE_LOADING", payload: false });
          localStorage.removeItem("token");
        });
    } else {
      dispatch({ type: "CHANGE_LOADING", payload: false });
    }
  }, [location.pathname]);
}

useLogin.propTypes = {
  status: PropTypes.bool.isRequired
}