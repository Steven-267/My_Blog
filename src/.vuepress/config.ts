import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/My_Blog/",

  lang: "zh-CN",
  title: "Steven267的技术博客",
  description: "记录技术学习和面试准备的博客",

  // 添加头部标签，预加载关键资源
  head: [
    // 预加载首页背景图片，减少加载卡顿
    ['link', { rel: 'preload', href: '/My_Blog/assets/images/backgrounds/sunrise-mountain.png', as: 'image' }],
    // 添加DNS预解析，加速资源加载
    ['link', { rel: 'dns-prefetch', href: '//fonts.googleapis.com' }],
  ],

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
