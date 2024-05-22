import { comfortaa } from "./ui/fonts";
import "./ui/global.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>la esquinita</title>
      <body className={`${comfortaa.className} antialiased`}>{children}</body>
    </html>
  );
}
