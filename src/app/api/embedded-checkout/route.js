import { NextResponse } from "next/server";
import { stripe } from "../../../../utils/stripe";

export async function POST(request) {
  try {
    const { priceId } = await request.json();
    const { amount } = await request.json();

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        {
          amount,
          currency: "cad",
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
