"use client";

import { useState } from "react";

export default function NotificationSetup() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function enableNotifications() {
    try {
      setLoading(true);
      setStatus("");

      // Check browser support
      if (!("serviceWorker" in navigator)) {
        setStatus("Notifications are not supported in this browser.");
        return;
      }

      if (!("PushManager" in window)) {
        setStatus("Push notifications are not supported in this browser.");
        return;
      }

      // Request permission
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setStatus("Notifications were not enabled.");
        return;
      }

      // Register service worker
      const registration =
        await navigator.serviceWorker.register("/sw.js");

      // Wait until service worker is ready
      await navigator.serviceWorker.ready;

      // Get VAPID public key
      const publicKey =
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!publicKey) {
        setStatus("VAPID public key is missing.");
        return;
      }

      // Check if a subscription already exists
      let subscription =
        await registration.pushManager.getSubscription();

      // Create subscription if needed
      if (!subscription) {
        subscription =
          await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              publicKey
            ),
          });
      }

      // Save subscription
      const response = await fetch(
  "/api/subscribe/save-subscription",
  
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to save subscription."
        );
      }

      setStatus("Notifications are enabled! 🔔");
    } catch (error) {
      console.error("NOTIFICATION SETUP ERROR:", error);

      setStatus(
        "Unable to enable notifications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h3 className="text-xl font-semibold text-white">
        Lead Notifications
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Enable notifications to receive an alert whenever
        someone submits a consultation request.
      </p>

      <button
        type="button"
        onClick={enableNotifications}
        disabled={loading}
        className="mt-5 rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-black transition hover:bg-yellow-500 disabled:bg-gray-600"
      >
        {loading
          ? "Enabling..."
          : "Enable Notifications"}
      </button>

      {status && (
        <p className="mt-4 text-sm text-gray-300">
          {status}
        </p>
      )}
    </div>
  );
}

// Convert VAPID public key
function urlBase64ToUint8Array(
  base64String: string
) {
  const padding = "=".repeat(
    (4 - (base64String.length % 4)) % 4
  );

  const base64 = (
    base64String +
    padding
  )
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) =>
      char.charCodeAt(0)
    )
  );
}