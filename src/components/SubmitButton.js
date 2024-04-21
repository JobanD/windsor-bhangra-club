"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return <button>{pending ? "Sending Email..." : "Send Email"}</button>;
}
