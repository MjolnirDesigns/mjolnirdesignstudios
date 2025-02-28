"use client";
export default function GlobalError({
  error,
}: {
  error: Error;
}) {
  console.error("Global error:", error); // Basic logging to console
  return (
    <html>
      <body>
        <h1>Something went wrong!</h1>
      </body>
    </html>
  );
}