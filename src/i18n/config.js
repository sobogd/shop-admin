import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import category from "./ru/category";
import common from "./ru/common";

const resources = {
  ru: {
    category,
    common,
  },
};

i18n.use(initReactI18next).init({
  lng: "ru",
  ns: ["category", "common"],
  resources,
});

export default i18n;
