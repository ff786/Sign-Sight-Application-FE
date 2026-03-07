# 🎥 Audio-to-Sign Language Video Conversion Component
### SignSight – Tamil Sign Language AI Translation System

## 📌 Overview

This component handles **audio-to-sign language video conversion** within the SignSight platform. It provides an intelligent interface for uploading audio/video files and receiving corresponding Tamil sign language video demonstrations through AI-powered translation.

The system bridges communication gaps by converting spoken Tamil content into visual sign language representations.

---

## 🎯 Objectives

- Enable seamless audio-to-sign language conversion for Tamil speakers
- Provide intuitive drag-and-drop file upload interface
- Support multiple audio/video formats (MP3, WAV, MP4)
- Deliver real-time conversion status and progress tracking
- Display interactive sign language videos with playback controls
- Ensure accessibility and ease of use for all users

---

## ✨ Core Features

### 🔹 Multi-Format Audio/Video Upload
- **Drag-and-Drop Interface**: Intuitive file selection
- **Supported Formats**: MP3, WAV, MP4
- **File Validation**: Automatic format and size checking
- **Size Limit**: Up to 50MB per file
- **Visual Feedback**: File preview and validation status

---

### 🔹 AI-Powered Sign Language Conversion
- Processes uploaded audio/video content
- Extracts Tamil speech using Speech-to-Text
- Maps Tamil words to corresponding sign language gestures
- Generates synchronized sign language video output
- Real-time conversion progress tracking

---

### 🔹 Interactive Video Playback System
- **Full Playback Controls**:
  - Play/Pause functionality
  - Restart from beginning
  - Progress bar with seek capability
  - Volume control and mute toggle
- **Video Timeline**: Visual progress indicator
- **Responsive Player**: Adapts to screen size

---

### 🔹 Real-Time System Status
- **System Ready Indicator**: Shows backend availability
- **Processing Status**: Live conversion progress
- **Error Handling**: Clear error messages and recovery options
- **Visual Feedback**: Color-coded status indicators (green/yellow/red)

---

### 🔹 Responsive User Interface
- **Modern Design**: Yellow-themed gradient interface
- **Mobile-First**: Optimized for all screen sizes
- **Grid Layout**: Organized upload and display sections
- **Step-by-Step Instructions**: User guidance throughout process
- **Accessibility**: Semantic HTML and keyboard navigation

---

## ⚙️ Technologies Used

| Layer | Technology |
|------|-----------|
| Frontend Framework | React (^19.2.0) |
| Build Tool | Vite (^7.2.4) |
| Styling | Tailwind CSS (^4.1.18) |
| Icons | Lucide React (^0.562.0) |
| Language | JavaScript (JSX) |
| State Management | React Hooks (useState, useRef) |
| HTTP Client | Fetch API |
| Video Processing | HTML5 Video API |

---

## 🔄 System Workflow

1. **User uploads audio/video file**
   - Via drag-and-drop or file picker
   - File validation (format & size)

2. **File processing initiated**
   - System status changes to "Converting"
   - File sent to backend API

3. **Backend AI processing**
   - Speech-to-Text conversion
   - Tamil language processing
   - Sign language mapping
   - Video generation

4. **Video delivery**
   - Converted video URL received
   - Video loaded in player

5. **Interactive playback**
   - User controls video playback
   - Can replay, pause, seek, adjust volume

---

## 🧪 API Endpoint

### `POST /api/convert-to-sign`

**Request Format**
```javascript
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('language', 'tamil');
formData.append('format', 'mp4');

fetch('https://api.signsight.ai/convert', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
  },
  body: formData,
});
```

**Response Format**
```json
{
  "success": true,
  "conversionId": "conv_abc123xyz",
  "videoUrl": "https://cdn.signsight.ai/videos/tamil_sign_xyz.mp4",
  "duration": 15.3,
  "transcript": "நன்றி",
  "confidence": 0.95
}
```

**Current Implementation (Mock)**
```javascript
const mockConvertToSignLanguage = async (audioFile) => {
  // Simulates 2-second processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Maps filename to corresponding sign language video
  const fileName = audioFile.name.toLowerCase();
  
  if (fileName.includes('nandri')) {
    return nandriVideo; // Thank you sign
  } else if (fileName.includes('urakkam')) {
    return urakkamVideo; // Sleep sign
  }
  
  // Random fallback
  return Math.random() > 0.5 ? nandriVideo : urakkamVideo;
}
```

---

## 🚀 How to Run (Complete Setup)

#### 📦 Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

#### 💻 Frontend
```bash
cd sign-sight-fe
npm install
npm run dev
```

---

## 📊 Sample Output

- **Input File**: `nandri_audio.mp3` (Tamil: "நன்றி")
- **Processing Time**: ~2 seconds
- **Output Video**: `nandri.mp4` (Sign language demonstration)
- **Video Duration**: 3.5 seconds
- **Conversion Status**: Success ✅
- **Confidence Score**: 95%

---

