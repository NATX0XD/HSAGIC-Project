import type { Metadata } from "next";
import { Providers } from "./providers";
import "../style/globals.css";

export const metadata: Metadata = {
    title: "HSAGIC — Smart HS Code & Logistics Assistant",
    description:
        "AI-powered assistant for HS code classification, customs regulations, and logistics document management.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
