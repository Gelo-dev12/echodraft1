"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function OnboardingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Voice-to-Video Script Coach!</DialogTitle>
          <DialogDescription>
            Get started by recording your idea, generating a script, and exporting your video assets.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-5 space-y-1">
            <li>Record your idea using the voice recorder.</li>
            <li>Transcribe and generate a full video script with AI.</li>
            <li>Export scripts, visuals, and voice-overs for your video.</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Get Started</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
