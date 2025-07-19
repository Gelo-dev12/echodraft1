"use client";

import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaypalButton from "@/components/payments/PaypalButton";
import Link from "next/link";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PricingPage() {
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#312e81] flex flex-col items-center py-20 px-4">
          <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-xl">Pricing Plans</h1>
          <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl justify-center items-stretch">
            {/* Free Plan */}
            <Card className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 border-none shadow-xl text-white">
              <CardContent className="py-8 flex flex-col items-center">
                <CardTitle className="text-3xl font-bold mb-2">Free</CardTitle>
                <CardDescription className="text-lg mb-4 text-slate-300">3 scripts per month</CardDescription>
                <div className="text-4xl font-extrabold mb-2">$0</div>
                <Button asChild size="lg" className="mt-4 w-full max-w-xs"><Link href="/register">Get Started</Link></Button>
              </CardContent>
            </Card>
            {/* Pro Plan */}
            <Card className="flex-1 bg-gradient-to-br from-purple-700 to-blue-700 border-4 border-purple-400 shadow-2xl text-white scale-105 z-10">
              <CardContent className="py-10 flex flex-col items-center">
                <CardTitle className="text-3xl font-bold mb-2">Pro</CardTitle>
                <CardDescription className="text-lg mb-4 text-slate-200">Unlimited scripts per month</CardDescription>
                <div className="text-4xl font-extrabold mb-2">$10<span className="text-lg font-medium">/mo</span></div>
                <PaypalButton amount="10.00" />
              </CardContent>
            </Card>
            {/* Credits Plan */}
            <Card className="flex-1 bg-gradient-to-br from-blue-800 to-purple-900 border-none shadow-xl text-white">
              <CardContent className="py-8 flex flex-col items-center">
                <CardTitle className="text-3xl font-bold mb-2">Credits</CardTitle>
                <CardDescription className="text-lg mb-4 text-slate-300">5 scripts for $5</CardDescription>
                <div className="text-4xl font-extrabold mb-2">$5</div>
                <PaypalButton amount="5.00" />
              </CardContent>
            </Card>
          </div>
          {/* Team/Agency Section */}
          <div className="mt-16 max-w-2xl w-full text-center">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-lg text-white">
              <CardContent className="py-8">
                <CardTitle className="text-2xl font-bold mb-2">Team / Agency Plans</CardTitle>
                <CardDescription className="text-lg mb-4 text-slate-300">Need more scripts or team features? Contact us for custom plans and pricing.</CardDescription>
                <Button asChild size="lg" variant="secondary" className="bg-gradient-to-br from-purple-600 to-blue-500 text-white border-none shadow px-8 py-3 font-bold"><Link href="mailto:support@voice2script.com">Contact Us</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    </PayPalScriptProvider>
  );
}
