import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { script, visuals, audioBase64, audioFilename = 'voiceover.mp3' } = await req.json();
    const zip = new JSZip();

    if (script) {
      zip.file('script.txt', typeof script === 'string' ? script : JSON.stringify(script, null, 2));
    }
    if (visuals) {
      zip.file('visuals.txt', typeof visuals === 'string' ? visuals : JSON.stringify(visuals, null, 2));
    }
    if (audioBase64) {
      // audioBase64 should be a base64-encoded string (no data: prefix)
      zip.file(audioFilename, Buffer.from(audioBase64, 'base64'));
    }

    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    return new Response(zipData, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="script-pack.zip"',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Script pack export failed' }, { status: 500 });
  }
}
