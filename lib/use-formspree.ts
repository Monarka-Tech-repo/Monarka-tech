"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

export function useFormspree(endpointId: string | undefined) {
  const [status, setStatus] = useState<Status>(
    endpointId ? "idle" : "unconfigured"
  );

  async function submit(data: Record<string, string>) {
    if (!endpointId) {
      setStatus("unconfigured");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${endpointId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return { status, submit };
}
