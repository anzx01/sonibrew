# SoniBrew - Workout Beat Timer

A modern workout beat timer app with iPhone 16 Pro Max design, featuring real-time BPM adjustment, voice counting, and background music support.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple)](https://vitejs.dev/)

## ✨ Highlights

- 📱 **iPhone 16 Pro Max Design** - Complete device frame with Dynamic Island and Home Indicator
- 🎨 **Colorful Gradient UI** - 3D depth effects, dynamic gradients, and smooth animations
- 🌓 **Dark Theme** - Optimized visual experience for dark mode
- ⚡ **Real-time Speed Adjustment** - Adjust BPM in real-time during playback without stopping
- 🚀 **High Performance** - Built with Vite 7, using Web Audio API for precise timing

## 🌟 Main Features

### Core Functionality
- **Real-time BPM Adjustment**: Adjust BPM (30-200) in real-time during playback without stopping
- **Precise Timing**: Using Web Audio API and setTimeout for accurate beat scheduling
- **Voice Counting**: Web Speech API integration for counting numbers (Chinese/English)
- **Background Music**: 4 built-in background music tracks with loop playback and independent volume control
- **Timer Mode**: Optional countdown timer (5-60 minutes) with auto-stop and notifications
- **Multiple Sound Types**: Beep, Tick, Clap, Bell, and Voice (generated using Web Audio API)

### Settings & Customization
- **Real-time BPM Control**: Using Radix UI Slider, supports real-time speed adjustment during playback
- **Volume Controls**: Independent controls for beats, voice, and background music (0-100%)
- **Voice Options**: Choose language (Chinese/English) and voice style (Male/Female)
- **Count Range**: Configurable count maximum (8, 10, 20)
- **Sound Type**: 5 built-in sound types (beep, tick, clap, bell, voice)

### Data Storage & History
- **Auto-save**: All settings automatically saved to LocalStorage
- **Exercise Logs**: Automatically record each workout (duration, BPM, settings)
- **No Server Required**: Completely local, privacy-focused

### User Experience
- **iPhone 16 Pro Max Design**: Complete device frame with Dynamic Island, Home Indicator, and titanium bezel effect
- **Colorful Gradients**: Multi-color gradient text and buttons with 3D depth effects and shadows
- **Smooth Animations**: Button click scaling, count highlighting, and other interactive animations
- **Dark Theme**: Optimized for dark mode with gradient backgrounds
- **Multi-language**: Chinese and English with one-click toggle (auto-syncs voice language)
- **Browser Notifications**: System notifications when timer completes

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
sonibrew/
├── src/
│   ├── components/           # React UI components
│   │   ├── ui/              # Radix UI + Tailwind base components
│   │   │   ├── button.tsx   # Button component
│   │   │   ├── card.tsx     # Card component
│   │   │   ├── slider.tsx   # Slider component (real-time speed adjustment)
│   │   │   ├── switch.tsx   # Switch component
│   │   │   ├── select.tsx   # Select component
│   │   │   └── dialog.tsx   # Dialog component
│   │   ├── Player.tsx       # Main player interface (colorful gradient design)
│   │   ├── Settings.tsx     # Settings panel
│   │   ├── Presets.tsx      # Preset management
│   │   └── History.tsx      # History records
│   ├── hooks/               # Custom React hooks
│   │   ├── useAudioPlayer.ts    # Audio player logic (real-time speed adjustment)
│   │   └── useBackgroundMusic.ts # Background music management
│   ├── utils/               # Utility functions
│   │   ├── audioEngine.ts   # Web Audio API audio engine
│   │   ├── voiceEngine.ts   # Web Speech API voice engine
│   │   ├── storage.ts       # LocalStorage management
│   │   └── logger.ts        # Logging utility
│   ├── i18n/                # Internationalization
│   │   ├── index.ts         # i18next configuration
│   │   ├── zh.ts            # Chinese translations
│   │   └── en.ts            # English translations
│   ├── lib/                 # Library utilities
│   │   └── utils.ts         # Tailwind utility functions
│   ├── types.ts             # TypeScript type definitions
│   ├── constants.ts         # App constants
│   ├── App.tsx              # Main app component (iPhone 16 Pro Max frame)
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind CSS + custom styles
├── public/                  # Static assets
│   ├── manifest.json        # PWA config
│   ├── vite.svg            # App icon
│   └── *.mp3               # Built-in background music (4 tracks)
├── package.json
├── vite.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript 5
- **Build Tool**: Vite 7
- **UI Components**: Radix UI (Dialog, Select, Slider, Switch, Slot)
- **Styling**: Tailwind CSS 3.4 + tailwindcss-animate
- **Utilities**:
  - class-variance-authority - Component variant management
  - clsx + tailwind-merge - Class name merging
  - lucide-react + react-icons - Icon libraries
- **Audio**:
  - Web Audio API - Beat sound generation and precise timing
  - Howler.js 2.2 - Background music playback
- **Voice**: Web Speech API (SpeechSynthesis) - Voice counting
- **i18n**: i18next + react-i18next + i18next-browser-languagedetector
- **Storage**: LocalStorage API - Settings and history
- **Notifications**: Notification API - Timer completion notifications
- **Design Style**: iPhone 16 Pro Max Design
  - Dynamic Island and Home Indicator
  - Titanium bezel effect
  - Colorful gradients and 3D depth effects
  - Smooth interactive animations

## 🌐 Browser Compatibility

- Chrome 100+ ✅
- Safari 15+ ✅
- Firefox 100+ ✅
- Edge 100+ ✅

**Mobile**: iOS Safari 15+, Chrome Mobile, Android Browser

## 📝 Features Breakdown

### Real-time Speed Adjustment Technology
- **Playback Speed Adjustment**: Uses ref to store current BPM, enabling real-time speed adjustment during playback
- **Smart Rescheduling**: Immediately clears current timeout and reschedules next beat when BPM changes
- **Voice Real-time Speed**: In voice beat mode, immediately cancels current speech and applies new rate when BPM changes
- **Precise Timing**: Uses `setTimeout` recursive scheduling, dynamically calculates delay based on BPM

### Audio Engine
- **Web Audio API**: Uses oscillators to generate beat sounds in real-time
- **5 Sound Types**: beep (sine wave), tick (square wave), clap (white noise), bell (triangle wave), voice (human voice)
- **Precise Timing**: <100ms latency, suitable for high-intensity workouts
- **Volume Control**: Independent beat volume control (0-100%)

### Voice Counting
- **Web Speech API**: Uses SpeechSynthesis for voice synthesis
- **Chinese/English Support**: Automatically selects system voice (Chinese/English)
- **Voice Style**: Male/Female voice selection
- **Rate Synchronization**: Voice rate automatically adjusts based on BPM (60 BPM = 1.0x, 120 BPM = 1.5x)
- **Smart Counting**: Supports 8, 10, 20 count loops

### Background Music
- **Howler.js Management**: Uses Howler.js for audio file playback
- **4 Built-in Tracks**: xm2544.mp3, xm3242.mp3, xm3251.mp3, y1891.mp3
- **Loop Playback**: Automatic looping with seamless transitions
- **Independent Volume**: Background music volume control independent of beats and voice
- **Auto-mixing**: Automatically mixes with beats and voice

### iPhone 16 Pro Max Design
- **Device Frame**: Complete iPhone 16 Pro Max appearance (430x932px)
- **Dynamic Island**: Top dynamic island design (126x37px, 19px border radius)
- **Home Indicator**: Bottom home indicator (134x5px)
- **Titanium Bezel**: Gradient bezel effect simulating titanium texture
- **Colorful Gradients**: Multi-color gradient text and buttons (blue-purple-pink-orange-green)
- **3D Depth**: Multi-layer shadows and inset shadows creating 3D depth
- **Smooth Animations**: Button click scaling (scale-95), count highlighting, and other interactive animations

### Data Persistence
- **Auto-save**: Settings automatically saved to LocalStorage when changed
- **Exercise Logs**: Automatically records each workout (duration, BPM, settings)
- **Storage Keys**: Uses namespace prefix (workoutbeat_*) to avoid conflicts

## 🔒 Privacy & Security

- **No data collection**: All data stored locally
- **No server required**: Works completely offline after first load
- **No third-party tracking**: Zero analytics or ads
- **HTTPS recommended**: For secure deployment

## 🎨 Customization

### Modify Design Style
The app uses Tailwind CSS and inline styles. Main styles are in the following files:

**`src/components/Player.tsx`** - Player interface gradients and 3D effects
```tsx
// Modify gradient colors
background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #EC4899 100%)'

// Modify shadows
boxShadow: '0 8px 32px rgba(16, 185, 129, 0.6)'
```

**`src/App.tsx`** - iPhone frame and background
```tsx
// Modify background gradient
background: 'radial-gradient(circle at 50% 0%, #2C2C2E 0%, #1C1C1E 50%, #000000 100%)'

// Modify bezel gradient (titanium effect)
background: 'linear-gradient(135deg, #4A4A4C 0%, #2C2C2E 25%, #1C1C1E 50%, #2C2C2E 75%, #4A4A4C 100%)'
```

**`src/index.css`** - Tailwind configuration and global styles
```css
/* Modify CSS variables */
:root {
  --background-color: #000000;
  --surface-color: #1C1C1E;
  --text-primary: #FFFFFF;
}
```

### Adding New Sound Types
Edit the `playBeatSound` function in `src/utils/audioEngine.ts`:

```typescript
case 'custom':
  oscillator.type = 'sawtooth'; // Sawtooth wave
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 pitch
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  break;
```

### Adding New Languages
1. Create translation file in `src/i18n/` (e.g., `ja.ts`)
2. Add to resources in `src/i18n/index.ts`
3. Update language toggle button in `src/App.tsx`
4. Add language option in `src/components/Settings.tsx`

### Modifying BPM Range
Edit `src/constants.ts`:

```typescript
export const MIN_BPM = 20;  // Minimum BPM
export const MAX_BPM = 300; // Maximum BPM
export const DEFAULT_BPM = 60; // Default BPM
```

### Adding Background Music
1. Place MP3 file in `public/` directory
2. Add music option in `src/components/Settings.tsx`
3. Files will be automatically processed by Vite and accessible via `/filename.mp3`

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

- Design inspired by [Apple iPhone 16 Pro Max](https://www.apple.com/iphone-16-pro/)
- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- UI components based on [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Audio managed with [Howler.js](https://howlerjs.com/)
- Internationalization by [i18next](https://www.i18next.com/)
- Icons from [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)

## ⚡ Performance Features

- **Fast Startup**: Vite 7 provides lightning-fast dev server startup (<1s)
- **Instant HMR**: Hot module replacement with <100ms latency
- **Small Build Size**: Production build optimized with code splitting
- **Precise Timing**: Web Audio API provides <100ms beat latency
- **Real-time Response**: BPM adjustments take effect immediately without restarting playback
- **Smooth Animations**: 60fps CSS animations and transitions
- **Memory Optimization**: Uses ref to avoid unnecessary re-renders
- **Smart Scheduling**: Uses setTimeout recursive scheduling to avoid setInterval cumulative errors

---

**📱 Built with iPhone 16 Pro Max Design Style**
