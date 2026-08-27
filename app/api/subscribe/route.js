import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function POST(request) {
  try {
    const subscription = await request.json();

    console.log("Push subscription received:", subscription);

    // For now, we are only testing that the subscription
    // reaches the server successfully.

    return Response.json({
      success: true,
      message: "Push subscription received successfully.",
    });
  } catch (error) {
    console.error("Subscription error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to save push subscription.",
      },
      { status: 500 }
    );
  }
}