"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalButton(props: any) {
  return <PayPalButtons {...props} />;
}
