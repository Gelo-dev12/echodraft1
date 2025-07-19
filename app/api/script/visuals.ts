import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { script, transcript, language = 'English' } = await req.json();
    if (!script && !transcript) {
      return NextResponse.json({ error: 'Script or transcript is required' }, { status: 400 });
    }
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    const base = script ? `Script:\n${script}` : `Transcript:\n${transcript}`;
    const prompt = `You are a creative video director. Given the following ${script ? 'script' : 'transcript'}, generate detailed visual directions for each section. Include:
- Scene descriptions
- B-roll suggestions
- Animation or graphic ideas
- Camera angles or transitions (if relevant)
- Output in ${language}

${base}

Respond in JSON with { "visuals": [ { "section": ..., "directions": ... }, ... ] }`;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for video creators.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      return NextResponse.json({ error: 'OpenAI API error', details: err }, { status: 500 });
    }

    const data = await openaiRes.json();
    // Try to parse the JSON from the model's response
    let visualsData = null;
    try {
      visualsData = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      return NextResponse.json({ error: 'Failed to parse visuals JSON', raw: data.choices[0].message.content }, { status: 500 });
    }
    return NextResponse.json(visualsData);
  } catch {
    return NextResponse.json({ error: 'Visual directions generation failed' }, { status: 500 });
  }
}
