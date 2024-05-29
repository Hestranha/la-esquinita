import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 mt-[4.5rem] sm:ml-64 overflow-y-auto flex flex-col" style={{ height: "calc(100vh - 5rem)" }}>
      {children}
    </main>
  );
}
