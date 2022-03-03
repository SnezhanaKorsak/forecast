import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppRootStateType } from "../../state/store";
import { changeTheme, Theme } from "../../state/themeReducer";
import "./styles.scss";

import { CollapsedToggle } from "../../common/CollapsedToggle";

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector<AppRootStateType, string>(
    (state) => state.theme.themes
  );
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const [themeCollapsed, setThemeCollapsed] = useState(false);

  useEffect(() => {
    const isCollapsedLS = localStorage.getItem("themeCollapsed");
    if (isCollapsedLS) {
      setThemeCollapsed(JSON.parse(isCollapsedLS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themeCollapsed", JSON.stringify(themeCollapsed));
  }, [themeCollapsed]);

  const collapsedHandler = () => {
    setThemeCollapsed(!themeCollapsed);
  };

  const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTheme(e.currentTarget.id as Theme));
  };

  return (
    <div className="theme-toggle-block">
      <div className="theme-toggle-label">
        <span>{t("settings.mode")}</span>
        <CollapsedToggle callback={collapsedHandler} />
      </div>
      <hr />
      {!themeCollapsed && (
        <div>
          <div className="checkbox-item">
            <input
              type="radio"
              name="theme"
              id="light"
              checked={theme === "light"}
              onChange={onChangeCallback}
            />
            <label htmlFor="light">{t("settings.light-mode")}</label>
          </div>

          <div className="checkbox-item">
            <input
              type="radio"
              name="theme"
              id="dark"
              checked={theme === "dark"}
              onChange={onChangeCallback}
            />
            <label htmlFor="dark">{t("settings.dark-mode")}</label>
          </div>
        </div>
      )}
    </div>
  );
};
