import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { AppRootStateType } from "../../state/store";
import { setRootError } from "../../state/appReducer";
import "./styles.scss";

export const ErrorSnackBar = () => {
  const dispatch = useDispatch();
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.rootError
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(setRootError(null));
    }, 3000);
  }, []);

  const handleClose = () => {
    dispatch(setRootError(null));
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
