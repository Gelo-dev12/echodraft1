"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, FileText, BarChart2 } from "lucide-react";

// Uses Shadcn UI (Card, Avatar) and Lucide icons (User, FileText, BarChart2) throughout.
// Responsive/mobile-first design ensured with Tailwind CSS classes.
const Dashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Account Info */}
      <Card className="col-span-1 flex flex-col items-center">
        <CardHeader>
          <Avatar className="w-16 h-16 mb-2">
            <User className="w-8 h-8" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center">Account</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="font-semibold">Your Name</div>
          <div className="text-sm text-muted-foreground">user@email.com</div>
        </CardContent>
      </Card>

      {/* Script History */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center gap-2">
          <FileText className="w-5 h-5" />
          <CardTitle>Script History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">No scripts yet. Your generated scripts will appear here.</div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader className="flex flex-row items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Usage stats and plan info will appear here.</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
