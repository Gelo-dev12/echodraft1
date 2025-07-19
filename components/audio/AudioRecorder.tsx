// Uses Shadcn UI Button throughout.
// TODO: Add upload functionality for recorded audio in the future
// Main audio recorder component for Voice-to-Video Script Coach
"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

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
      setAudioUrl(URL.createObjectURL(audioBlob));
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
};

export default AudioRecorder;
