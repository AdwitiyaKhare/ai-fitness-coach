# AI Fitness Coach App

A professional AI-powered fitness assistant that generates personalized workout and diet plans using large language models. The application supports voice (Text-to-Speech), image generation for exercises/meals, PDF export, and a dark/light theme.

---

## Live Demo

**Deployed on:** Vercel
*(Replace with your deployment URL.)*

---

## Overview

The AI Fitness Coach App creates fully personalized 7-day fitness and nutrition plans from user-provided inputs (age, weight, goals, available equipment, dietary preferences). It leverages a GPT model for plan generation and an image model for exercise/meal visuals. Plans can be read aloud, exported to PDF, and saved locally.

---

## Features

* **AI Plan Generation** — Generate personalized 7-day workout and diet plans using GPT-4o-mini.
* **Voice Support** — Read plans aloud using the browser SpeechSynthesis API.
* **AI Image Generation** — Generate images for exercises and meal ideas.
* **PDF Export** — Export plans to PDF with jsPDF and html2canvas.
* **Theme Support** — Light and dark theme toggle.
* **Local Save** — Save generated plans to `localStorage` for offline access.
* **Motivation & Tips** — Short AI-generated wellness and habit tips.

---

## Tech Stack

| Category   | Tools / Libraries                    |
| ---------- | ------------------------------------ |
| Frontend   | Next.js 14 (App Router), TypeScript  |
| Styling    | Tailwind CSS                         |
| AI APIs    | OpenAI (GPT-4o-mini), DALL·E (image) |
| Voice      | Browser SpeechSynthesis API          |
| PDF Export | jsPDF, html2canvas                   |
| Deployment | Vercel                               |

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/AdwitiyaKhare/ai-fitness-coach.git
cd ai-fitness-coach
npm install
```

Create environment variables in a `.env.local` file:

```text
OPENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_VERCEL_URL=https://your-deployed-url.vercel.app
```

Run the development server:

```bash
npm run dev
# App available at http://localhost:3000
```

To deploy, push to GitHub and connect the repository to Vercel. Add `OPENAI_API_KEY` in Vercel project settings under Environment Variables.

---

## Folder Structure

```
app/
  ├── api/
  │   ├── generate/route.ts        # POST: generate plan (uses OpenAI)
  │   ├── image/route.ts           # POST: generate image (DALL·E)
  ├── layout.tsx
  ├── page.tsx                     # Landing / form
  ├── plan/page.tsx                # Generated plan viewer
components/
  ├── InputForm.tsx                # User input form
  ├── PlanDisplay.tsx              # Displays the plan and sections
  ├── AudioPlayer.tsx              # TTS controller
  ├── ImageGenerator.tsx           # Image generation UI
  ├── PDFExportButton.tsx          # Exports plan to PDF
  ├── ThemeToggle.tsx              # Light / dark toggle
  ├── Navbar.tsx
lib/
  ├── promptTemplate.ts            # Prompt construction and constants
  ├── openaiClient.ts              # OpenAI API helper
styles/
  ├── globals.css
  ├── tailwind.config.js

README.md
package.json
tsconfig.json
.env.example
```

---

## API Design

### `POST /api/generate`

Request body (JSON):

```json
{
  "name": "string",
  "age": 30,
  "gender": "string",
  "height_cm": 175,
  "weight_kg": 70,
  "goal": "fat_loss | muscle_gain | maintain",
  "activity_level": "sedentary | light | moderate | active",
  "dietary_preferences": ["vegetarian", "vegan", "pescatarian", "none"],
  "equipment": ["dumbbells", "resistance_band", "no_equipment"],
  "medical_conditions": "optional string"
}
```

Response (JSON):

```json
{
  "planId": "uuid",
  "generatedAt": "ISO8601 timestamp",
  "plan": { /* structured 7-day plan JSON */ }
}
```

### `POST /api/image`

Request body (JSON):

```json
{
  "prompt": "string",
  "size": "512x512"
}
```

Response (JSON):

```json
{
  "imageUrl": "signed-or-hosted-url"
}
```

---

## Prompt Template

Use `lib/promptTemplate.ts` to centralize the instruction prompt for the LLM. Keep the prompt deterministic for reproducibility and include clear schema constraints so the backend can parse JSON safely.

Example outline (pseudo):

```
System: You are a professional fitness coach.
User: Provide a 7-day plan with workouts, sets, repetitions, rest, and meals for breakfast/lunch/dinner/snacks. Output ONLY valid JSON following the schema.
```

---

## Client Components (high-level)

* **InputForm.tsx** — Validate inputs, submit to `/api/generate`, show loading states.
* **PlanDisplay.tsx** — Render the returned JSON: daily workouts, exercises (with images if available), meals, and tips.
* **ImageGenerator.tsx** — Allow user to request an image for a specific exercise or meal; calls `/api/image` and displays the returned image.
* **AudioPlayer.tsx** — Uses `SpeechSynthesisUtterance` to read out selected plan sections; supports playback/pause and voice selection.
* **PDFExportButton.tsx** — Renders the plan area to canvas and exports a multi-page PDF using `html2canvas` + `jsPDF`.
* **ThemeToggle.tsx** — Persist theme choice to `localStorage` and apply Tailwind `dark` class on `<html>`.

---

## Example User Flow

1. User opens the app and fills the input form (name, age, goal, equipment, dietary preferences).
2. User clicks **Generate Plan**.
3. Frontend POSTs to `/api/generate` with validated payload.
4. Backend constructs prompt via `lib/promptTemplate.ts` and requests GPT-4o-mini.
5. Backend validates and returns structured JSON.
6. Frontend displays the plan; user can generate images, listen to TTS, save locally, or export PDF.

---

## Demo Video Script (2 minutes)

* **Intro (10s)** — Introduce yourself and the app in one sentence.
* **Show Form (15s)** — Fill in sample details and submit.
* **Show Plan (30s)** — Scroll through the 7-day plan: workouts and meals.
* **Text-to-Speech (10s)** — Use Read My Plan and demonstrate playback.
* **Image Generation (15s)** — Generate an exercise or meal image and show it.
* **Export PDF (10s)** — Click PDF export and show the downloaded file.
* **Theme Toggle (10s)** — Switch between light and dark themes.
* **Code Glimpse (20s)** — Briefly show `app/api/generate/route.ts` and `components/InputForm.tsx` while describing key logic.
* **Outro (5s)** — Closing sentence and contact/portfolio link.

---

## Environment Example (`.env.example`)

```
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_VERCEL_URL=https://your-vercel-url
```

---

## Notes & Recommendations

* Keep prompts concise and use a strict JSON schema in the prompt to make parsing reliable.
* Rate-limit image generation requests on the frontend to avoid unnecessary API usage.
* Cache generated plans in `localStorage` with a timestamp to allow quick reloading.
* Sanitize all user-provided free text before sending to the model when used in prompts.

---

## Author

Adwitiya Khare
B.Tech — Mathematics & Computing, MITS Gwalior
Full Stack + AI Developer

GitHub: [https://github.com/AdwitiyaKhare](https://github.com/AdwitiyaKhare)
Portfolio: [https://adwitiya.dev](https://adwitiyakhare.vercel.app)

---

## License

This repository is provided under the MIT License. Feel free to adapt and reuse components for portfolio and interview submissions.
