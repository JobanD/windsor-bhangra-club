import { NextResponse } from "next/server";
import { stripe } from "../../../../utils/stripe";

export async function POST(request) {
  try {
    const { amount } = await request.json(); // Expecting amount in the request body

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount should be in cents
      currency: "usd", // Adjust currency if needed
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
