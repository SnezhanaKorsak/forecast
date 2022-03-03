import React from "react";
import { useTranslation } from "react-i18next";
import { SidebarHeader } from "../../Sidebar/SidebarHeader";
import { UnitsConverterMenu } from "../../UnitsConverterMenu";
import { ThemeToggle } from "../../ThemeToggle";
import { LanguageToggle } from "../../LanguageToggle";
import { SettingsMenuProps } from "./types";
import "./styles.scss";

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ setActive }) => {
  const { t } = useTranslation();

  return (
    <>
      <SidebarHeader setActive={setActive}>
        <div className="settings-title">{t("title.settings")}</div>
      </SidebarHeader>
      <UnitsConverterMenu />
      <ThemeToggle />
      <LanguageToggle />
    </>
  );
};
