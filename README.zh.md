# SoniBrew - 运动打点器

一个现代化的运动打点器应用，采用 iPhone 16 Pro Max 设计风格，支持实时节拍调整、语音计数和背景音乐。

[![许可协议: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple)](https://vitejs.dev/)

## ✨ 特点

- 📱 **iPhone 16 Pro Max 设计** - 完整的设备框架，包含 Dynamic Island 和 Home Indicator
- 🎨 **炫彩渐变 UI** - 3D 深度效果、动态渐变和流畅动画
- 🌓 **深色主题** - 专为深色模式优化的视觉体验
- ⚡ **实时调速** - 播放中可实时调整 BPM，无需停止
- 🚀 **高性能** - 基于 Vite 7 构建，使用 Web Audio API 实现精确计时

## 🌟 主要功能

### 核心功能
- **实时节拍调整**: 可在播放中实时调整 BPM（30-200），无需停止
- **精确计时**: 使用 Web Audio API 和 setTimeout 实现精确节拍调度
- **语音计数**: 集成 Web Speech API 进行数字计数（中文/英文）
- **背景音乐**: 内置 4 首背景音乐，支持循环播放和独立音量控制
- **计时器模式**: 可选倒计时器（5-60分钟），自动停止并发送通知
- **多种声音类型**: 哔哔声、滴答声、拍手声、铃声和人声（使用 Web Audio API 生成）

### 设置与自定义
- **实时 BPM 控制**: 使用 Radix UI Slider，支持播放中实时调速
- **音量控制**: 节拍、语音和背景音乐独立音量控制（0-100%）
- **语音选项**: 选择语言（中文/英文）和声音风格（男声/女声）
- **计数范围**: 可配置的最大计数（8、10、20）
- **声音类型**: 5 种内置声音类型（beep、tick、clap、bell、voice）

### 数据存储与历史
- **自动保存**: 所有设置自动保存到 LocalStorage
- **运动记录**: 自动记录每次运动的时长、BPM 和设置
- **无需服务器**: 完全本地运行，保护隐私

### 用户体验
- **iPhone 16 Pro Max 设计**: 完整的设备框架，包含 Dynamic Island、Home Indicator 和钛金属边框效果
- **炫彩渐变**: 多色渐变文字和按钮，带 3D 深度效果和阴影
- **流畅动画**: 按钮点击缩放、计数高亮等交互动画
- **深色主题**: 专为深色模式优化，使用渐变背景
- **多语言**: 中英文界面，一键切换（自动同步语音语言）
- **浏览器通知**: 计时器完成时发送系统通知

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
sonibrew/
├── src/
│   ├── components/           # React UI 组件
│   │   ├── ui/              # Radix UI + Tailwind 基础组件
│   │   │   ├── button.tsx   # 按钮组件
│   │   │   ├── card.tsx     # 卡片组件
│   │   │   ├── slider.tsx   # 滑块组件（实时调速）
│   │   │   ├── switch.tsx   # 开关组件
│   │   │   ├── select.tsx   # 选择器组件
│   │   │   └── dialog.tsx   # 对话框组件
│   │   ├── Player.tsx       # 播放器主界面（炫彩渐变设计）
│   │   ├── Settings.tsx     # 设置面板
│   │   ├── Presets.tsx      # 预设管理
│   │   └── History.tsx      # 历史记录
│   ├── hooks/               # 自定义 React hooks
│   │   ├── useAudioPlayer.ts    # 音频播放器逻辑（实时调速）
│   │   └── useBackgroundMusic.ts # 背景音乐管理
│   ├── utils/               # 工具函数
│   │   ├── audioEngine.ts   # Web Audio API 音频引擎
│   │   ├── voiceEngine.ts   # Web Speech API 语音引擎
│   │   ├── storage.ts       # LocalStorage 管理
│   │   └── logger.ts        # 日志工具
│   ├── i18n/                # 国际化
│   │   ├── index.ts         # i18next 配置
│   │   ├── zh.ts            # 中文翻译
│   │   └── en.ts            # 英文翻译
│   ├── lib/                 # 库工具
│   │   └── utils.ts         # Tailwind 工具函数
│   ├── types.ts             # TypeScript 类型定义
│   ├── constants.ts         # 应用常量
│   ├── App.tsx              # 主应用组件（iPhone 16 Pro Max 框架）
│   ├── main.tsx             # 入口文件
│   └── index.css            # Tailwind CSS + 自定义样式
├── public/                  # 静态资源
│   ├── manifest.json        # PWA 配置
│   ├── vite.svg            # 应用图标
│   └── *.mp3               # 内置背景音乐（4首）
├── package.json
├── vite.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript 5
- **构建工具**: Vite 7
- **UI 组件**: Radix UI (Dialog, Select, Slider, Switch, Slot)
- **样式**: Tailwind CSS 3.4 + tailwindcss-animate
- **工具库**:
  - class-variance-authority - 组件变体管理
  - clsx + tailwind-merge - 类名合并
  - lucide-react + react-icons - 图标库
- **音频**:
  - Web Audio API - 节拍声音生成和精确计时
  - Howler.js 2.2 - 背景音乐播放
- **语音**: Web Speech API (SpeechSynthesis) - 语音计数
- **国际化**: i18next + react-i18next + i18next-browser-languagedetector
- **存储**: LocalStorage API - 设置和历史记录
- **通知**: Notification API - 计时器完成通知
- **设计风格**: iPhone 16 Pro Max 设计
  - Dynamic Island 和 Home Indicator
  - 钛金属边框效果
  - 炫彩渐变和 3D 深度效果
  - 流畅的交互动画

## 🌐 浏览器兼容性

- Chrome 100+ ✅
- Safari 15+ ✅
- Firefox 100+ ✅
- Edge 100+ ✅

**移动端**: iOS Safari 15+、Chrome Mobile、Android Browser

## 📝 功能详解

### 实时调速技术
- **播放中调速**: 使用 ref 存储当前 BPM，实现播放中实时调整速度
- **智能重调度**: BPM 变化时立即清除当前 timeout 并重新调度下一次节拍
- **人声实时调速**: 人声节拍模式下，BPM 变化时立即取消当前语音并应用新速率
- **精确计时**: 使用 `setTimeout` 递归调度，根据 BPM 动态计算延迟时间

### 音频引擎
- **Web Audio API**: 使用振荡器实时生成节拍声音
- **5 种声音类型**: beep（正弦波）、tick（方波）、clap（白噪声）、bell（三角波）、voice（人声）
- **精确计时**: 延迟 <100ms，适合高强度运动
- **音量控制**: 独立的节拍音量控制（0-100%）

### 语音计数
- **Web Speech API**: 使用 SpeechSynthesis 进行语音合成
- **中英文支持**: 自动选择系统语音（中文/英文）
- **声音风格**: 男声/女声选择
- **速率同步**: 语音速率根据 BPM 自动调整（60 BPM = 1.0x，120 BPM = 1.5x）
- **智能计数**: 支持 8、10、20 计数循环

### 背景音乐
- **Howler.js 管理**: 使用 Howler.js 进行音频文件播放
- **4 首内置音乐**: xm2544.mp3、xm3242.mp3、xm3251.mp3、y1891.mp3
- **循环播放**: 自动循环，无缝衔接
- **独立音量**: 背景音乐音量独立控制，不影响节拍和语音
- **自动混合**: 与节拍和语音自动混合播放

### iPhone 16 Pro Max 设计
- **设备框架**: 完整的 iPhone 16 Pro Max 外观（430x932px）
- **Dynamic Island**: 顶部动态岛设计（126x37px，19px 圆角）
- **Home Indicator**: 底部主屏幕指示器（134x5px）
- **钛金属边框**: 渐变边框效果，模拟钛金属质感
- **炫彩渐变**: 多色渐变文字和按钮（蓝-紫-粉-橙-绿）
- **3D 深度**: 多层阴影和内阴影，营造 3D 立体感
- **流畅动画**: 按钮点击缩放（scale-95）、计数高亮等交互动画

### 数据持久化
- **自动保存**: 设置变化时自动保存到 LocalStorage
- **运动记录**: 每次运动结束自动记录（时长、BPM、设置）
- **存储键**: 使用命名空间前缀（workoutbeat_*）避免冲突

## 🔒 隐私与安全

- **无数据收集**: 所有数据本地存储
- **无需服务器**: 首次加载后完全离线工作
- **无第三方跟踪**: 零分析或广告
- **建议使用 HTTPS**: 安全部署

## 🎨 自定义

### 修改设计风格
应用使用 Tailwind CSS 和内联样式，主要样式在以下文件中：

**`src/components/Player.tsx`** - 播放器界面的渐变和 3D 效果
```tsx
// 修改渐变色
background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #EC4899 100%)'

// 修改阴影
boxShadow: '0 8px 32px rgba(16, 185, 129, 0.6)'
```

**`src/App.tsx`** - iPhone 框架和背景
```tsx
// 修改背景渐变
background: 'radial-gradient(circle at 50% 0%, #2C2C2E 0%, #1C1C1E 50%, #000000 100%)'

// 修改边框渐变（钛金属效果）
background: 'linear-gradient(135deg, #4A4A4C 0%, #2C2C2E 25%, #1C1C1E 50%, #2C2C2E 75%, #4A4A4C 100%)'
```

**`src/index.css`** - Tailwind 配置和全局样式
```css
/* 修改 CSS 变量 */
:root {
  --background-color: #000000;
  --surface-color: #1C1C1E;
  --text-primary: #FFFFFF;
}
```

### 添加新声音类型
编辑 `src/utils/audioEngine.ts` 中的 `playBeatSound` 函数：

```typescript
case 'custom':
  oscillator.type = 'sawtooth'; // 锯齿波
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 音高
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  break;
```

### 添加新语言
1. 在 `src/i18n/` 中创建翻译文件（如 `ja.ts`）
2. 添加到 `src/i18n/index.ts` 的 resources
3. 在 `src/App.tsx` 中更新语言切换按钮
4. 在 `src/components/Settings.tsx` 中添加语言选项

### 修改 BPM 范围
编辑 `src/constants.ts`：

```typescript
export const MIN_BPM = 20;  // 最小 BPM
export const MAX_BPM = 300; // 最大 BPM
export const DEFAULT_BPM = 60; // 默认 BPM
```

### 添加背景音乐
1. 将 MP3 文件放入 `public/` 目录
2. 在 `src/components/Settings.tsx` 中添加音乐选项
3. 文件会自动被 Vite 处理并可通过 `/filename.mp3` 访问

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

- 设计灵感来自 [Apple iPhone 16 Pro Max](https://www.apple.com/iphone-16-pro/)
- 使用 [React](https://reactjs.org/) 构建
- 由 [Vite](https://vitejs.dev/) 驱动
- UI 组件基于 [Radix UI](https://www.radix-ui.com/)
- 样式使用 [Tailwind CSS](https://tailwindcss.com/)
- 音频管理使用 [Howler.js](https://howlerjs.com/)
- 国际化由 [i18next](https://www.i18next.com/) 提供
- 图标来自 [Lucide React](https://lucide.dev/) 和 [React Icons](https://react-icons.github.io/react-icons/)

## ⚡ 性能特性

- **快速启动**: Vite 7 提供极速的开发服务器启动（<1s）
- **即时热更新**: HMR 更新延迟 <100ms
- **小体积构建**: 生产构建经过优化和代码分割
- **精确计时**: Web Audio API 提供 <100ms 的节拍延迟
- **实时响应**: BPM 调整立即生效，无需重启播放
- **流畅动画**: 60fps 的 CSS 动画和过渡效果
- **内存优化**: 使用 ref 避免不必要的重渲染
- **智能调度**: 使用 setTimeout 递归调度，避免 setInterval 的累积误差

---

**📱 采用 iPhone 16 Pro Max 设计风格打造**
