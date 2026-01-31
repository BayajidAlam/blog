"use client";

import { useEffect } from "react";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //* We can pass this error to a logger
    console.error(error);
  }, []);

  return (
    <div>
      <h1> Something Went Wrong: Please try again </h1>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}
