import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { transcript, style = 'YouTube', language = 'English' } = await req.json();
    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    const prompt = `You are a professional video scriptwriter. Given the following transcript, generate a full YouTube-style video script with:
- An engaging intro
- A structured body
- A strong outro
- Visual directions for each section (suggested scenes, b-roll, animations)
- Output in ${language}

Transcript:
"""
${transcript}
"""

Respond in JSON with { "script": { "intro": ..., "body": ..., "outro": ... }, "visuals": ... }`;

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
    let scriptData = null;
    try {
      scriptData = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      return NextResponse.json({ error: 'Failed to parse script JSON', raw: data.choices[0].message.content }, { status: 500 });
    }
    return NextResponse.json(scriptData);
  } catch {
    return NextResponse.json({ error: 'Script generation failed' }, { status: 500 });
  }
}
