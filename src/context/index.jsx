import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const infoContext = createContext(null);

const infoDispatchContext = createContext(null);

const infoReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_USERNAME":  
      return {
        ...state,
        username: action.payload
      }
    case "CHANGE_LOADING":
      return {
        ...state,
        isLoading: action.payload
      }
    case "CHANGE_DARK_MODE":
      return {
        ...state,
        isDarkMode: action.payload
      }
    case "ADD_NOTES":
      return {
        ...state,
        notes: action.payload
      }
    case "CHANGE_LOCALE":
      if(action.payload === 'en') {
        return {
          ...state,
          locale: 'en'
        }
      } else {
        return {
          ...state,
          locale: 'in'
        }
      }
    default:
      return state
  }
}

const initialState = {
  username: "",
  isLoading: true,
  isDarkMode: localStorage.getItem("theme") === "dark" ? true : false,
  notes: [],
  isOnline: navigator.onLine,
  locale: localStorage.getItem('locale') || 'id'
};

export function InfoProvider({ children }) {
  const [info, dispatch] = useReducer(infoReducer, initialState);
  return (
    <infoContext.Provider value={info}>
      <infoDispatchContext.Provider value={dispatch}>
        {children}
      </infoDispatchContext.Provider>
    </infoContext.Provider>
  );
}

InfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useInfo() {
  return useContext(infoContext);
}

export function useInfoDispatch() {
  return useContext(infoDispatchContext);
}