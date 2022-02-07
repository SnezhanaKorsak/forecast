import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { AppRootStateType } from "../../state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { setError } from "../../state/appReducer";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";

export const ErrorSnackBar = () => {
  const dispatch = useDispatch();
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(setError(null));
    }, 10000);
  }, []);

  const handleClose = () => {
    dispatch(setError(null));
  };

  return (
    <div className="error-container">
      <FontAwesomeIcon icon={faExclamationCircle} size={"lg"} />
      <div className="error-message">Error: {error}</div>
      <div className={"exit-icon"}>
        <FontAwesomeIcon icon={faTimes} onClick={handleClose} size={"lg"} />
      </div>
    </div>
  );
};
