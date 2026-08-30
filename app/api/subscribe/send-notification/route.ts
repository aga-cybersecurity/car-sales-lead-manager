import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !publicKey ||
      !privateKey ||
      !subject ||
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      return NextResponse.json(
        {
          error: "Notification environment variables are missing.",
        },
        { status: 500 }
      );
    }

    webpush.setVapidDetails(
      subject,
      publicKey,
      privateKey
    );

    const body = await request.json();

    const firstName = body.first_name || "Someone";
    const lastName = body.last_name || "";

    const message = `${firstName} ${lastName}`.trim()
      + " submitted a new consultation request.";

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    const { data: subscriptions, error } =
      await supabaseAdmin
        .from("push_subscriptions")
        .select("*");

    if (error) {
      console.error(
        "FETCH SUBSCRIPTIONS ERROR:",
        error
      );

      return NextResponse.json(
        {
          error: "Could not retrieve push subscriptions.",
        },
        { status: 500 }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No notification subscriptions found.",
      });
    }

    const results = [];

    for (const savedSubscription of subscriptions) {
      const subscription = {
        endpoint: savedSubscription.endpoint,
        keys: {
          p256dh: savedSubscription.p256dh,
          auth: savedSubscription.auth,
        },
      };

      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: "New Consultation Request 🔔",
            body: message,
            url: "/dashboard",
          })
        );

        results.push({
          endpoint: savedSubscription.endpoint,
          success: true,
        });
      } catch (error) {
        console.error(
          "SEND PUSH ERROR:",
          error
        );

        results.push({
          endpoint: savedSubscription.endpoint,
          success: false,
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error(
      "PUSH NOTIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send notification.",
      },
      { status: 500 }
    );
  }
}