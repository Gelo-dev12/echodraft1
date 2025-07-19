import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts } from 'pdf-lib';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { script, format = 'pdf' } = await req.json();
    if (!script) {
      return NextResponse.json({ error: 'Script is required' }, { status: 400 });
    }

    if (format === 'txt') {
      const txtContent = typeof script === 'string' ? script : JSON.stringify(script, null, 2);
      return new Response(txtContent, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': 'attachment; filename="script.txt"',
        },
      });
    }

    if (format === 'pdf') {
      // Use pdf-lib to generate a PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const text = typeof script === 'string' ? script : JSON.stringify(script, null, 2);
      const fontSize = 12;
      const { width, height } = page.getSize();
      page.drawText(text, {
        x: 50,
        y: height - 50,
        size: fontSize,
        font,
        maxWidth: width - 100,
        lineHeight: 16,
      });
      const pdfBytes = await pdfDoc.save();
      return new Response(pdfBytes, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="script.pdf"',
        },
      });
    }

    // Placeholder for Final Cut Pro XML export
    if (format === 'finalcutpro') {
      return NextResponse.json({ error: 'Final Cut Pro export not implemented yet.' }, { status: 501 });
    }

    return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Script export failed' }, { status: 500 });
  }
}
