import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // for faster cold starts

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('audio') as File;
    if (!file) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    // Prepare the request to OpenAI Whisper API
    const openaiRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      body: (() => {
        const fd = new FormData();
        fd.append('file', file, 'audio.webm');
        fd.append('model', 'whisper-1');
        return fd;
      })()
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      return NextResponse.json({ error: 'Whisper API error', details: err }, { status: 500 });
    }

    const data = await openaiRes.json();
    return NextResponse.json({ text: data.text });
  } catch (err) {
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
