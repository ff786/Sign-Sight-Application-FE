# Sign Sight - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "/Users/farsithfawzer/Desktop/Farsith AudioToSign/front-end/sign-sight-fe"
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will typically run at `http://localhost:5173`
   - Or check the terminal output for the exact URL

---

## 🎯 How to Use

### Step 1: Upload Audio/Video
- **Method 1**: Click on the upload area and select a file
- **Method 2**: Drag and drop a file onto the upload area
- **Supported formats**: MP3, WAV, MP4
- **Maximum size**: 50MB

### Step 2: Automatic Conversion
- The system automatically starts converting once you upload
- You'll see a "Converting to sign language..." message
- Wait 2 seconds for the mock conversion to complete

### Step 3: View Sign Language Video
- The sign language video appears on the right side
- Use the video controls to:
  - ▶️ **Play/Pause** the video
  - 🔄 **Restart** from the beginning
  - 🔊 **Mute/Unmute** the audio
  - ⏯️ **Seek** through the timeline

---

## 🎬 Demo Mode

The app currently runs in **demo mode** with mock API:

### Test Files:
1. **nandri.mp3 or nandri.wav** → Shows "Nandri" (Thank you) sign video
2. **urakkam.mp3 or urakkam.wav** → Shows "Urakkam" (Sleep) sign video
3. **Any other filename** → Shows a random sign language video

### Example Test:
- Create or rename an audio file to `nandri.mp3`
- Upload it to see the corresponding sign language video
- Try different filenames to see the mapping in action

---

## 🎨 Features

### Audio Upload Component (Left Panel)
- ✅ Drag and drop file upload
- ✅ File validation (format and size)
- ✅ Visual feedback for selected files
- ✅ Real-time conversion status
- ✅ Beautiful blue-themed interface

### Sign Language Display (Right Panel)
- ✅ Video player with custom controls
- ✅ Progress bar with time display
- ✅ Play, pause, restart, and mute controls
- ✅ Loading animation during processing
- ✅ Empty state when no video is loaded

### Responsive Design
- ✅ Works on desktop, tablet, and mobile
- ✅ Side-by-side layout on large screens
- ✅ Stacked layout on small screens

---

## 📁 Project Structure

```
sign-sight-fe/
├── src/
│   ├── Components/
│   │   ├── AudioUpload.jsx          # File upload component
│   │   ├── SignLanguageDisplay.jsx  # Video player component
│   │   └── ConversionPage.jsx       # Main page combining both
│   ├── assets/
│   │   ├── nandri.mp4              # Sign language video 1
│   │   └── urakkam.mp4             # Sign language video 2
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── tailwind.config.js               # Tailwind configuration
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies
```

---

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js` to modify the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Add More Videos
1. Add `.mp4` files to `src/assets/`
2. Import them in `ConversionPage.jsx`
3. Update the mock API mapping logic

### Modify Mock API Delay
In `ConversionPage.jsx`, change the timeout duration:
```javascript
await new Promise(resolve => setTimeout(resolve, 2000)); // Change 2000 to your desired ms
```

---

## 🐛 Troubleshooting

### Issue: Styles not loading
**Solution**: 
```bash
npm run dev
# If that doesn't work, try:
npm install
npm run dev
```

### Issue: Videos not playing
**Solution**: 
- Ensure video files are in `src/assets/` folder
- Check browser console for errors
- Try a different browser (Chrome/Firefox recommended)

### Issue: Upload not working
**Solution**: 
- Check file format (must be MP3, WAV, or MP4)
- Check file size (must be under 50MB)
- Clear browser cache and reload

---

## 📦 Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

---

## 🔮 Next Steps (Backend Integration)

When your Flask backend is ready:

1. Update `ConversionPage.jsx` 
2. Replace the mock API call with real endpoint
3. Handle authentication if needed
4. Add error handling for network issues
5. Update video URL handling based on API response

---

## 💡 Tips

- **File naming**: Include keywords like "nandri" or "urakkam" in your test files
- **Performance**: Keep videos under 10MB for faster loading
- **Testing**: Test on different screen sizes using browser dev tools
- **Accessibility**: All controls are keyboard accessible

---

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Review `FIXES_APPLIED.md` for detailed documentation
3. Ensure all dependencies are installed
4. Try clearing browser cache and restarting dev server

---

## 🎉 Enjoy!

Your Sign Sight application is now ready to convert audio to sign language!

**Current Status**: ✅ Demo Mode Active  
**Backend Status**: ⏳ Pending Flask Integration  
**Frontend Status**: ✅ Fully Functional

