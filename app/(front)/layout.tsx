
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

export default function FrontLayout({ children }: { children: ReactNode }) {
  return (
    <div>
        <Navbar />
      {children}
    </div>
  );
}
