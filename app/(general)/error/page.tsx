"use client";

import React, { Suspense } from "react";
import { Button } from "@nextui-org/button";
import { useSearchParams, useRouter } from "next/navigation";

function ErrorContent() {
  const router = useRouter();
  const errorSearchParams = useSearchParams().get("error");
  let errorMessage = "Auth Error";
  if (errorSearchParams) errorMessage = errorSearchParams;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold text-red-500">{errorMessage}</h1>
      <Button type="button" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
