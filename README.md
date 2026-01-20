# 运动打点器 - Workout Beat Timer

A modern workout beat timer app built following iOS Human Interface Guidelines, with customizable beat patterns, voice counting, and background music support.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)

## ✨ Highlights

- 🍎 **iOS 17+ Design** - Strictly follows Apple Human Interface Guidelines
- 🎨 **Native Feel** - Authentic iOS frosted glass effects, shadows, and animations
- 🌓 **Perfect Dark Mode** - iOS official color schemes
- 📱 **Responsive Design** - Perfect for mobile and desktop
- ⚡ **High Performance** - Built on Vite with instant HMR

### Core Functionality
- **Beat Player**: Adjustable metronome-style beat player (30-200 BPM)
- **Voice Counting**: Web Speech API integration for counting numbers (Chinese/English)
- **Background Music**: Built-in background music with on/off and volume control
- **Timer Mode**: Optional countdown timer (5-60 minutes) with auto-stop
- **Multiple Sound Types**: Beep, Tick, Clap, Bell, and Voice

### Settings & Customization
- **BPM Control**: iOS style slider + presets (Slow: 45, Medium: 60, Fast: 90)
- **Volume Controls**: Independent controls for beats, voice, and background music
- **Voice Options**: Choose language (Chinese/English) and voice style (Male/Female)
- **Count Range**: Configurable count maximum (1-8, 1-10, 1-20)
- **Sound Type**: 5 built-in sound types to choose from

### Data Storage
- **Local Storage**: All settings automatically saved to LocalStorage
- **No Server Required**: Completely local, privacy-focused

### User Experience
- **iOS Design Language**: SF Pro typography, 8pt grid system, standard border radius & shadows
- **Smooth Animations**: iOS standard easing curves and durations (150-500ms)
- **Dark Mode**: Automatic theme switching with iOS official color schemes
- **Multi-language**: Chinese and English with one-click toggle
- **Progressive Web App**: Installable on mobile devices
- **Browser Notifications**: Optional timer completion notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## 📱 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Vercel will automatically detect the configuration and deploy

### Deploy to GitHub Pages

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select GitHub Actions as the source
4. The workflow in `.github/workflows/deploy.yml` will automatically deploy

**Access your app at**: `https://yourusername.github.io/repository-name`

## 🎵 Audio Resources

The app uses Web Audio API to generate built-in sounds. You can also download custom audio files from these free resources:

- [Freesound.org](https://freesound.org/) - Large collection of sound effects
- [Pixabay Sound Effects](https://pixabay.com/music/sound-effects/) - Free music and sounds
- [Zapsplat](https://www.zapsplat.com/) - Professional sound effects

**Supported formats**: MP3, WAV, OGG

## 🎯 How to Use

### Basic Workout

1. **Set BPM**: Adjust the slider to set your desired tempo (default: 60 BPM)
2. **Choose Sound**: Select from Beep, Tick, Clap, Bell, or Voice
3. **Start**: Click the Start button to begin
4. **Exercise**: Follow the beat for your exercises
5. **Stop**: Click Stop when finished

### Using Voice Counting

1. Open Settings
2. Enable "Voice Counting"
3. Select language (Chinese/English)
4. Choose max count (1-8, 1-10, or 1-20)
5. Adjust voice volume as needed
6. The app will count numbers rhythmically

### Timer Mode

1. Open Settings
2. Enable "Timer Mode"
3. Set duration (5-60 minutes)
4. Start your workout
5. App will auto-stop when timer completes

## 🏗️ Project Structure

```
workout-beat-timer/
├── src/
│   ├── components/       # React UI components (iOS style)
│   │   ├── Button.tsx    # iOS button component
│   │   ├── Card.tsx      # iOS card component
│   │   ├── Slider.tsx    # iOS slider component
│   │   ├── Player.tsx    # Main player interface
│   │   ├── Settings.tsx  # Settings panel
│   │   ├── Presets.tsx   # Preset management
│   │   └── History.tsx   # History records
│   ├── hooks/           # Custom React hooks
│   │   ├── useAudioPlayer.ts
│   │   └── useBackgroundMusic.ts
│   ├── utils/           # Utility functions
│   │   ├── audioEngine.ts
│   │   ├── voiceEngine.ts
│   │   └── storage.ts
│   ├── i18n/            # Internationalization
│   │   ├── zh.ts        # Chinese translations
│   │   └── en.ts        # English translations
│   ├── types.ts         # TypeScript type definitions
│   ├── constants.ts     # App constants
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # iOS 17+ Design System
├── public/              # Static assets
│   ├── manifest.json    # PWA config
│   └── *.mp3           # Built-in background music
├── .github/             # GitHub Actions workflows
├── package.json
├── vite.config.js
├── tsconfig.json
├── vercel.json         # Vercel deployment config
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Audio**: Web Audio API + Howler.js
- **Voice**: Web Speech API (SpeechSynthesis)
- **i18n**: i18next + react-i18next
- **Storage**: LocalStorage API
- **Notifications**: Notification API
- **Design System**: iOS 17+ HIG
  - SF Pro typography system
  - iOS 8pt grid system
  - iOS official color system
  - iOS frosted glass effects
  - iOS standard border radius & shadows
  - iOS easing curves & animations

## 🌐 Browser Compatibility

- Chrome 100+ ✅
- Safari 15+ ✅
- Firefox 100+ ✅
- Edge 100+ ✅

**Mobile**: iOS Safari 15+, Chrome Mobile, Android Browser

## 📝 Features Breakdown

### Audio Engine
- Real-time beat generation using Web Audio API oscillators
- 5 built-in sound types (Beep, Tick, Clap, Bell, Voice)
- Precise timing with <100ms latency

### Voice Counting
- Web Speech API SpeechSynthesis
- Chinese and English number pronunciation
- Voice style selection (Male/Female)
- Rate adjustment synchronized to BPM

### Background Music
- Built-in background music files
- Loop-based playback
- Independent volume control
- Automatic layering with beats/voice

### iOS Design System
- **Colors**: iOS 17+ official colors (blue, green, red, etc.)
- **Typography**: SF Pro Display/Text font hierarchy
- **Spacing**: 8pt grid system (4, 8, 12, 16, 20, 24...)
- **Border Radius**: Standard iOS corner radius (6, 8, 12, 16, 20, 24px)
- **Shadows**: Precise dual-layer shadow system
- **Frosted Glass**: Authentic iOS blur effects (72%/85% opacity)
- **Animations**: iOS standard easing curves & durations (150-500ms)

### Data Persistence
- Settings auto-save to LocalStorage
- No server required, completely local

## 🔒 Privacy & Security

- **No data collection**: All data stored locally
- **No server required**: Works completely offline after first load
- **No third-party tracking**: Zero analytics or ads
- **HTTPS recommended**: For secure deployment

## 🎨 Customization

### iOS Design System
The app uses a complete iOS 17+ design system. All style variables are defined in `src/index.css`:

```css
:root {
  /* iOS Official Colors */
  --ios-blue: #007AFF;
  --ios-green: #34C759;
  --ios-red: #FF3B30;

  /* iOS Typography Scale */
  .text-title1 { font-size: 28px; font-weight: 700; }
  .text-headline { font-size: 17px; font-weight: 600; }
  .text-body { font-size: 17px; font-weight: 400; }

  /* iOS 8pt Grid System */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --spacing-6: 24px;

  /* iOS Border Radius */
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* iOS Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### Adding New Sound Types
Edit `src/utils/audioEngine.ts` and add a new case in the `playBeatSound` function.

### Adding New Languages
1. Create translation file in `src/i18n/`
2. Add to `src/i18n/index.ts`
3. Update language selector in App.tsx

### Customizing Theme
All iOS design variables are in `src/index.css`, adjust as needed:
- Modify `--primary-color` to change theme color
- Modify `--radius-*` to adjust corner radius
- Modify `--shadow-*` to adjust shadow intensity
- Modify `--transition-*` to adjust animation duration

## 🐛 Troubleshooting

### Audio Not Playing
- Ensure you've interacted with the page first (browser autoplay policy)
- Check browser console for errors
- Try refreshing the page

### Voice Not Working
- Verify browser supports Web Speech API
- Check system voice settings
- Try different voice style options

### Custom Sound Not Uploading
- Ensure file is MP3 or WAV format
- Check file size (<5MB recommended)
- Try a different browser

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Design inspired by [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Audio managed with [Howler.js](https://howlerjs.com/)
- Internationalization by [i18next](https://www.i18next.com/)

---

**🍎 Built following iOS Human Interface Guidelines**
