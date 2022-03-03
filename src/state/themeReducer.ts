import { ThemeActionsType } from "./actionsTypes";
import { Dispatch } from "redux";

export type Theme = "light" | "dark";

type initStateType = {
  themes: Theme;
};

const initState: initStateType = {
  themes: "light",
};

export const themeReducer = (
  state = initState,
  action: ThemeActionsType
): initStateType => {
  switch (action.type) {
    case "SET-THEME":
    case "CHANGE-THEME":
      return { ...state, themes: action.value };

    default:
      return state;
  }
};

//actions
export const setTheme = (value: Theme) => {
  return {
    type: "SET-THEME",
    value,
  } as const;
};

export const changeTheme = (value: Theme) => {
  return {
    type: "CHANGE-THEME",
    value,
  } as const;
};

//thunk
export const setThemeToState = () => {
  return (dispatch: Dispatch) => {
    const themeLS = localStorage.getItem("theme");
    if (themeLS) {
      const theme = JSON.parse(themeLS);
      dispatch(setTheme(theme));
    }
  };
};
