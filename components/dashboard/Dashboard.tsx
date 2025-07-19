"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, FileText, BarChart2 } from "lucide-react";

interface Script {
  id: string;
  title: string;
  createdAt: string;
}
interface UserData {
  id: string;
  email: string;
  name?: string;
  scripts: Script[];
}

// Uses Shadcn UI (Card, Avatar) and Lucide icons (User, FileText, BarChart2) throughout.
// Responsive/mobile-first design ensured with Tailwind CSS classes.
const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error((await res.json()).error || "Failed to fetch user");
        }
        setUser(await res.json());
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Account Info */}
      <Card className="col-span-1 flex flex-col items-center">
        <CardHeader>
          <Avatar className="w-16 h-16 mb-2">
            <User className="w-8 h-8" />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center">Account</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="font-semibold">{user?.name || "Your Name"}</div>
          <div className="text-sm text-muted-foreground">{user?.email || "user@email.com"}</div>
        </CardContent>
      </Card>

      {/* Script History */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center gap-2">
          <FileText className="w-5 h-5" />
          <CardTitle>Script History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : user && user.scripts.length > 0 ? (
            <ul className="space-y-2">
              {user.scripts.map((script) => (
                <li key={script.id} className="flex justify-between items-center">
                  <span className="font-medium">{script.title || "Untitled Script"}</span>
                  <span className="text-xs text-muted-foreground">{new Date(script.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground">No scripts yet. Your generated scripts will appear here.</div>
          )}
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
