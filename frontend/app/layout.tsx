import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css"
import '.././components/style/navbar.css'
import '.././components/style/footer.css'
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppProvider";


export const metadata: Metadata = {
  title: "WCOS",
  description: "CAN WATER ORDERING SYSTEM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Toaster />
          {children}
        </AppProvider>

      </body>
    </html>
  );
}
