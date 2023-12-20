import React, { createContext, useContext, useReducer, useEffect } from "react";

export const CustomStateContext = createContext();
export const CustomDispatchContext = createContext();

const initialState = {
  customFavorites: JSON.parse(localStorage.getItem("storedFavorites")) || [],
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

export const CustomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "storedFavorites",
      JSON.stringify(state.customFavorites)
    );
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
