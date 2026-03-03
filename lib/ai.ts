export async function reflectOnEntry(entry: string): Promise<string> {
  const host = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
  const model = process.env.OLLAMA_MODEL || 'llama3.1:8b';

  const prompt = [
    'You are a performance coach.',
    'Give concise feedback in 3 bullet points: what was good, what to improve, and one action for tomorrow.',
    `Journal entry: ${entry}`
  ].join('\n');

  try {
    const response = await fetch(`${host}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed (${response.status})`);
    }

    const payload = (await response.json()) as { response?: string };
    return payload.response?.trim() || 'No reflection generated.';
  } catch {
    return `Execution signal detected. Keep the momentum and focus tomorrow on one high-leverage action. Entry preview: "${entry.slice(0, 120)}"`;
  }
}
