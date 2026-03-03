'use client';

import { FormEvent, useState } from 'react';

interface JournalItem {
  id: string;
  text: string;
  mood: number;
  date: string;
  feedback?: string;
}

export default function JournalPage() {
  const [text, setText] = useState('');
  const [mood, setMood] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const [entries, setEntries] = useState<JournalItem[]>([]);

  async function submitEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) return;

    setSaving(true);
    setFeedback('');

    try {
      const response = await fetch('/api/ai-reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry: text })
      });
      const payload = await response.json();
      const aiFeedback = payload.feedback || 'No feedback returned.';
      setFeedback(aiFeedback);
      setEntries((prev) => [
        {
          id: `j-${Date.now()}`,
          text: text.trim(),
          mood,
          date: new Date().toISOString().slice(0, 10),
          feedback: aiFeedback
        },
        ...prev
      ]);
      setText('');
      setMood(3);
    } catch (error) {
      console.error(error);
      setFeedback('Could not generate reflection right now.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="gg-card p-6">
        <h1 className="gg-page-title">Journal + Reflection</h1>
        <p className="gg-subtle mt-2">Log your day, rate mood (1-5), and get short AI performance feedback.</p>
      </div>

      <form onSubmit={submitEntry} className="gg-card space-y-4 p-6">
        <label className="block text-sm">
          Today&apos;s Entry
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-lg border border-[rgba(203,223,144,0.35)] bg-[rgba(15,30,56,0.6)] p-3 outline-none"
            placeholder="What did you execute today? What failed? What improved?"
            required
          />
        </label>

        <label className="block text-sm">
          Mood: {mood}
          <input
            type="range"
            min={1}
            max={5}
            value={mood}
            onChange={(event) => setMood(Number(event.target.value))}
            className="ml-3 align-middle"
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#CBDF90] px-4 py-2 font-semibold text-[#0f1e38] disabled:opacity-60"
        >
          {saving ? 'Reflecting...' : 'Save + Reflect'}
        </button>
      </form>

      {feedback ? (
        <div className="gg-card p-6">
          <h2 className="text-lg font-semibold">AI Reflection</h2>
          <p className="gg-subtle mt-2">{feedback}</p>
        </div>
      ) : null}

      <div className="space-y-4">
        {entries.map((entry) => (
          <article key={entry.id} className="gg-card p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-[rgba(238,244,220,0.72)]">
              {entry.date} · Mood {entry.mood}/5
            </p>
            <p className="mt-2 whitespace-pre-wrap">{entry.text}</p>
            {entry.feedback ? <p className="gg-subtle mt-3 text-sm">AI: {entry.feedback}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
