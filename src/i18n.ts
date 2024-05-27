// import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend, { HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";
import { PageUrl } from "./utils/constant";
declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
const backendOptions: HttpBackendOptions = {
    loadPath: PageUrl +"wp-json/lang/{{lng}}",
    request: (_options, url, _payload, callback) => {
        try {
            fetch(url).then((res) =>
                res.json().then((r) => {
                    callback(null, {
                        data: JSON.stringify(r),
                        status: 200,
                    });
                })
            );
        } catch (e) {
            console.log(e, "error from language");
            callback(null, {
                status: 500,
                data: "",
            });
        }
    },
};
export const languages = ["vi", "en"];
const i18n = i18next.createInstance();
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: languages,
        ns: ["translation"],
        preload: languages,
        debug: false,
        returnNull: false,
        interpolation: {
            escapeValue: false,
        },
        backend: backendOptions,
    })
    .then();

export default i18n;
