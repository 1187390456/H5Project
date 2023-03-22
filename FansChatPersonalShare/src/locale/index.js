import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import ar from "./public/ar-EG";
import en from "./public/en-US";
import zh from "./public/zh-CN";
import ko from "./public/ko-KR";
import de from "./public/de-DE";
import fr from "./public/fr-FR";
import ja from "./public/ja-JP";

const defaultLocale = localStorage.getItem("locale") || "en";

const i18n = new VueI18n({
  locale: defaultLocale, // 默认语言
  messages: {
    ar: ar,
    en: en,
    zh: zh,
    ko: ko,
    de: de,
    fr: fr,
    ja: ja,
  },
  silentTranslationWarn: true, //去除国际警告
});

export default i18n;
