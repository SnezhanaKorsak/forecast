import { AppActionsType } from "./actionsTypes";

export type LoadingStatusType = "idle" | "loading-weather" | "loading-forecast";
type InitialStateType = typeof initialState;

const initialState = {
  isLoading: "idle" as LoadingStatusType,
  error: null as string | null,
};

export const appReducer = (
  state = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET-LOADING":
      return { ...state, isLoading: action.isLoading };

    case "SET-ERROR":
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export const setLoading = (isLoading: LoadingStatusType) => {
  return {
    type: "SET-LOADING",
    isLoading,
  } as const;
};

export const setError = (error: string | null) => {
  return {
    type: "SET-ERROR",
    error,
  } as const;
};
