# 🧠 Emotion & Context-Aware Tamil Sign Language System – Child Module

### SignSight – Tamil Sign Language Intelligent Learning System

---

## 📌 Overview

This component is designed to recognize **children’s facial emotions** (ages 3–10) in real-time using webcam video input. It enables **emotion-aware sign language learning** by adjusting feedback and interactions based on the child’s emotional state.

It ensures personalized, engaging, and emotionally sensitive learning experiences for young children with hearing impairments.

---

## 🎯 Objectives

* Detect real-time facial emotions in children using deep learning
* Provide context-aware feedback in Tamil Sign Language (TSL)
* Record emotion clips and send reports to guardians
* Encourage emotionally positive learning environments

---

## ✨ Core Features

### 🔹 Real-Time Facial Emotion Detection

* Uses webcam input to detect child’s facial region
* Predicts five core emotions:
  **Happy**, **Sad**, **Angry**, **Afraid**, **Neutral**
* Displays emotion probabilities with dynamic bounding box and confidence score

### 🔹 Deep Learning Model (MobileNetV2)

* Trained on child-specific emotion datasets
* Lightweight and fast for real-time webcam processing
* Uses **MobileNetV2** CNN architecture with custom emotion classifier

### 🔹 Smoothed Prediction Engine

* Applies a temporal buffer to stabilize predictions
* Reduces false triggers caused by rapid facial changes
* Increases accuracy during real-time sessions

### 🔹 Emotion-Based Interaction Flow

* Frontend shows short emotion-triggering videos (happy, sad, angry, afraid)
* Captures child’s webcam response during each video
* Sends videos to backend for emotion detection and analysis

### 🔹 Guardian Alert System

* Automatically emails an **emotion report** to the registered guardian
* Includes detected emotion summary and behavioral suggestions
* Encourages emotionally aware support from parents/guardians

---

## ⚙️ Technologies Used

| Layer             | Technology                       |
| ----------------- | -------------------------------- |
| Backend           | Flask (Python)                   |
| Deep Learning     | TensorFlow / Keras (MobileNetV2) |
| Real-Time Capture | OpenCV, Mediapipe                |
| Frontend          | React, Vite, Tailwind CSS        |
| Email Sending     | Flask-Mail / SMTP                |
| Data Handling     | NumPy, JSON                      |

---

## 🔄 System Workflow

1. Guardian logs in and starts the Emotion Module
2. System plays short YouTube videos to evoke emotion
3. Child’s webcam video is recorded in real-time
4. Video is sent to backend for facial emotion detection
5. Model predicts emotion + confidence
6. Emotion report is generated
7. Guardian receives an **email** with emotion insights + suggestions

---

## 🧪 API Endpoint

### `POST /upload-emotion-video`

**Inputs:**

* Video (WebM format)
* Guardian email
* Emotion step index

**Outputs:**

* Emotion prediction with confidence
* Emotion report stored and emailed

---

## 📊 Sample Output

* **Detected Emotion:** Sad
* **Confidence:** 91%
* **Report Recommendation:**
  *“Child showed signs of sadness. Engage with calming sign language content. Avoid harsh tone. Maintain eye contact.”*

---

## 🚀 How to Run

### 📦 Backend

```bash
cd backend  
python app.py
```

### 💻 Frontend

```bash
cd frontend  
npm install  
npm run dev
```

---

## 📫 Guardian Emotion Report Includes

* Detected emotion (with video evidence)
* Suggestions for emotional handling
* Warnings for emotional instability
* Weekly summary for tracking trends
