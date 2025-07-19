import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'Rachel', model_id = 'eleven_multilingual_v2', output_format = 'mp3' } = await req.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing ElevenLabs API key' }, { status: 500 });
    }

    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice}`;
    const elevenRes = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id,
        output_format,
      }),
    });

    if (!elevenRes.ok) {
      const err = await elevenRes.text();
      return NextResponse.json({ error: 'ElevenLabs API error', details: err }, { status: 500 });
    }

    // Return the audio as a stream
    const audioBuffer = await elevenRes.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="voiceover.mp3"',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Voice-over generation failed' }, { status: 500 });
  }
}
