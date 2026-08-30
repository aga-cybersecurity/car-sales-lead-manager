import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    console.log("RECEIVED SUBSCRIPTION:", subscription);

    if (
      !subscription ||
      !subscription.endpoint ||
      !subscription.keys?.p256dh ||
      !subscription.keys?.auth
    ) {
      return NextResponse.json(
        { error: "Invalid push subscription." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("push_subscriptions")
      .upsert(
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
        {
          onConflict: "endpoint",
        }
      );

    if (error) {
      console.error(
        "SUPABASE SUBSCRIPTION ERROR:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log(
      "PUSH SUBSCRIPTION SAVED SUCCESSFULLY"
    );

    return NextResponse.json({
      success: true,
      message: "Subscription saved successfully.",
    });
  } catch (error) {
    console.error(
      "SAVE SUBSCRIPTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to save push subscription.",
      },
      { status: 500 }
    );
  }
}