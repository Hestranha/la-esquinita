import { comfortaa } from "./ui/fonts";
import "./ui/global.css"
import { NavBar } from "./ui/structure/navbar";
import { MultiLevelSidebar } from "./ui/structure/sidebar";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>LibreriAdri</title>
      <body className={`${comfortaa.className} antialiased`}>
        <NextUIProvider>
          <MultiLevelSidebar />
          <NavBar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
