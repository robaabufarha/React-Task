import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  setLocalStorageData,
  getLocalStorageData,
} from "./services/localStorage";
export const CustomStateContext = createContext();
export const CustomDispatchContext = createContext();

const initialState = {
  customFavorites: getLocalStorageData("storedFavorites"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      const index = state.customFavorites.findIndex(
        (favorite) => favorite.name.common === action.payload.name.common
      );
      if (index === -1) {
        return {
          ...state,
          customFavorites: [...state.customFavorites, action.payload],
        };
      }
      return state;

    case "REMOVE_FAVORITE":
      const updatedCustomFavorites = state.customFavorites.filter(
        (country) => country.name.common !== action.payload.name.common
      );
      return { ...state, customFavorites: updatedCustomFavorites };

    default:
      return state;
  }
};
const getInitialState = () => {
  const storedCountries = getLocalStorageData("storedFavorites");
  return {
    customFavorites: storedCountries,
  };
};

export const CustomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, getInitialState);

  useEffect(() => {
    setLocalStorageData("storedFavorites", state.customFavorites);
  }, [state.customFavorites]);

  return (
    <CustomStateContext.Provider value={state}>
      <CustomDispatchContext.Provider value={dispatch}>
        {children}
      </CustomDispatchContext.Provider>
    </CustomStateContext.Provider>
  );
};

export const useCustomState = () => useContext(CustomStateContext);
export const useCustomDispatch = () => useContext(CustomDispatchContext);
