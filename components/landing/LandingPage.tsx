"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Twitter, Youtube, MessageCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#312e81] shadow-lg z-20">
        <div className="flex items-center gap-3 font-extrabold text-3xl tracking-tight">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-xl">
            <Sparkles className="w-8 h-8" />
          </span>
          <span className="bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">Voice2Script</span>
        </div>
        <div className="flex gap-10 text-lg items-center font-semibold">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link href="/studio" className="hover:text-purple-400 transition-colors">Studio</Link>
          <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="bg-gradient-to-br from-purple-600 to-blue-500 text-white border-none shadow-lg hover:from-purple-700 hover:to-blue-600 px-6 py-2 text-lg font-bold">Sign In</Button>
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] w-full min-h-[80vh]">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-20">
          {/* Left: Feature Cards Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <Card className="bg-gradient-to-br from-purple-800/90 to-blue-900/80 border-none shadow-2xl text-left p-6">
              <CardTitle className="text-pink-400 text-3xl font-extrabold mb-3 drop-shadow">01</CardTitle>
              <CardDescription className="text-xl text-white font-bold mb-1">Voice Capture</CardDescription>
              <div className="text-base text-slate-200/80 font-normal">Record your ideas instantly with our built-in audio recorder.</div>
            </Card>
            {/* Feature 2 */}
            <Card className="bg-gradient-to-br from-blue-800/90 to-purple-900/80 border-none shadow-2xl text-left p-6">
              <CardTitle className="text-blue-400 text-3xl font-extrabold mb-3 drop-shadow">02</CardTitle>
              <CardDescription className="text-xl text-white font-bold mb-1">AI Script Generation</CardDescription>
              <div className="text-base text-slate-200/80 font-normal">Transform your voice into a full YouTube-style script using AI.</div>
            </Card>
            {/* Feature 3 */}
            <Card className="bg-gradient-to-br from-purple-800/90 to-blue-900/80 border-none shadow-2xl text-left p-6">
              <CardTitle className="text-purple-400 text-3xl font-extrabold mb-3 drop-shadow">03</CardTitle>
              <CardDescription className="text-xl text-white font-bold mb-1">Visual Directions</CardDescription>
              <div className="text-base text-slate-200/80 font-normal">Get scene-by-scene visual guidance for your video.</div>
            </Card>
            {/* Feature 4 */}
            <Card className="bg-gradient-to-br from-blue-800/90 to-purple-900/80 border-none shadow-2xl text-left p-6">
              <CardTitle className="text-indigo-400 text-3xl font-extrabold mb-3 drop-shadow">04</CardTitle>
              <CardDescription className="text-xl text-white font-bold mb-1">Voiceover & Export</CardDescription>
              <div className="text-base text-slate-200/80 font-normal">Generate voiceovers and export scripts, visuals, and audio.</div>
            </Card>
          </div>

          {/* Center: Glowing Icon */}
          <div className="flex flex-col items-center justify-center mx-12">
            <Card className="rounded-full p-10 bg-gradient-to-br from-purple-700 via-blue-600 to-purple-400 shadow-[0_0_80px_10px_rgba(139,92,246,0.5)] border-none">
              <span className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-2xl">
                <Sparkles className="w-20 h-20" />
              </span>
            </Card>
          </div>

          {/* Right: Headline and CTA */}
          <div className="flex-1 flex flex-col items-start justify-center gap-10 max-w-lg">
            <h1 className="text-6xl font-extrabold leading-tight text-white mb-2 drop-shadow-xl">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-400">Voice2Script?</span></h1>
            <p className="text-2xl text-slate-200/90 font-medium mb-6">All-in-one AI SaaS for creators. Effortlessly turn your voice ideas into full YouTube-style scripts, visual directions, and voice-overs.</p>
            <Button asChild size="lg" className="text-xl px-12 py-6 rounded-full font-extrabold shadow-2xl bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
              <Link href="/studio">Start for Free</Link>
            </Button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#312e81] border-t border-white/10 py-16 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-16 px-4 text-lg">
          <div>
            <div className="font-bold mb-4 text-2xl text-white tracking-wide">Features</div>
            <ul className="space-y-2 text-slate-300/90">
              <li>Voice Capture</li>
              <li>AI Script Generation</li>
              <li>Visual Directions</li>
              <li>Voice-over Export</li>
              <li>Script Pack Download</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-4 text-2xl text-white tracking-wide">For Creators</div>
            <ul className="space-y-2 text-slate-300/90">
              <li><Link href="/studio">Studio</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/register">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-4 text-2xl text-white tracking-wide">Support</div>
            <ul className="space-y-2 text-slate-300/90">
              <li><Link href="mailto:support@voice2script.com">Contact Support</Link></li>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-4 text-2xl text-white tracking-wide">Connect</div>
            <ul className="flex gap-8 text-slate-300/90 text-3xl">
              <li><a href="#" aria-label="Twitter"><Twitter className="w-8 h-8" /></a></li>
              <li><a href="#" aria-label="YouTube"><Youtube className="w-8 h-8" /></a></li>
              <li><a href="#" aria-label="Discord"><MessageCircle className="w-8 h-8" /></a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-14 pt-8 text-center text-base text-slate-400 font-medium tracking-wide">&copy; {new Date().getFullYear()} Voice2Script. All rights reserved.</div>
      </footer>
    </div>
  );
}
