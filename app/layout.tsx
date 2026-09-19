import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "هادي الفضيلي | مخرج ومنتج فيديو",
  description: "هادي الفضيلي - مخرج سوداني مقيم بالقاهرة. متخصص في إنتاج الفيديو والتصميم الجرافيكي والإنتاج بالذكاء الاصطناعي.",
  keywords: ["هادي الفضيلي", "مخرج", "فيديو", "تصميم", "إنتاج", "سوداني", "قاهرة"],
  openGraph: {
    title: "هادي الفضيلي | مخرج ومنتج فيديو",
    description: "مخرج سوداني مقيم بالقاهرة - إنتاج فيديو وتصميم جرافيكي",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.dir = 'rtl';
                document.documentElement.lang = 'ar';
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}