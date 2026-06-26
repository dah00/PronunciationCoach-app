# ReadCoach

A web app that listens to you read any text aloud, then gives you AI-powered
feedback on your English **pronunciation** and **punctuation respect** — built
for non-native English speakers who want to improve their reading fluency.

## How it works

1. **Choose a passage** — paste text, upload a photo of a page (OCR via Claude
   Vision), or pick a built-in sample.
2. **Read it aloud** — the browser transcribes your speech in real time using
   the Web Speech API. Long readings (10–30 min) are supported via an
   auto-restart loop.
3. **Get feedback** — your transcript, the original passage, and pause-timing
   data are sent to Claude, which returns a structured report: mispronounced or
   skipped words (with phonetic guidance) and how well you paused at
   punctuation.

## Tech stack

- **Next.js 14** (App Router, JavaScript)
- **Tailwind CSS**
- **Web Speech API** for in-browser speech recognition
- **Anthropic Claude API** (`claude-sonnet-4-20250514`) for feedback + OCR
- Deployable to **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000 in **Chrome or Edge** (the Web Speech API is not
supported in Firefox; Safari support is partial).

## Project structure

```
app/
  page.js            # Home — passage input (paste / photo / sample)
  read/page.js       # Recording screen with live transcript
  feedback/page.js   # Feedback report
  api/ocr/route.js   # Claude Vision text extraction (server-side)
  api/feedback/route.js  # Claude feedback generation (server-side)
components/          # UI components
hooks/
  useSpeechRecognition.js  # Speech capture with auto-restart loop
lib/
  store.js           # Cross-page session state (React Context)
  samples.js         # Built-in sample passages
  pauseAnalysis.js   # Silence-gap vs punctuation analysis
  chunking.js        # Transcript/passage chunk alignment
```

## Notes

- The Anthropic API key lives only on the server (`.env.local` / Vercel env
  vars). It is never exposed to the browser.
- Pause detection is approximate: the Web Speech API doesn't expose word-level
  timing, so silence gaps are inferred from result-event timestamps.
