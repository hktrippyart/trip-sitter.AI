"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DELAY_MS = 3000;

export function TrainingSubscribeComingSoonRedirect() {
  const router = useRouter();

  useEffect(() => {
    const id = window.setTimeout(() => {
      router.replace("/training");
    }, DELAY_MS);
    return () => window.clearTimeout(id);
  }, [router]);

  return null;
}
