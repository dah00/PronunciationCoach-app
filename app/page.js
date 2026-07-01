import Link from 'next/link';

const STEPS = [
  {
    num: '01',
    title: 'Pick a passage',
    body: 'Paste any text, take a photo of a book page, or use a built-in sample to practice with.',
  },
  {
    num: '02',
    title: 'Read it aloud',
    body: 'Press record and read at your own pace. The app listens and transcribes your speech as you go.',
  },
  {
    num: '03',
    title: 'Get pronunciation feedback',
    body: 'See your score, find out which words to work on, and hear correct audio for each one.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* Brand — top left on every page */}
      <nav className="px-6 py-4 sm:px-10">
        <span className="font-semibold text-slate-900">FluentRead</span>
      </nav>

      {/* Main — fills the remaining height and centers content vertically */}
      <main className="flex flex-1 items-center px-6 py-8 sm:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 lg:items-center">

            {/* Left: Hero */}
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.1]">
                Improve your English<br />
                pronunciation by<br />
                reading aloud.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500">
                Pick any passage, read it out loud, and get word-by-word
                pronunciation feedback — a score, the specific words to work
                on, and correct audio examples for each.
              </p>
              <div className="mt-7">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Start practicing
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Steps */}
            <div className="space-y-7">
              {STEPS.map(({ num, title, body }) => (
                <div key={num} className="flex gap-5">
                  <span className="mt-0.5 w-7 shrink-0 font-light text-slate-300">{num}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{body}</p>
                  </div>
                </div>
              ))}
              <p className="pl-12 text-xs text-slate-300">
                Your voice stays in your browser — only the transcript is sent for analysis.
              </p>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
