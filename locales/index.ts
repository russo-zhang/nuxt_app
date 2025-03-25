import { useCommonStore } from "@/stores/common";
import en from "./en";
import tc from "./tc";

const messages = {
    tc: tc,
    en: en,
};
const locale = useCommonStore().currentLang;
export default defineI18nConfig(() => {
    return {
        legacy: false,
        locale,
        messages,
    };
});
