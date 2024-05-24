import { comfortaa } from "./ui/fonts";
import "./ui/global.css"
import { NavBar } from "./ui/structure/navbar";
import { MultiLevelSidebar } from "./ui/structure/sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>LibreriAdri</title>
      <body className={`${comfortaa.className} antialiased`}>
        <MultiLevelSidebar />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
