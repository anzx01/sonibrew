# 运动打点器 - Workout Beat Timer

一个基于 iOS Human Interface Guidelines 打造的现代化运动打点器应用，支持自定义节拍、语音计数和背景音乐。

[![许可协议: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)

## ✨ 特点

- 🍎 **iOS 17+ 设计** - 严格遵循 Apple Human Interface Guidelines
- 🎨 **原生质感** - 真实的 iOS 毛玻璃效果、阴影和动画
- 🌓 **完美深色模式** - iOS 官方配色方案
- 📱 **响应式设计** - 完美适配移动端和桌面端
- ⚡ **高性能** - 基于 Vite 构建，极速热更新

## 🌟 主要功能

### 核心功能
- **节拍播放器**: 可调节的节拍器式播放器（30-200 BPM）
- **语音计数**: 集成 Web Speech API 进行数字计数（中文/英文）
- **背景音乐**: 内置背景音乐，支持开关和独立音量控制
- **计时器模式**: 可选倒计时器（5-60分钟），自动停止
- **多种声音类型**: 哔哔声、滴答声、拍手声、铃声和人声

### 设置与自定义
- **BPM 控制**: iOS 风格滑块 + 预设（慢速: 45、中速: 60、快速: 90）
- **音量控制**: 节拍、语音和背景音乐独立音量控制
- **语音选项**: 选择语言（中文/英文）和声音风格（男声/女声）
- **计数范围**: 可配置的最大计数（1-8、1-10、1-20）
- **声音类型**: 5种内置声音类型可选

### 数据存储
- **本地存储**: 所有设置自动保存到 LocalStorage
- **无需服务器**: 完全本地运行，保护隐私

### 用户体验
- **iOS 设计语言**: SF Pro 字体、8pt 网格系统、标准圆角和阴影
- **流畅动画**: iOS 标准缓动曲线和时长（150-500ms）
- **深色模式**: 根据系统偏好自动切换 iOS 官方配色
- **多语言**: 中英文界面，一键切换
- **渐进式 Web 应用**: 可在移动设备上安装
- **浏览器通知**: 可选的计时器完成通知

## 🚀 快速开始

### 环境要求
- Node.js 18+ 和 npm/yarn/pnpm

### 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

应用将在 `http://localhost:3000` 上运行

## 📱 部署

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. Vercel 将自动检测配置并部署

### 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 GitHub Actions 作为源
4. `.github/workflows/deploy.yml` 中的工作流将自动部署

**访问地址**: `https://yourusername.github.io/repository-name`

## 🎵 音频资源

应用使用 Web Audio API 生成内置声音。您也可以从以下免费资源下载自定义音频文件：

- [Freesound.org](https://freesound.org/) - 大型音效库
- [Pixabay 音效](https://pixabay.com/music/sound-effects/) - 免费音乐和音效
- [Zapsplat](https://www.zapsplat.com/) - 专业音效

**支持的格式**: MP3、WAV、OGG

## 🎯 使用方法

### 基础锻炼

1. **设置 BPM**: 调整滑块设置所需节奏（默认: 60 BPM）
2. **选择声音**: 从哔哔声、滴答声、拍手声、铃声、人声中选择
3. **开始**: 点击开始按钮
4. **锻炼**: 跟随节拍进行运动
5. **停止**: 完成后点击停止

### 使用语音计数

1. 打开设置
2. 启用"语音计数"
3. 选择语言（中文/英文）
4. 选择最大计数（1-8、1-10 或 1-20）
5. 根据需要调整语音音量
6. 应用将有节奏地数出数字

### 计时器模式

1. 打开设置
2. 启用"计时器模式"
3. 设置时长（5-60 分钟）
4. 开始锻炼
5. 计时器完成后应用将自动停止

## 🏗️ 项目结构

```
workout-beat-timer/
├── src/
│   ├── components/       # React UI 组件（iOS 风格）
│   │   ├── Button.tsx    # iOS 按钮组件
│   │   ├── Card.tsx      # iOS 卡片组件
│   │   ├── Slider.tsx    # iOS 滑块组件
│   │   ├── Player.tsx    # 播放器主界面
│   │   ├── Settings.tsx  # 设置面板
│   │   ├── Presets.tsx   # 预设管理
│   │   └── History.tsx   # 历史记录
│   ├── hooks/           # 自定义 React hooks
│   │   ├── useAudioPlayer.ts
│   │   └── useBackgroundMusic.ts
│   ├── utils/           # 工具函数
│   │   ├── audioEngine.ts
│   │   ├── voiceEngine.ts
│   │   └── storage.ts
│   ├── i18n/            # 国际化
│   │   ├── zh.ts        # 中文翻译
│   │   └── en.ts        # 英文翻译
│   ├── types.ts         # TypeScript 类型定义
│   ├── constants.ts     # 应用常量
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 入口文件
│   └── index.css        # iOS 17+ 设计系统
├── public/              # 静态资源
│   ├── manifest.json    # PWA 配置
│   └── *.mp3           # 内置背景音乐
├── .github/             # GitHub Actions 工作流
├── package.json
├── vite.config.js
├── tsconfig.json
├── vercel.json         # Vercel 部署配置
└── README.md
```

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **音频**: Web Audio API + Howler.js
- **语音**: Web Speech API (SpeechSynthesis)
- **国际化**: i18next + react-i18next
- **存储**: LocalStorage API
- **通知**: Notification API
- **设计系统**: iOS 17+ HIG
  - SF Pro 字体系统
  - iOS 8pt 网格系统
  - iOS 官方色彩系统
  - iOS 毛玻璃效果
  - iOS 标准圆角和阴影
  - iOS 缓动曲线和动画

## 🌐 浏览器兼容性

- Chrome 100+ ✅
- Safari 15+ ✅
- Firefox 100+ ✅
- Edge 100+ ✅

**移动端**: iOS Safari 15+、Chrome Mobile、Android Browser

## 📝 功能详解

### 音频引擎
- 使用 Web Audio API 振荡器实时生成节拍
- 5 种内置声音类型（哔哔声、滴答声、拍手声、铃声、人声）
- 精确计时，延迟 <100ms

### 语音计数
- Web Speech API 语音合成（SpeechSynthesis）
- 中英文数字发音
- 声音风格选择（男声/女声）
- 速率与 BPM 同步调节

### 背景音乐
- 内置背景音乐文件
- 循环播放
- 独立音量控制
- 自动与节拍/语音混合

### iOS 设计系统
- **色彩**: iOS 17+ 官方色彩（蓝色、绿色、红色等）
- **字体**: SF Pro Display/Text 字体层级
- **间距**: 8pt 网格系统（4, 8, 12, 16, 20, 24...）
- **圆角**: 标准 iOS 圆角（6, 8, 12, 16, 20, 24px）
- **阴影**: 精确的双层阴影系统
- **毛玻璃**: 真实的 iOS 毛玻璃效果（72%/85% 透明度）
- **动画**: iOS 标准缓动曲线和时长（150-500ms）

### 数据持久化
- 设置自动保存到 LocalStorage
- 无需服务器，完全本地运行

## 🔒 隐私与安全

- **无数据收集**: 所有数据本地存储
- **无需服务器**: 首次加载后完全离线工作
- **无第三方跟踪**: 零分析或广告
- **建议使用 HTTPS**: 安全部署

## 🎨 自定义

### iOS 设计系统
应用采用完整的 iOS 17+ 设计系统，所有样式变量在 `src/index.css` 中定义：

```css
:root {
  /* iOS 官方色彩 */
  --ios-blue: #007AFF;
  --ios-green: #34C759;
  --ios-red: #FF3B30;

  /* iOS 字体层级 */
  .text-title1 { font-size: 28px; font-weight: 700; }
  .text-headline { font-size: 17px; font-weight: 600; }
  .text-body { font-size: 17px; font-weight: 400; }

  /* iOS 8pt 网格系统 */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --spacing-6: 24px;

  /* iOS 圆角 */
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* iOS 阴影 */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### 添加新声音类型
编辑 `src/utils/audioEngine.ts` 并在 `playBeatSound` 函数中添加新的 case。

### 添加新语言
1. 在 `src/i18n/` 中创建翻译文件
2. 添加到 `src/i18n/index.ts`
3. 在 App.tsx 中更新语言选择器

### 自定义主题
所有 iOS 设计变量都在 `src/index.css` 中，可以根据需要调整：
- 修改 `--primary-color` 改变主题色
- 修改 `--radius-*` 调整圆角大小
- 修改 `--shadow-*` 调整阴影强度
- 修改 `--transition-*` 调整动画时长

## 🐛 故障排除

### 音频无法播放
- 确保已与页面交互（浏览器自动播放策略）
- 检查浏览器控制台错误
- 尝试刷新页面

### 语音不工作
- 验证浏览器是否支持 Web Speech API
- 检查系统语音设置
- 尝试不同的声音风格选项

### 自定义声音无法上传
- 确保文件为 MP3 或 WAV 格式
- 检查文件大小（建议 <5MB）
- 尝试不同的浏览器

## 📄 许可证

MIT License - 欢迎将此项目用于个人或商业目的。

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📧 支持

如有问题或疑问，请在 GitHub 上提出 issue。

## 🙏 致谢

- 设计灵感来自 [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- 使用 [React](https://reactjs.org/) 构建
- 由 [Vite](https://vitejs.dev/) 驱动
- 音频管理使用 [Howler.js](https://howlerjs.com/)
- 国际化由 [i18next](https://www.i18next.com/) 提供

---

**🍎 严格遵循 iOS Human Interface Guidelines 打造**
