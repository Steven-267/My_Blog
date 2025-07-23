import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/My_Blog/",

  lang: "zh-CN",
  title: "Steven267的技术博客",
  description: "记录技术学习和面试准备的博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
