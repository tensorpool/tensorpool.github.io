import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
