"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Eye, Film } from "lucide-react";

// Uses Shadcn UI (Card, Input) and Lucide icons (FileText, Eye, Film) throughout.
// Responsive/mobile-first design ensured with Tailwind CSS classes.
const initialScript = {
  intro: "Welcome to your video!",
  body: "This is the main content of your script.",
  outro: "Thanks for watching!",
};
const initialVisuals = [
  { section: "Intro", directions: "Show channel logo animation." },
  { section: "Body", directions: "Cut to talking head, overlay b-roll of product." },
  { section: "Outro", directions: "Display subscribe animation and end screen." },
];

const ScriptEditor: React.FC = () => {
  const [script, setScript] = useState(initialScript);
  const [visuals] = useState(initialVisuals);

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto py-8 px-4">
      {/* Script Editor/Viewer */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center gap-2">
          <FileText className="w-5 h-5" />
          <CardTitle>Script Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Intro</label>
            <Input
              value={script.intro}
              onChange={e => setScript({ ...script, intro: e.target.value })}
              className="mb-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Body</label>
            <Input
              value={script.body}
              onChange={e => setScript({ ...script, body: e.target.value })}
              className="mb-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Outro</label>
            <Input
              value={script.outro}
              onChange={e => setScript({ ...script, outro: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Visual Direction Sidebar */}
      <Card className="w-full md:w-80">
        <CardHeader className="flex flex-row items-center gap-2">
          <Film className="w-5 h-5" />
          <CardTitle>Visual Directions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {visuals.map((v, i) => (
              <li key={i} className="flex items-start gap-2">
                <Eye className="w-4 h-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-semibold">{v.section}</div>
                  <div className="text-sm text-muted-foreground">{v.directions}</div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScriptEditor;
