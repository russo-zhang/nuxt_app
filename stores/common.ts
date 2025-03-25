import { defineStore } from "pinia";

interface LangItem {
    code: string;
    name: string;
    label: string;
}
export const useCommonStore = defineStore("common", {
    state: () => {
        return {
            currentLang: "en",
            acitveCateId: 0,
            langList: [
                {
                    code: "en",
                    name: "English",
                    label: "Language Selection",
                },
                {
                    code: "tc",
                    name: "繁体中文",
                    label: "语言选择",
                },
            ] as LangItem[],
        };
    },
    getters: {
        currentLangItem(): LangItem {
            return this.langList.find((item) => item.code === this.currentLang) || this.langList[0];
        },
    },
    actions: {
        setLang(lang: string) {
            this.currentLang = lang;
        },
    },
});
