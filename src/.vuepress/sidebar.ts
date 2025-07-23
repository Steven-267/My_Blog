import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 数据结构与算法独立的侧边栏
  "/leetcode/": [
    {
      text: "哈希",
      icon: " fas fa-project-diagram",
      prefix: "哈希/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
    {
      text: "双指针",
      icon: " fas fa-project-diagram",
      prefix: "双指针/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
    {
      text: "滑动窗口",
      icon: " fas fa-project-diagram",
      prefix: "滑动窗口/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
    {
      text: "子串",
      icon: " fas fa-project-diagram",
      prefix: "子串/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
    {
      text: "数组",
      icon: " fas fa-project-diagram",
      prefix: "数组/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
    {
      text: "矩阵",
      icon: " fas fa-project-diagram",
      prefix: "矩阵/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
    {
      text: "链表",
      icon: " fas fa-project-diagram",
      prefix: "链表/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
  ],
  // 技术提升独立的侧边栏
  "/tech/": [
    {
      text: "技术场景",
      icon: "fas fa-sitemap",
      prefix: "场景/",
      children: "structure",
      collapsible: true,
      expanded: true,  // 默认展开
    },
  ],
  // 根目录和 intro 的配置
  "/": [
    "",
    "intro",
  ],
});
