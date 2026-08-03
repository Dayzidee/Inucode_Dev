"use client";

import { ReactNode } from "react";
import { AdminLayout } from "../../components/ui/AdminLayout";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayout>
        {children}
      </AdminLayout>
    </SessionProvider>
  );
}
