"use client";
import React, { useRef, useState } from "react";
import AudioRecorder from "@/components/audio/AudioRecorder";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@uploadthing/react";
import type { UploadRouter } from "@/app/api/uploadthing/core";

export default function StudioPage() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [script, setScript] = useState<any>(null);
  const [visuals, setVisuals] = useState<any>(null);
  const [voiceoverUrl, setVoiceoverUrl] = useState<string | null>(null);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [exportType, setExportType] = useState<string | null>(null);
  const [packUrl, setPackUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"idle" | "transcribing" | "transcribed" | "generating" | "generated" | "visualizing" | "visualized" | "voicing" | "voiced" | "exporting" | "packing">("idle");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  // Custom AudioRecorder with callback
  function CustomAudioRecorder() {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        setTranscript("");
        setScript(null);
        setVisuals(null);
        setVoiceoverUrl(null);
        setExportUrl(null);
        setExportType(null);
        setStep("idle");
      };
      mediaRecorder.start();
      setRecording(true);
    };

    const stopRecording = () => {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    };

    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
          <Button onClick={startRecording} disabled={recording} variant="default" className="w-full sm:w-auto">
            Start Recording
          </Button>
          <Button onClick={stopRecording} disabled={!recording} variant="destructive" className="w-full sm:w-auto">
            Stop Recording
          </Button>
        </div>
        {audioUrl && (
          <audio controls src={audioUrl} className="mt-4 w-full" />
        )}
      </div>
    );
  }

  async function handleTranscribe() {
    if (!audioBlob) return;
    setLoading(true);
    setError(null);
    setTranscript("");
    setScript(null);
    setVisuals(null);
    setVoiceoverUrl(null);
    setExportUrl(null);
    setExportType(null);
    setStep("transcribing");
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.webm");
      const res = await fetch("/api/transcription/whisper", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transcription failed");
      setTranscript(data.text);
      setStep("transcribed");
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setStep("idle");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateScript() {
    if (!transcript) return;
    setLoading(true);
    setError(null);
    setScript(null);
    setVisuals(null);
    setVoiceoverUrl(null);
    setExportUrl(null);
    setExportType(null);
    setStep("generating");
    try {
      const res = await fetch("/api/script/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Script generation failed");
      setScript(data);
      setStep("generated");
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setStep("transcribed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateVisuals() {
    if (!script) return;
    setLoading(true);
    setError(null);
    setVisuals(null);
    setVoiceoverUrl(null);
    setExportUrl(null);
    setExportType(null);
    setStep("visualizing");
    try {
      const res = await fetch("/api/script/visuals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Visual directions failed");
      setVisuals(data);
      setStep("visualized");
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setStep("generated");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateVoiceover() {
    if (!script) return;
    setLoading(true);
    setError(null);
    setVoiceoverUrl(null);
    setExportUrl(null);
    setExportType(null);
    setStep("voicing");
    try {
      const text = script?.script?.body || script?.script || "";
      const res = await fetch("/api/voiceover/elevenlabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Voice-over generation failed");
      const blob = await res.blob();
      setVoiceoverUrl(URL.createObjectURL(blob));
      setStep("voiced");
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setStep("visualized");
    } finally {
      setLoading(false);
    }
  }

  async function handleExport(format: "pdf" | "txt") {
    if (!script) return;
    setLoading(true);
    setError(null);
    setExportUrl(null);
    setExportType(null);
    setStep("exporting");
    try {
      const res = await fetch("/api/export/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, format }),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setExportUrl(url);
      setExportType(format);
      setStep("generated");
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setStep("generated");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadPack() {
    if (!script && !visuals && !voiceoverUrl) return;
    setLoading(true);
    setError(null);
    setPackUrl(null);
    setStep("packing");
    try {
      let audioBase64 = null;
      if (voiceoverUrl) {
        const res = await fetch(voiceoverUrl);
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        audioBase64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      }
      const res = await fetch("/api/export/pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          visuals,
          audioBase64,
          audioFilename: "voiceover.mp3",
        }),
      });
      if (!res.ok) throw new Error("Pack download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPackUrl(url);
      setStep("generated");
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setStep("generated");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Studio: Core Features Playground</h1>
      {/* File Upload (Uploadthing) */}
      <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">
        <label className="font-semibold">Upload Reference File (Uploadthing)</label>
        <UploadButton<UploadRouter, "referenceFile">
          endpoint="referenceFile"
          onClientUploadComplete={res => {
            setUploadedUrl(res?.[0]?.url || null);
          }}
          onUploadError={error => {
            setUploadError(error.message);
          }}
        />
        {uploadedUrl && <div className="text-sm text-muted-foreground">Uploaded URL: <a href={uploadedUrl} className="underline text-blue-600" target="_blank" rel="noopener noreferrer">{uploadedUrl}</a></div>}
        {uploadError && <div className="text-red-500 text-sm">{uploadError}</div>}
      </div>
      <CustomAudioRecorder />
      <Button onClick={handleTranscribe} disabled={!audioBlob || loading || step === "transcribing"} className="w-full max-w-md mx-auto">
        {loading && step === "transcribing" ? "Transcribing..." : "Transcribe Audio"}
      </Button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {transcript && (
        <div className="bg-muted rounded p-4 mt-4">
          <div className="font-semibold mb-1">Transcript:</div>
          <div className="whitespace-pre-line text-sm">{transcript}</div>
        </div>
      )}
      {transcript && (
        <Button onClick={handleGenerateScript} disabled={loading || step === "generating"} className="w-full max-w-md mx-auto">
          {loading && step === "generating" ? "Generating Script..." : "Generate Script from Transcript"}
        </Button>
      )}
      {script && (
        <div className="bg-muted rounded p-4 mt-4">
          <div className="font-semibold mb-1">Generated Script:</div>
          <pre className="whitespace-pre-line text-sm overflow-x-auto">{JSON.stringify(script, null, 2)}</pre>
        </div>
      )}
      {script && (
        <Button onClick={handleGenerateVisuals} disabled={loading || step === "visualizing"} className="w-full max-w-md mx-auto">
          {loading && step === "visualizing" ? "Generating Visual Directions..." : "Generate Visual Directions"}
        </Button>
      )}
      {visuals && (
        <div className="bg-muted rounded p-4 mt-4">
          <div className="font-semibold mb-1">Visual Directions:</div>
          <pre className="whitespace-pre-line text-sm overflow-x-auto">{JSON.stringify(visuals, null, 2)}</pre>
        </div>
      )}
      {script && (
        <Button onClick={handleGenerateVoiceover} disabled={loading || step === "voicing"} className="w-full max-w-md mx-auto">
          {loading && step === "voicing" ? "Generating Voice-over..." : "Generate Voice-over (TTS)"}
        </Button>
      )}
      {voiceoverUrl && (
        <div className="bg-muted rounded p-4 mt-4">
          <div className="font-semibold mb-1">Voice-over Audio:</div>
          <audio controls src={voiceoverUrl} className="w-full" />
        </div>
      )}
      {script && (
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
          <Button onClick={() => handleExport("pdf") } disabled={loading || step === "exporting"} className="w-full sm:w-auto">
            {loading && step === "exporting" && exportType === "pdf" ? "Exporting PDF..." : "Export as PDF"}
          </Button>
          <Button onClick={() => handleExport("txt") } disabled={loading || step === "exporting"} className="w-full sm:w-auto">
            {loading && step === "exporting" && exportType === "txt" ? "Exporting TXT..." : "Export as TXT"}
          </Button>
        </div>
      )}
      {exportUrl && exportType && (
        <div className="bg-muted rounded p-4 mt-4">
          <div className="font-semibold mb-1">Download {exportType.toUpperCase()}:</div>
          <a href={exportUrl} download={`script.${exportType}`} className="text-blue-600 underline">Download {exportType.toUpperCase()}</a>
        </div>
      )}
      {script && (
        <Button onClick={handleDownloadPack} disabled={loading || step === "packing"} className="w-full max-w-md mx-auto mt-2">
          {loading && step === "packing" ? "Packing..." : "Download Script Pack (ZIP)"}
        </Button>
      )}
      {packUrl && (
        <div className="bg-muted rounded p-4 mt-4">
          <div className="font-semibold mb-1">Download Script Pack (ZIP):</div>
          <a href={packUrl} download="script-pack.zip" className="text-blue-600 underline">Download ZIP</a>
        </div>
      )}
    </div>
  );
}
