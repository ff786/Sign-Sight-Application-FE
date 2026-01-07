# 👋 Sign Sight - Audio to Sign Language Converter

A beautiful, modern web application that converts audio and video files to sign language animations.

## ✨ Features

- 🎨 **Beautiful UI**: Vibrant gradients, smooth animations, and modern design
- 📤 **Easy Upload**: Drag & drop or click to upload audio/video files
- 🎵 **Multiple Formats**: Supports MP3, WAV, and MP4 files
- 🎬 **Video Playback**: Custom video player with full controls
- ⚡ **Real-time Processing**: Mock API ready for Flask backend integration
- 📱 **Responsive Design**: Works perfectly on all device sizes
- 🎯 **User Friendly**: Clear instructions and intuitive interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ff786/Sign-Sight-Application-FE.git
cd Sign-Sight-Application-FE
```

2. Install dependencies:
```bash
npm install
npm install -D @tailwindcss/postcss
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5174
```

## 🎨 Tech Stack

- **React** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **PostCSS** - CSS Processing

## 📁 Project Structure

```
src/
├── Components/
│   ├── AudioUpload.jsx          # File upload component
│   ├── SignLanguageDisplay.jsx  # Video display & controls
│   └── ConversionPage.jsx       # Main page layout
├── App.jsx                      # App entry point
├── App.css                      # Custom animations
└── index.css                    # Tailwind imports
```

## 🔧 Backend Integration

The app is ready to integrate with your Flask backend. Update the `mockConvertToSignLanguage` function in `ConversionPage.jsx` with your API endpoint:

```javascript
// Replace mock API with your Flask backend
const response = await fetch('http://your-backend-url/api/convert', {
  method: 'POST',
  body: formData
});
```

## 🎯 Usage

1. **Upload**: Drag and drop or click to select an audio/video file
2. **Convert**: Click the "Convert to Sign Language" button
3. **View**: Watch the sign language animation with playback controls

## 🌈 Color Scheme

- **Primary**: Purple (#9333ea) to Pink (#ec4899) gradients
- **Secondary**: Blue (#3b82f6) to Cyan (#06b6d4) gradients
- **Accent**: Various colorful gradients for different sections
- **Success**: Green (#22c55e) to Emerald (#10b981)

## 📝 License

MIT License - feel free to use this project for your needs!

## 👨‍💻 Author

Built with ❤️ for making content accessible to everyone

---

**Sign Sight** © 2026 - Making content accessible for everyone 💜

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Sign-Sight-Application-FE
