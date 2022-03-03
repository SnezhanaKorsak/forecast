import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsedToggle } from "../../common/CollapsedToggle";
import "./styles.scss";

export const LanguageToggle = () => {
  const [languageCollapsed, setLanguageCollapsed] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const isCollapsedLS = localStorage.getItem("languageCollapsed");
    if (isCollapsedLS) {
      setLanguageCollapsed(JSON.parse(isCollapsedLS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "languageCollapsed",
      JSON.stringify(languageCollapsed)
    );
  }, [languageCollapsed]);

  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng");

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.currentTarget.id);
  };

  const collapsedHandler = () => {
    setLanguageCollapsed(!languageCollapsed);
  };

  return (
    <div className="language-toggle-container">
      <div className="language-toggle-label">
        <span>{t("settings.language")}</span>
        <CollapsedToggle callback={collapsedHandler} />
      </div>
      <hr />
      {!languageCollapsed && (
        <div>
          <div className="language-items">
            <div className="checkbox-item">
              <input
                type="radio"
                name="language"
                id="en"
                checked={currentLanguage === "en"}
                onChange={changeLanguage}
              />
              <label htmlFor="en">{t("settings.english")}</label>
            </div>

            <div className="checkbox-item">
              <input
                type="radio"
                name="language"
                id="ru"
                checked={currentLanguage === "ru"}
                onChange={changeLanguage}
              />
              <label htmlFor="ru">{t("settings.russian")}</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
