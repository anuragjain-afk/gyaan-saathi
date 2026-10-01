# GYAAN SAATHI (ज्ञान साथी)
> **"Your AI Companion for Learning & Growth"**
>
> *Theme: Digital Inclusion for Rural Higher Education*

---

## 🌟 Executive Overview & Central Concept

**Gyaan Saathi** is an installable, mobile-first **Progressive Web Application (PWA)** engineered to solve the persistent educational barriers faced by students in rural and tribal regions:

- **Intermittent & Low-Bandwidth Connectivity**
- **Delayed Academic Doubt Resolution**
- **Lack of Personalization & Career Awareness**
- **Language Barriers (English / Hindi)**
- **Information Asymmetry in Government Scholarships**

### Core Philosophy:
> **"Learning should continue even when the internet does not."**

---

## 🛠️ Core Differentiators & Architecture

1. **Offline-First Caching (IndexedDB via Dexie.js)**
   - Pre-caches entire course modules, lessons, code snippets, and quizzes locally.
   - Saves quiz results, student progress, topic scores, and doubt queues without requiring an active network connection.

2. **Idempotent Synchronization Engine**
   - Automatically detects network reconnection using `navigator.onLine` and custom window events.
   - Manages an offline `syncQueue` in IndexedDB (`operationId`, `type`, `payload`, `createdAt`, `status`, `retryCount`).
   - Flushes queued operations to the backend when online without repeating submissions.

3. **Course-Grounded RAG AI Assistant (AI Saathi)**
   - Grounded vector/keyword knowledge retrieval matching queries against Python course chunks.
   - System prompts enforce strict course-anchored answers, simple beginner-friendly language, code examples, and Hindi translations.
   - Fallback offline queue safely stores doubts submitted while offline.

4. **Voice & Multilingual Interaction**
   - Web Speech API Speech-to-Text (STT) for voice doubt input.
   - SpeechSynthesis Text-to-Speech (TTS) for listening to AI responses in English or Hindi.

5. **Hackathon Demo Controller Bar**
   - Instant interactive bar at the top of the app allowing judges to toggle simulated offline mode, run manual syncs, and preload demo student profiles (Rahul - BCA Sem 1).

---

## 📁 Repository Structure

```
gyaan-saathi/
├── client/                     # Vite + React + TypeScript + Tailwind CSS PWA
│   ├── public/
│   │   ├── manifest.json       # PWA Manifest
│   │   ├── sw.js               # Service Worker for offline app shell caching
│   │   └── logo.svg            # Official Gyaan Saathi branding logo
│   ├── src/
│   │   ├── components/         # Reusable UI (AppHeader, Navigation, ConnectionStatus, SyncCenterModal, DemoBar)
│   │   ├── pages/              # Primary Views (Home, Learn, AISaathi, Practice, CareerSaathi, ScholarshipSaathi, Profile)
│   │   ├── services/           # SyncManager, AIService, VoiceService
│   │   ├── db/                 # IndexedDB Dexie Schema
│   │   ├── data/               # Python Course, Career Pathways, & Scholarship Datasets
│   │   ├── i18n/               # English / Hindi translations
│   │   ├── App.tsx             # Root Layout Shell
│   │   └── main.tsx            # Vite Entry
│   └── package.json
│
├── server/                     # Node.js + Express.js API & RAG Engine
│   ├── src/
│   │   ├── data/               # Course Knowledge Chunks for Vector Match
│   │   ├── services/           # Grounded RAG Engine
│   │   ├── routes/             # REST Endpoints (/api/courses, /api/ai/ask, /api/sync, etc.)
│   │   ├── db/                 # PostgreSQL & pgvector Schema SQL
│   │   └── index.js            # Express server entry point
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## ⚡ Quick Start & Local Development Commands

### Prerequisites
- **Node.js**: v18 or higher (v24 tested)
- **npm**: v9 or higher

### 1. Start Express Backend
```bash
cd server
npm install
npm run dev
```
*Server will listen on http://localhost:5000*

### 2. Start Vite Frontend Client
In a separate terminal window:
```bash
cd client
npm install
npm run dev
```
*Client will open on http://localhost:5173*

---

## ⚙️ Environment Variables Setup

Create `.env` inside `/server` (see `server/.env.example`):

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/gyaan_saathi
LLM_API_KEY=your_gemini_or_openai_api_key_here
JWT_SECRET=gyaan_saathi_secret_key_2026
CLIENT_URL=http://localhost:5173
```

> **Note:** If `LLM_API_KEY` or PostgreSQL is absent during evaluation, Gyaan Saathi automatically switches to its local grounded knowledge engine without throwing errors!

---

## 🚀 3-Minute Hackathon Judge Demonstration Flow

Follow these exact steps to demonstrate the complete student journey:

1. **Step 1: Launch Application**
   - Open `http://localhost:5173`.
   - Observe top banner: `Hackathon Demo Controller`.
   - Notice initial status: `● Online`.

2. **Step 2: Inspect Course Library**
   - Click **Learn** from sidebar/bottom bar.
   - Open **Python Fundamentals** (Notice: `✓ Available Offline (1.8 MB)` cached badge).

3. **Step 3: TURN INTERNET OFF (Simulate Offline Mode)**
   - Click **TURN INTERNET OFF (Simulate)** button on top Demo Bar.
   - Connection status instantly updates to `● Offline Mode`.

4. **Step 4: Continue Offline Learning**
   - Navigate through Python lessons (*Lesson 04: Loops & Nested Loops*).
   - Read content, inspect code snippets, and review key points—works 100% offline!

5. **Step 5: Take Offline Quiz**
   - Click **Take Quiz** or open **Practice** tab.
   - Answer 5 questions on Python Loops & Nested Loops.
   - Submit quiz. See instant score (e.g. 80%) and topic breakdown:
     - *Strong Topics:* Variables
     - *Needs Practice:* Nested Loops
   - Result is saved in IndexedDB!

6. **Step 6: Ask AI Doubt Offline**
   - Open **AI Saathi**.
   - Type or speak: *"Explain nested loops in simple Hindi."*
   - Submit. Notice response:
     > *"Doubt saved locally in IndexedDB queue. It will be processed automatically when you reconnect."*

7. **Step 7: TURN INTERNET ON (Simulate Reconnect)**
   - Click **TURN INTERNET ON** on top Demo Bar.
   - Automatic sync triggers! Pill changes to `↻ Syncing...` then `✓ Synced`.

8. **Step 8: Inspect AI Answer & Voice Output**
   - AI Saathi displays course-grounded explanation in Hindi & English along with code examples.
   - Click **🔊 Listen** to hear text-to-speech audio output.

9. **Step 9: Discover Pathways & Scholarships**
   - Open **Career Saathi** to view BCA Frontend/Backend developer roadmaps.
   - Open **Scholarship Saathi** to filter government scholarships by income and category.

---

## 📱 PWA Installation Instructions

1. Open Gyaan Saathi in Chrome, Edge, or Android Chrome browser.
2. Click the **Install Icon** in the address bar or browser menu (**"Add to Home Screen"**).
3. Open Gyaan Saathi directly from your Desktop or Smartphone app drawer—it launches as a native standalone application!

---

## 🎓 Acceptance Criteria Verification Matrix

| Feature Requirement | Status | Implementation Details |
|---|---|---|
| PWA Manifest & Service Worker | ✅ PASSED | `manifest.json`, `sw.js` app shell caching |
| Offline Course Navigation | ✅ PASSED | Dexie IndexedDB caching of Python lessons & snippets |
| Offline Quiz Evaluation | ✅ PASSED | Instant evaluation, topic score engine in IndexedDB |
| Offline AI Doubt Queue | ✅ PASSED | Saves query to `syncQueue`, processes on reconnect |
| Idempotent Sync Manager | ✅ PASSED | Idempotent operations queue with retry tracking |
| Grounded RAG AI Engine | ✅ PASSED | RAG engine over Python course knowledge chunks |
| Multilingual Support | ✅ PASSED | English / Hindi UI & AI explanation toggles |
| Voice STT & Speech Synthesis TTS | ✅ PASSED | Web Speech API integration with graceful fallbacks |
| Mobile-First Responsive Design | ✅ PASSED | Bottom nav on mobile, Sidebar on desktop |

---

## 🛡️ License & Public Impact Statement

Developed for the **Digital Inclusion for Rural Higher Education** Hackathon.
*Empowering every student to learn, ask, practice, discover, and grow—anytime, anywhere.*
