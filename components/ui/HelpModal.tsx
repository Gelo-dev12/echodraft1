"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function HelpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Need Help?</DialogTitle>
          <DialogDescription>
            Here are some tips to get the most out of Voice-to-Video Script Coach.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the dashboard to view your script history and usage.</li>
            <li>Click on any script to edit or export it.</li>
            <li>For technical support, contact us via the help menu.</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
