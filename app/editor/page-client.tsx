"use client";

import * as React from "react";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { Spinner2 } from "@/components/ui/spinner";

export function PageClient() {
  const router = useRouter();
  const user = useUser({ or: "redirect" });

  React.useEffect(() => {
    if (user) {
      router.push(`/editor/${user.id}`);
    } else {
      router.push("/");
    }
  }, [router, user]);

  return <div className="flex items-center justify-center h-svh w-screen"><Spinner2 /></div>;
}