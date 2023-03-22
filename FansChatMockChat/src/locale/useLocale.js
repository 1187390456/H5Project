import { computed } from "vue";

export default function useLocale(vue) {
  const currentLocale = computed(() => {
    return vue.$i18n.locale; // 获取当前语言设置
  });
  // 切换语言
  const changeLocale = (value) => {
    vue.$i18n.locale = value; //赋值切换语言
    localStorage.setItem("locale", value); //修改本地存储
    vue.$forceUpdate();
  };
  return {
    currentLocale,
    changeLocale,
  };
}
