import {
  PortfolioPage,
  PortfolioPageProps,
} from "./components/ui/starfall-portfolio-landing";

const customPortfolioData: PortfolioPageProps = {
  logo: {
    initials: (
      <img src="/logo.png" alt="AI Chat Navigator" className="w-6 h-6" />
    ),
    name: "AI Chat Navigator",
  },
  navLinks: [
    { label: "安装", href: "#install" },
    { label: "功能", href: "#projects" },
    { label: "评价", href: "#skills" },
  ],
  resume: {
    label: "添加到 Chrome",
    onClick: () => {
      window.open(
        "https://chromewebstore.google.com/detail/ai-chat-navigator/elbbmbihlhjphakbegcimpnncepfbaom",
        "_blank",
      );
    },
  },
  hero: {
    titleLine1: "智能大纲导航",
    titleLine2Gradient: "AI 对话新体验",
    subtitle:
      "您的终极 Chrome 扩展程序，用于管理、组织和增强 AI 对话。无缝集成主流 AI 聊天平台，大幅提升工作效率。",
  },
  ctaButtons: {
    primary: {
      label: "免费安装扩展",
      onClick: () => {
        window.open(
          "https://chromewebstore.google.com/detail/ai-chat-navigator/elbbmbihlhjphakbegcimpnncepfbaom",
          "_blank",
        );
      },
    },
    secondary: {
      label: "了解更多",
      onClick: () => {
        document
          .getElementById("features")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
  },
  projects: [
    {
      title: "支持主流大模型",
      description:
        "全面适配多平台环境，各类设备与页面均可稳定运行，兼容性强，使用无门槛。",
      tags: ["跨平台运行","多设备适配","环境兼容无忧"],
      imageContent: (
        <div className="text-4xl">
          <img src="../public/mulit.png"></img>
        </div>
      ),
    },
    {
      title: "深浅主题自动适配",
      description:
        "该插件支持页面色彩实时切换，一键更换主题配色，适配各类界面，优化视觉浏览体验",
      tags: ["页面色彩切换","主题一键换新","视觉体验优化"],
      imageContent: (
        <div className="text-4xl">
          <img src="../public/history.png"></img>
        </div>
      ),
    },
    {
      title: "智能追溯轨迹",
      description:   "该工具插件支持历史记录查看，助您轻松追踪过往操作，提升使用效率。",
      tags: ["历史追踪记录", "操作轨迹回溯", "使用效率提升"],
      imageContent: (
        <div className="text-4xl">
          <img src="../public/quick.png"></img>
        </div>
      ),
    },
  ],
  stats: [
    { value: "10K+", label: "活跃用户" },
    { value: "4.8", label: "星级评分" },
    { value: "100%", label: "免费使用" },
  ],
  showAnimatedBackground: true,
};

export default function App() {
  return <PortfolioPage {...customPortfolioData} />;
}
