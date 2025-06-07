"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/contacts");
  }, [router]);

  return (
    <div className="p-8 flex justify-center items-center h-[calc(100vh-160px)]">
      <div className="admin-spinner"></div>
      <p className="ml-4">Redirecting to contacts page...</p>
    </div>
  );
} 